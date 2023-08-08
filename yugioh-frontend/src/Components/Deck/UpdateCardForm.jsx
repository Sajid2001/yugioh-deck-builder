import { useState } from 'react'
import { editCard } from '../../Redux/Features/Card'
import { useDispatch, useSelector } from 'react-redux'

export default function UpdateCardForm({handleFormOpen, cardQuantity, card}) {

  const [quantity, setQuantity] = useState(cardQuantity)
  const [section, setSection] = useState('')
  const [error, setError] = useState('')

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value)

  const handleSubmit = async(e) => {

    e.preventDefault();

    const newCardData = {
      quantity: quantity,
      section: section,
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/decks/${card.deck_id}/sections/${card.section_id}/cards/${card.id}`,{
      method:"PUT",
      body: JSON.stringify(newCardData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${user.token}`
    }
  })

    const json = await response.json()

    if(!response.ok){
      setError(json.error);
    }

    if (response.ok){
      {dispatch(editCard(json))}
      handleFormOpen();
    }

  }

  const changeQuantity = (value) => {
    if (value > 0 && value < 4){
        setQuantity(value)
    } 
  }

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-xs min-w-full my-3">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
            Edit Quantity
          </label>
          <span className='flex flex-row justify-center items-center'>
            <button type='button' onClick={() => changeQuantity(quantity - 1)} className='p-2 w-8 font-bold text-white bg-blue-500 hover:bg-blue-700 m-2 rounded-lg transition-duration-200 transition-all ease-in'>-</button>
            {quantity}
            <button type='button' onClick={() => changeQuantity(quantity + 1)} className='p-2 w-8 font-bold text-white bg-blue-500 hover:bg-blue-700 m-2 rounded-lg transition-duration-200 transition-all ease-in'>+</button>
          </span>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="section">
            Change Section
          </label>
          <select value={section} onChange={(e) => {setSection(e.target.value)}} className='w-full min-w-full shadow border p-2' data-te-select-init>
            <option value="">Select an option</option>
            <option value="Main Deck">Main Deck</option>
            <option value="Side Deck">Side Deck</option>
            <option value="Extra Deck">Extra Deck</option>
          </select>
          {section !== '' && <div className='m-2 text-light text-center'>
            This card will be moved to the {section}
          </div>}
        </div>
        <div className="flex items-center justify-between">
          <button className="mr-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Edit
          </button>
          <button onClick={handleFormOpen} className="max-w-xs bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Close
          </button>
        </div>
        {error && 
          <div className='my-1 p-2 text-red-400 font-light text-md'>
              {error}
          </div>}
      </form>
    </div>
  )
}
