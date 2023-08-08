import React, { useEffect } from 'react'
import { setPublicDecks } from '../Redux/Features/PublicDecks';
import { useDispatch, useSelector } from 'react-redux';
import DeckCard from '../Components/Deck/DeckCard';

export default function PublicDecksPage() {

    const publicDecks = useSelector((state) => state.publicDecks.value)
    const dispatch = useDispatch();

    const getPublicDecks = async() => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/decks/public`)

        const json = await response.json();

        if (response.ok){
            console.log(json);
            {dispatch(setPublicDecks(json))}
        }
    }

    useEffect(() => {
        {dispatch(setPublicDecks(null))}
        getPublicDecks()
    },[])

  return (
    <div className='min-h-screen'>
        <h1 className='text-center text-7xl font-bold p-4 m-5 bg-slate-100 rounded-xl'>Public Decks</h1>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-5 mx-6 justify-center'>
        {publicDecks && publicDecks.map(deck => (
          <div key={deck.id}>
            <DeckCard deck={deck}/>
          </div>
        ))}
      </div>
    </div>
  )
}
