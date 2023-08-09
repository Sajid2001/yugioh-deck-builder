from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func


class Deck(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    is_public = db.Column(db.Boolean, default=False)
    date_created = db.Column(db.DateTime(timezone=True), default=func.now())
    sections = db.relationship('DeckSection')
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'is_public':self.is_public,
            'date_created': self.date_created,
            'user_id': self.user_id
        }
    
class DeckSection(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    max_cards = db.Column(db.Integer)
    deck_id = db.Column(db.Integer, db.ForeignKey('deck.id'))
    cards = db.relationship('DeckCard')

    def serialize(self):
        return {
            'id':self.id,
            'name': self.name,
            'max_cards': self.max_cards,
            'deck_id': self.deck_id,
            'cards':[card.serialize() for card in self.cards]
        }

class DeckCard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    url = db.Column(db.String(150))
    type = db.Column(db.String(150))
    desc = db.Column(db.String(500))
    attack = db.Column(db.Integer)
    defense = db.Column(db.Integer)
    level = db.Column(db.Integer)
    quantity = db.Column(db.Integer)
    deck_id = db.Column(db.Integer, db.ForeignKey('deck.id'))
    section_id = db.Column(db.Integer, db.ForeignKey('deck_section.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    prices = db.relationship('CardPrice')
    def serialize(self):
        return{
            'id': self.id,
            'name':self.name,
            'url' : self.url,
            'type': self.type,
            'desc': self.desc,
            'attack': self.attack,
            'defense': self.defense,
            'level':self.level,
            'quantity': self.quantity,
            'deck_id' :self.deck_id,
            'section_id': self.section_id,
            'user_id':self.user_id,
            'prices': [price.serialize() for price in self.prices]  
        }


class CardPrice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(150))
    price = db.Column(db.String(150))
    card_id = db.Column(db.Integer, db.ForeignKey('deck_card.id'))

    def serialize(self):
        return {
            'id': self.id,
            'location': self.location,
            'price': self.price,
            'card_id':self.card_id
        }
    

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150))
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    decks = db.relationship('Deck')
    cards = db.relationship('DeckCard')
