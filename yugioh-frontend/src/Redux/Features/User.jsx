import {createSlice} from '@reduxjs/toolkit'

const initialStateValue = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null;

const userSlice = createSlice({
    name:"user",
    initialState:{value: initialStateValue},
    reducers:{
        setUser: (state, action) => {
            state.value = action.payload
        },
        logoutUser: (state) => {
            state.value = null;
        },
    }
})

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
