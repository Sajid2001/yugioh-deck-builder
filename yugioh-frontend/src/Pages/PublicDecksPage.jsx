import React, { useEffect } from 'react'
import { setPublicDecks } from '../Redux/Features/PublicDecks';
import { useDispatch, useSelector } from 'react-redux';
import DeckCard from '../Components/Deck/DeckCard';

export default function PublicDecksPage() {

    const publicDecks = useSelector((state) => state.publicDecks.value)
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch();

    const getPublicDecks = async() => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/decks/public`,
        {
          headers:{
                'Authorization':`Bearer ${user.token}`
            }
        }
      )

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
        <h1 className='text-center text-7xl font-bold bg-amber-300 py-24 px-6'>Public Decks</h1>
        {publicDecks && 
        <>
          {publicDecks.length === 0 &&
            <h3 className='font-light text-center text-3xl mt-6'>
              It appears that there are no public decks at this time :/ <br/> Try again another time
            </h3>
          }
          <div className='grid grid-cols-1 md:grid-cols-4 gap-5 mx-12 justify-center'>
          {publicDecks.length > 0 && publicDecks.map(deck => (
            <div key={deck.id}>
              <DeckCard deck={deck}/>
            </div>
          ))}
        </div>
      </>
      }
    </div>
  )
}
