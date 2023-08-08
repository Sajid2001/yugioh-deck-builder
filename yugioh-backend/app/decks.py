from flask import Blueprint, request, jsonify
from .jwt_auth import require_auth
from flask_login import login_required
from .models import Deck, DeckSection, DeckCard, CardPrice
from . import db
import requests
from .deck_functions import correct_section
from sqlalchemy.sql import func
from os import path, getenv
from dotenv import load_dotenv

load_dotenv()

decks = Blueprint('decks', __name__)

@decks.route('/decks', methods =['GET','POST'])
@require_auth
def all_decks():
    if request.method == 'POST':
        deck_name = request.get_json().get('name')
        if len(deck_name) < 2:
            return jsonify({'error': 'Name is too short'}), 400
        else:
            new_deck = Deck(name=deck_name, user_id=request.user_id)
            db.session.add(new_deck)
            db.session.commit()

            deck_sections = {'Main Deck':60, 'Extra Deck':15, 'Side Deck': 15}
            for section_name, max_cards in deck_sections.items():
                deck_section = DeckSection(name=section_name, deck_id=new_deck.id, max_cards=max_cards)
                db.session.add(deck_section)
            db.session.commit()

            return jsonify(new_deck.serialize())
    decks = Deck.query.filter_by(user_id=request.user_id).all()
    serialized_data = [item.serialize() for item in decks]  
    return jsonify(serialized_data)

@decks.route('/decks/public')
def public_decks():
    public_decks = Deck.query.filter_by(is_public=True).all()
    serialized_data = [item.serialize() for item in public_decks]  
    return jsonify(serialized_data) 

@decks.route('/decks/<deck_id>', methods=['GET','PUT', 'DELETE'])
@require_auth
def deck(deck_id):
    deck = Deck.query.filter_by(id=deck_id).first()
    if deck:
        if request.method == 'PUT':
            status = request.get_json().get('status')
            name = request.get_json().get('name')

            if status is not None and deck.is_public != status:
                deck.is_public = status

            if name is not None and name != '' and deck.name != name:
                deck.name = name

            db.session.commit()
            return jsonify({"message":"Deck Updated Successfully"}),200
        
        elif request.method == 'DELETE':
            all_current_sections = DeckSection.query.filter_by(deck_id=deck_id).all()
            all_current_cards = DeckCard.query.filter_by(deck_id=deck_id).all()

            for card in all_current_cards:
                card_prices = CardPrice.query.filter_by(card_id=card.id).all()
                for price in card_prices:
                    db.session.delete(price)
                db.session.delete(card)

            for section in all_current_sections:
                db.session.delete(section)

            db.session.delete(deck)
            db.session.commit()
            return jsonify({"message":"Deck Deleted Successfully"}),200

        return jsonify(deck.serialize())
    else:
        return jsonify({'error': 'Deck not found'}), 404


@decks.route('/decks/<deck_id>/sections')
@require_auth
def all_sections(deck_id):
    deck_sections = DeckSection.query.filter_by(deck_id=deck_id).all()
    if deck_sections:
        serialized_sections = [section.serialize() for section in deck_sections]
        return jsonify(serialized_sections)
    else:
        return jsonify({'error': 'Sections not found'}), 404
    

@decks.route('/decks/<deck_id>/cards')
@require_auth
def all_deck_cards(deck_id):
    cards = DeckCard.query.filter_by(deck_id = deck_id).all()
    serialized_data = [card.serialize() for card in cards]  
    return jsonify(serialized_data)


@decks.route('/decks/<deck_id>/sections/<section_id>/cards', methods =['GET','POST'])
@require_auth
def all_section_cards(deck_id, section_id):
    if request.method == 'POST':
        name = request.get_json().get('name')
        url = request.get_json().get('url')
        prices = request.get_json().get('prices')
        type = request.get_json().get('type')
        desc = request.get_json().get('desc')
        attack = request.get_json().get('attack')
        defense = request.get_json().get('defense')
        level = request.get_json().get('level')
        quantity = request.get_json().get('quantity')

        existing_card = DeckCard.query.filter_by(name=name).first()

        if existing_card and existing_card.deck_id == deck_id:
            return jsonify({'error': 'Card Already Exists'}), 400

        if quantity > 3:
            return jsonify({'error': 'Cannot Have More Than Three Copies In A Deck'}), 400

        #get the length of current deck section

        deck_section = DeckSection.query.filter_by(deck_id = deck_id).filter_by(id=section_id).first()
        if deck_section:
            section_size = DeckCard.query.filter_by(deck_id=deck_id).filter_by(section_id=section_id).with_entities(func.sum(DeckCard.quantity)).scalar()
            is_transaction_valid = correct_section(type, deck_section.name)

            if is_transaction_valid:
                if (section_size or 0) + quantity < deck_section.max_cards:
                    new_card = DeckCard(
                        name=name, 
                        url=url, 
                        type=type,
                        desc=desc,
                        attack=attack,
                        defense=defense,
                        level=level,
                        quantity=quantity,
                        deck_id=deck_id,
                        section_id=section_id
                    )
                    db.session.add(new_card)
                    db.session.commit()

                    for price in prices:
                        new_card_price = CardPrice(location=price["location"], price=price["price"], card_id=new_card.id)
                        db.session.add(new_card_price)
                    
                    db.session.commit()
                    return jsonify(new_card.serialize())
                else:
                    return jsonify({'error': 'Exceeded Max Limit For Deck Section'}), 400
            else:
                return jsonify({'error': 'Card Placed in the wrong section'}), 400
        else:
            return jsonify({'error': 'Deck Or Section Not Found'}), 400
    
    section_cards = DeckCard.query.filter_by(deck_id=deck_id).filter_by(section_id=section_id).all()
    serialized_data = [card.serialize() for card in section_cards]  
    return jsonify(serialized_data)



