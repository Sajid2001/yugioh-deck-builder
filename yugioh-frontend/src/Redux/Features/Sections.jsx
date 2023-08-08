import {createSlice} from '@reduxjs/toolkit'

const initialStateValue = [];

const sectionsSlice = createSlice({
    name:"sections",
    initialState:{value: initialStateValue},
    reducers:{
        setSections: (state, action) => {
            state.value = action.payload
        },
        addCardToSection(state, action) {
            const { section_id } = action.payload;
            const section = state.value.find((section) => section.id === section_id);
            if (section) {
              section.cards.push(action.payload);
            }
        },
        deleteCardFromSection(state,action){
            const { section_id, id } = action.payload;
            const section = state.value.find((section) => section.id === section_id);
            if (section) {
                const index = section.cards.findIndex((card) => card.id === id);
                if (index !== -1) {
                section.cards.splice(index, 1);
                }
            }
        }
    }
})

export const { setSections, addCardToSection, deleteCardFromSection } = sectionsSlice.actions;

export default sectionsSlice.reducer;