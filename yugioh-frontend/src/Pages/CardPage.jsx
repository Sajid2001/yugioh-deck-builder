import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setCard } from '../Redux/Features/Card'
import { useParams } from 'react-router-dom'
import CardInfo from '../Components/Deck/CardInfo'

export default function CardPage() {

  const card = useSelector((state) => state.card.value)
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch();
  const {deckId, sectionId, cardId} = useParams();


  const getCard = async() => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/decks/${deckId}/sections/${sectionId}/cards/${cardId}`,{
      headers:{
            'Authorization':`Bearer ${user.token}`
        }
    })
    const json = await response.json()
        console.log(json);
        if (response.ok){
            console.log(json);
            {dispatch(setCard(json))}
        }
  }

  useEffect(() => {
    getCard();
  },[])


  return (
    <div>
      {card && 
        <CardInfo card={card}/>
    }
    </div>
  )
}
