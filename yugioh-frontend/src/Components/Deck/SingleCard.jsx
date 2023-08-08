import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCardFromSection } from '../../Redux/Features/Sections'
import { useNavigate } from 'react-router-dom';
import { setCard } from '../../Redux/Features/Card';


export default function SingleCard({card}) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value)
  const navigate = useNavigate();

  const deleteCard = async() => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/decks/${card.deck_id}/sections/${card.section_id}/cards/${card.id}`,{
      method: 'DELETE',
      headers:{
        'Authorization':`Bearer ${user.token}`
      }
    })
    const json = await response.json()
    console.log(json);
    if (response.ok) {
      {dispatch(deleteCardFromSection(json))}
    }
  }

  const navigateToCard = () => {
    {dispatch(setCard(null))}
    navigate(`/deck/${card.deck_id}/section/${card.section_id}/card/${card.id}`)
  }

  return (
    <div className='m-1 p-2 relative'>
        <img src={card.url} alt="Image" />
        <div className='absolute top-0 right-0 font-bold bg-teal-200 w-8 text-md p-1 rounded-lg'>{card.quantity}</div>
        <button onClick={navigateToCard} className='m-1 bg-slate-100 p-2 rounded-md hover:bg-slate-300 transition-all transition-duration-200 ease-in'>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
            <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
          </svg>
        </button>
        <button onClick={deleteCard} className='m-1 bg-red-300 p-2 rounded-md hover:bg-red-500 transition-all transition-duration-200 ease-in'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.3956 7.75734C16.7862 8.14786 16.7862 8.78103 16.3956 9.17155L13.4142 12.153L16.0896 14.8284C16.4802 15.2189 16.4802 15.8521 16.0896 16.2426C15.6991 16.6331 15.0659 16.6331 14.6754 16.2426L12 13.5672L9.32458 16.2426C8.93405 16.6331 8.30089 16.6331 7.91036 16.2426C7.51984 15.8521 7.51984 15.2189 7.91036 14.8284L10.5858 12.153L7.60436 9.17155C7.21383 8.78103 7.21383 8.14786 7.60436 7.75734C7.99488 7.36681 8.62805 7.36681 9.01857 7.75734L12 10.7388L14.9814 7.75734C15.372 7.36681 16.0051 7.36681 16.3956 7.75734Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M4 1C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4C23 2.34315 21.6569 1 20 1H4ZM20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3Z" fill="currentColor" /></svg>
        </button>
    </div>
  )
}
