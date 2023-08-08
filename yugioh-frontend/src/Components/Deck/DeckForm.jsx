import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createDeck } from '../../Redux/Features/Decks'
import { useNavigate } from 'react-router-dom';

export default function DeckForm() {

    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.value)

    const addDeck = async(e) => {
        
        e.preventDefault();
        const newDeck = {
            name:name
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/decks`, {
			method: 'POST',
			body: JSON.stringify(newDeck),
			headers: {
			    'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`
			}
		})

        const json = await response.json()

        if (response.ok){
            console.log(json);
            {dispatch(createDeck(json))}
            navigate('/decks')
        }
    }

  return (
    <div className="w-full max-w-xs">
        <h2 className='text-3xl font-bold text-center my-3'>Create A New Deck</h2>
        <form onSubmit={addDeck} method='POST' className="bg-amber-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
            </label>
            <input value={name} onChange={e => {setName(e.target.value)}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Deck Name"/>
            </div>
            <div className="flex items-center justify-center">
            <button type="submit" className="transition-all transition-duration ease-in w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Create
            </button>
            </div>
        </form>
    </div>
  )
}
