import {createSlice} from '@reduxjs/toolkit'

const initialStateValue = {};

const singleDeckSlice = createSlice({
    name:"deck",
    initialState:{value: initialStateValue},
    reducers:{
        setDeck: (state, action) => {
            state.value = action.payload
        },
        editDeck: (state, action) => {
            const { status, name } = action.payload;
          
            return {
              ...state,
              value: {
                ...state.value,
                is_public: status !== undefined ? status : state.value.is_public,
                name: name !== undefined && name !== '' ? name : state.value.name,
              },
            };
        }
    }
})

export const { setDeck, editDeck } = singleDeckSlice.actions;

export default singleDeckSlice.reducer;