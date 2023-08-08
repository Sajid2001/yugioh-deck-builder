import { useEffect} from 'react'
import DeckCard from '../Components/Deck/DeckCard'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setDecks } from '../Redux/Features/Decks';
import DeckHero from '../Components/Deck/DeckHero';

export default function DecksPage() {

  const decks = useSelector((state) => state.decks.value)
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch();

  const getDecks = async() => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/decks`,{
      headers:{
            'Authorization':`Bearer ${user.token}`
        }
    })
    const json = await response.json()
        console.log(json);
        if (response.ok){
            console.log(json);
            {dispatch(setDecks(json))}
        }
  }

  useEffect(() => {
    getDecks();

  },[])

  return (
    <div>
      <DeckHero/>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5 mx-6 justify-center'>
        {decks && decks.map(deck => (
          <div key={deck.id}>
            <DeckCard deck={deck}/>
          </div>
        ))}
      </div>
    </div>
  )
}
