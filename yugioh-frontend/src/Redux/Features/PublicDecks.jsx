import {createSlice} from '@reduxjs/toolkit'

const initialStateValue = [];

const publicDecksSlice = createSlice({
    name:"publicDecks",
    initialState:{value: initialStateValue},
    reducers:{
        setPublicDecks: (state, action) => {
            state.value = action.payload
        },
        deletePublicDeck: (state, action) => {
            const id = action.payload;
            console.log(id);
            state.value = state.value.filter((deck) => deck.id !== id);
        },
    }
})

export const { setPublicDecks, deletePublicDeck } = publicDecksSlice.actions;

export default publicDecksSlice.reducer;