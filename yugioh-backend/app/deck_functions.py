section_name_map = {
    frozenset({"Fusion Monster", "Synchro Monster", "XYZ Monster", "Link Monster"}): "Extra Deck",
    frozenset({"Normal Monster","Tuner Monster", "Effect Monster", "Pendulum Effect Monster", "Ritual Monster", "Spell Card", "Trap Card"}): {"Main Deck", "Side Deck"},
}

def correct_section(card_type, intended_section):
    for types, sections in section_name_map.items():
        if card_type in types and intended_section in sections:
            return True
    return False
