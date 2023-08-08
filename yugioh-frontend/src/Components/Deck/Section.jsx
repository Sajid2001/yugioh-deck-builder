import React from 'react'
import SingleCard from './SingleCard'
import CardForm from './CardForm'

export default function Section({section}) {
  return (
    <div className='flex flex-col'>
        <h1 className='text-4xl font-bold'>
            {section.name}
        </h1>
        <CardForm section = {section}/>
        <div className='grid gap-1 grid-cols-2 md:grid-cols-4 items-center'>
            {section.cards.length > 0 && section.cards.map(card => (
                <div key={card.name}>
                    <SingleCard card={card}/>
                </div>
            ))}
        </div>
    </div>
  )
}
