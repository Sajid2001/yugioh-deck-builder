import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCardToSection } from '../../Redux/Features/Sections'

export default function SearchResult({card, section}) {
    
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);
    const user = useSelector((state) => state.user.value)

    const dispatch = useDispatch();

    const addCard = async() => {
        setError(null)
        const newCard = {
            name:card.name,
            prices:card.prices,
            type:card.type,
            desc:card.desc,
            attack:card.attack,
            defense:card.defense,
            level:card.level,
            url:card.url,
            quantity:quantity
        }
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/decks/${section.deck_id}/sections/${section.id}/cards`, {
			method: 'POST',
			body: JSON.stringify(newCard),
			headers: {
			  'Content-Type': 'application/json',
              'Authorization':`Bearer ${user.token}`
			}
		})
        
        const json = await response.json()

        if (!response.ok) {
			setError(json.error)
		}

        if (response.ok){
            console.log(json);
            {dispatch(addCardToSection(json))}
            setQuantity(1)
        }
    }

    const changeQuantity = (value) => {
        if (value > 0 && value < 4){
            setQuantity(value)
        } 
    }

  return (
    <div className='bg-amber-300 p-3 m-2 rounded-lg'>
        <div className='flex flex-row'>
            <img className='w-1/2 object-scale-down' src={card.url} alt="Card image" />
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-3xl font-bold p-3'>{card.name}</h1>
                <label htmlFor="quantites" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Quantity</label>
                <span>
                    <button onClick={() => changeQuantity(quantity - 1)} className='p-2 font-bold text-white bg-orange-500 hover:bg-orange-700 m-2 rounded-lg transition-duration-200 transition-all ease-in'>-</button>
                    {quantity}
                    <button onClick={() => changeQuantity(quantity + 1)} className='p-2 font-bold text-white bg-orange-500 hover:bg-orange-700 m-2 rounded-lg transition-duration-200 transition-all ease-in'>+</button>
                </span>
                <button onClick={addCard} className='bg-orange-500 hover:bg-orange-700 transition-duration-200 transition-all ease-in p-3 w-2/3 mt-4 rounded-lg text-white'>Add Card To {section.name}</button>
            </div>
        </div>
    {error && 
        <span className='p-2 text-red-400 font-light text-md'>
            {error}
        </span>}
    </div>
  )
}