@decks.route('/decks/<deck_id>/sections/<section_id>/cards/<card_id>', methods =['GET','PUT', 'DELETE'])
@require_auth
def section_card(deck_id, section_id, card_id):
    current_card = DeckCard.query.filter_by(deck_id=deck_id).filter_by(section_id=section_id).filter_by(id=card_id).first()
    if request.method == 'PUT':
        new_section = request.get_json().get('section')
        new_quantity = request.get_json().get('quantity')

        if new_section is not None and new_section != '':

            if new_section == 'Extra Deck':
                return jsonify({'error': 'You cannot transfer a Card from the main or side deck to the Extra Deck'}), 400
            #get the new section that the card will move to
            new_deck_section = DeckSection.query.filter_by(deck_id = deck_id).filter_by(name = new_section).first()

            if new_deck_section:
                    
                if not correct_section(current_card.type, new_section):
                    return jsonify({'error': 'Invalid transaction'}), 400
                
                if current_card.section_id != new_deck_section.id:
                    #get the current size of the new deck section
                    new_section_size = DeckCard.query.filter_by(deck_id=deck_id).filter_by(section_id=new_deck_section.id).with_entities(func.sum(DeckCard.quantity)).scalar()
                    # add the current size and the current card quantity, see if it exceeds the maximum number of cards
                    if (new_section_size or 0) + current_card.quantity < new_deck_section.max_cards:
                        current_card.section_id = new_deck_section.id
                        db.session.commit()
                        
                    else:
                        return jsonify({'error': 'Will Exceed Max Limit Of Section'}), 400
                else:
                    return jsonify({'error': 'This card is already in this section'}), 400
            else:
                return jsonify({'error': 'Deck Or Section Not Found'}), 400
            
        
        if new_quantity is not None:
            if  new_quantity > 0 and new_quantity < 4: 
                section_size = DeckCard.query.filter_by(deck_id=deck_id).filter_by(section_id=current_card.section_id).with_entities(func.sum(DeckCard.quantity)).scalar()
                current_section = DeckSection.query.filter_by(deck_id = deck_id).filter_by(id=current_card.section_id).first()
                if (section_size or 0) - current_card.quantity + new_quantity < current_section.max_cards:
                    current_card.quantity = new_quantity
                    db.session.commit()
                else:
                    return jsonify({'error': 'Will Exceed Max Limit Of Section'}), 400
            else:
                return jsonify({'error': 'Invalid Quantity Number'}), 400
            
        return jsonify(current_card.serialize())
            
            
    elif request.method == 'DELETE':
        current_prices = CardPrice.query.filter_by(card_id=card_id).all();

        for price in current_prices:
            db.session.delete(price)

        db.session.delete(current_card)
        db.session.commit()
        return jsonify(current_card.serialize()) 

    return jsonify(current_card.serialize()) 


@decks.route('/search')
@require_auth
def search_card():
    card_name = request.args.get('name')
    
    api_url= getenv('YUGIOH_BASE_URL')
    req = requests.get(f'{api_url}?name={card_name}')
    
    if req.status_code == 200:
        card_info = req.json()['data'][0]

        price_list = []
        for prices in card_info['card_prices']:
            for location, price in prices.items():
                price_object = {
                    'location': location,
                    'price': price
                }
                price_list.append(price_object)

        selected_fields = {
            'name': card_info['name'],
            'url': card_info['card_images'][0]['image_url'],
            'prices':price_list,
            'type':card_info['type'],
            'desc':card_info['desc'],
            'attack':card_info['atk'],
            'defense':card_info['def'],
            'level':card_info['level'],
        }
        return jsonify(selected_fields)
    else:
        return jsonify({'error': 'Card not found'})
