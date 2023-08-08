import { configureStore } from '@reduxjs/toolkit'
import decksReducer from "./Features/Decks"
import sectionsReducer from './Features/Sections'
import singleDeckReducer from './Features/SingleDeck'
import cardReducer from './Features/Card'
import publicDecksReducer from './Features/PublicDecks'
import userReducer from './Features/User'

const Store = configureStore({
    reducer:{
        decks:decksReducer,
        sections:sectionsReducer,
        singleDeck:singleDeckReducer,
        card:cardReducer,
        publicDecks:publicDecksReducer,
        user:userReducer
    }
  })

export default Store;