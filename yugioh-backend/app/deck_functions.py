section_name_map = {
    frozenset({"Fusion Monster", "Synchro Monster", "XYZ Monster", "Link Monster"}): "Extra Deck",
    frozenset({"Normal Monster", "Effect Monster", "Pendulum Effect Monster", "Ritual Monster", "Spell Card", "Trap Card"}): "Main Deck",
}

def correct_section(card_type, intended_section):
    for types, section_name in section_name_map.items():
        if card_type in types:
            return intended_section == section_name
    return False

    