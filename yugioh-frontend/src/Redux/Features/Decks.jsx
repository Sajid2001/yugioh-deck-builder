import {createSlice} from '@reduxjs/toolkit'

const initialStateValue = [];

const decksSlice = createSlice({
    name:"decks",
    initialState:{value: initialStateValue},
    reducers:{
        setDecks: (state, action) => {
            state.value = action.payload
        },
        deleteDeck: (state, action) => {
            const id = action.payload;
            console.log(id);
            state.value = state.value.filter((deck) => deck.id !== id);
        },
        createDeck: (state,action) => {
            state.value = [...state.value, action.payload]
        }
    }
})

export const { setDecks, deleteDeck, createDeck } = decksSlice.actions;

export default decksSlice.reducer;