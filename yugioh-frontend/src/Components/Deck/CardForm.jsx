import {useState} from 'react'
import SearchResult from './SearchResult'
import { useSelector } from 'react-redux'

export default function CardForm({section}) {

    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState(null)
    const user = useSelector((state) => state.user.value)

    const searchCard = async() => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/search?name=${encodeURIComponent(search)}`,{
            headers:{
                  'Authorization':`Bearer ${user.token}`
              }
          })
        const json = await response.json()
            if (response.ok){
                setSearch('')
                console.log(json);
                setSearchResult(json)
            }
    }

  return (
    <div className='m-3 bg-teal-200 rounded-md p-3'>
        <h1 className='text-xl mb-4'>
            Add New Card
        </h1>
        <div className="mb-4">
            <input value={search} onChange={(e) => {setSearch(e.target.value)}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cardName" type="text" placeholder="Card Name"/>
        </div>
        <button onClick={searchCard} className='w-full p-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition-all ease-in transition-duration-200 text-white'>Search</button>
        {searchResult && <SearchResult card={searchResult} section = {section}/>}
    </div>
  )
}
