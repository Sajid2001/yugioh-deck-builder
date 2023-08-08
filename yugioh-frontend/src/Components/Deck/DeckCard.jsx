import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDeck } from '../../Redux/Features/Decks'
import { deletePublicDeck } from '../../Redux/Features/PublicDecks';

export default function DeckCard({deck}) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value)

  const removeDeck = async() => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/decks/${deck.id}`,{
      method: 'DELETE',
      headers:{
        'Authorization':`Bearer ${user.token}`
      },
    })

    const json = await response.json()
    console.log(json);
    if (response.ok) {
      {dispatch(deleteDeck(deck.id))}
      {dispatch(deletePublicDeck(deck.id))}
    }
  }
  

  return (
    <div className="max-w-sm p-6 bg-amber-200 border border-[#FDDD6C] border-4 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div>
            <span className='flex flex-row justify-between'>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{deck.name}</h5>
              {user && deck.user_id === user.id && 
                <button onClick={removeDeck}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 7l16 0"></path>
                    <path d="M10 11l0 6"></path>
                    <path d="M14 11l0 6"></path>
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                  </svg>
                </button>
              }
            </span>
        </div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{deck.date_created}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> Visibility: {deck.is_public ? "Public" : "Private"}</p>
        <a href={`/deck/${deck.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-500 rounded-lg hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-red-300 transition-all transition-duration-200 ease-in">
            View
            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
  )
}
