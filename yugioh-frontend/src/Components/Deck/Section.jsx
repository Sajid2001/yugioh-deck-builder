import React, { useState } from 'react'
import SingleCard from './SingleCard'
import CardForm from './CardForm'
import { useSelector } from 'react-redux'


export default function Section({userId, section}) {
    const user = useSelector((state) => state.user.value)


  return (
    <div className='flex flex-col m-3'>
        <h1 className='text-4xl font-bold'>
            {section.name}
        </h1>
        {user.id === userId &&
        <CardForm section = {section}/>
        }
        {section.cards.length > 0 && 
        <div className='grid gap-1 grid-cols-2 md:grid-cols-4 items-center bg-[#FDDD6C] p-4'>
            {section.cards.map(card => (
                <div key={card.name}>
                    <SingleCard userId={userId} card={card}/>
                </div>
            ))}
        </div>
        }
    </div>
  )
}
