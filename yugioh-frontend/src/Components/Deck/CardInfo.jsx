import {useState} from 'react'
import UpdateCardForm from './UpdateCardForm'

export default function CardInfo({card}) {

    const [formOpened, setFormOpened] = useState(false);


    const handleFormOpen = () => {
        setFormOpened(!formOpened)
    }

  return (
    <div className='flex flex-col md:flex-row p-4 m-4 justify-center items-center'>
      <div className='flex flex-col justify-center items-center w-1/2'>
        {!formOpened && <img className='md:w-1/2' src={card.url} alt="Not loaded" />}
        { !formOpened &&
          <div className='flex flex-col items-center my-4 h-1/2'>
            <p className='text-lg text-center mb-3'>Copies In Deck: {card.quantity}</p>
            <p className='text-lg text-center mb-3'>Section: {card.section_id}</p>
            <div className='flex flex-row gap-5'>
              <button onClick={handleFormOpen} className='bg-orange-500 hover:bg-orange-700 transition-all transition-duration-200 ease-in text-white p-3 rounded-lg w-2/3'>Edit</button>
              <a href={`/deck/${card.deck_id}`} className='text-orange-500 font-bold hover:underline text-center'>Return To Deck</a>
            </div>
          </div>
        }
          {formOpened && 
          <div className='h-1/2'>
            <UpdateCardForm card={card} handleFormOpen = {handleFormOpen} cardQuantity={card.quantity}/>
          </div>
      }
      </div>
        <div className='flex flex-col p-3 items-center'>
          <div className='bg-amber-200 p-3 rounded-lg px-6'>
            <h1 className='m-1 p-3 text-center text-5xl font-bold'>{card.name}</h1>
            <h4 className='m-2 text-xl text-center'>Level: {card.level}</h4>
            <h4 className='text-xl text-center'>Type: {card.type}</h4>
            <div className='flex fex-row justify-around'>
              <p className='p-3 text-lg'>Attack: {card.attack}</p>
              <p className='p-3 text-lg'>Defense: {card.defense}</p>
            </div>
          </div>
          <p className='text-center font-light text-xl my-4 bg-amber-200 p-3 max-w-md rounded-lg'>{card.desc}</p>
          <div className='flex flex-row justify-center items-center m-4'>
            {card.prices && card.prices.map(price => (
              <span key={price.id} className='inline-block bg-amber-200 rounded-lg px-3 py-1 text-xl font-semibold text-gray-700 mr-2 mb-2'>{price.location}: ${price.price}</span>
            ))}
          </div>
        </div>
      </div>
  )
}
