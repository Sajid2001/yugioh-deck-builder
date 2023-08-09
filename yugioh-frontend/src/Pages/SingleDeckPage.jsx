import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setSections } from '../Redux/Features/Sections';
import { setDeck } from "../Redux/Features/SingleDeck";
import { useEffect } from "react";
import Section from "../Components/Deck/Section";
import UpdateDeckForm from "../Components/Deck/UpdateDeckForm";


export default function SingleDeckPage() {


  let { id } = useParams()
  const sections = useSelector((state) => state.sections.value)
  const deck = useSelector((state) => state.singleDeck.value)
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch();

  const getDeck = async() => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/decks/${id}`,{
      headers:{
            'Authorization':`Bearer ${user.token}`
        }
    })
    const json = await response.json()
    console.log(json);
    if (response.ok){
        console.log(json);
        {dispatch(setDeck(json))}
    }
  }


  const getSections = async() => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/decks/${id}/sections`,{
      headers:{
            'Authorization':`Bearer ${user.token}`
        }
    })
    const json = await response.json()
        console.log(json);
        if (response.ok){
            console.log(json);
            {dispatch(setSections(json))}
        }
  }

  useEffect(() => {
    getSections();
    getDeck();
  },[]) 

  return (
    <div className="flex flex-col">
      <div className="mb-4 text-3xl md:text-8xl text-center font-light">
        {deck.name}
      </div>
      <div className="text-3xl text-center font-bold">
        Visibility: {deck.is_public ? "Public" : "Private"}
      </div>
      {deck.user_id === user.id &&

      <div className="m-6 p-3 flex flex-col items-center">
       <UpdateDeckForm id= {id} status = {deck.is_public}/>
      </div>
    }
    <div className="flex flex-col md:flex-row">
      {sections && sections.map(section => (
        <div key={section.id} className="w-full md:w-1/3 text-center my-3">
          <Section userId = {deck.user_id} section={section}/>
        </div>
      ))}
    </div>
    
    </div>
  )
}
