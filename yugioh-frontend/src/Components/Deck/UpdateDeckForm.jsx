import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editDeck } from '../../Redux/Features/SingleDeck'

export default function UpdateDeckForm({id, status}) {

    const [isPublic, setIsPublic] = useState(false);
    const [newName,setNewName] = useState('')
    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value)

  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  const handleVisible = () => {
    setVisible(!visible)
  }

  const updateDeck = async(e) => {
    e.preventDefault()
    const newDeckData = {
        status:isPublic,
        name: newName
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/decks/${id}`,{
        method:"PUT",
        body: JSON.stringify(newDeckData),
			headers: {
			  'Content-Type': 'application/json',
        'Authorization':`Bearer ${user.token}`
		}
    })

    const json = await response.json()

    if (response.ok){
        console.log(json);
        {dispatch(editDeck(newDeckData))}
        setNewName('')
    }
  }

  useEffect(() => {
    setIsPublic(status);
  }, [status]);

  return (
<div class="w-full max-w-xs">
  <form onSubmit={updateDeck} class="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
        <h2 className='text-3xl text-center my-2'>
          Update Deck
          <button onClick={handleVisible} className='p-3'>
            {visible ? 
            (
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-chevron-up" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 13l3 -3l3 3"></path>
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
              </svg>
            ):
            (<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-chevron-down" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M15 11l-3 3l-3 -3"></path>
              <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18z"></path>
            </svg>)
            }
          </button>
        </h2>
        {visible && <>
        <label class="relative inline-flex items-center cursor-pointer mb-4">
            <input 
            type="checkbox" 
            checked = {isPublic}
            onChange={handleToggle}
            class="sr-only peer"/>
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Set Public</span>
        </label>
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
        New Deck Name
        </label>
      <input 
        value={newName}
        onChange={(e) => {setNewName(e.target.value)}}
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        id="name" 
        type="text" 
        placeholder="New Name"
      />
      <div class="flex items-center justify-between">
      <button class="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Save
      </button>
    </div>
    </>}
  </form>
</div>
  )
}
