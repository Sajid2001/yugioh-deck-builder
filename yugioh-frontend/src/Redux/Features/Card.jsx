import {createSlice} from '@reduxjs/toolkit'

const initialStateValue = null;

const cardSlice = createSlice({
    name:"card",
    initialState:{value: initialStateValue},
    reducers:{
        setCard: (state, action) => {
            state.value = action.payload;
        },
        editCard: (state, action) => {
            const { quantity, section_id } = action.payload;
            return {
              ...state,
              value: {
                ...state.value,
                quantity: quantity !== undefined ? quantity : state.value.quantity,
                section_id: section_id !== undefined ? section_id : state.value.section_id,
              },
            };
        }

    }
})

export const { setCard, editCard } = cardSlice.actions;

export default cardSlice.reducer;