import React from 'react'

export default function DeckHero() {
  return (
    <div className="bg-[#FDDD6C] py-24 px-6 text-center mb-8">
      <div className='mt-2 mb-12 tracking-tight '>
        <h1 className="text-5xl font-bold md:text-6xl xl:text-7xl p-2">
            Duel.it
          </h1>
          <h3 className="text-2xl font-light md:text-3xl xl:text-4xl p-4">
            Deck Building Made Simple
          </h3>
      </div>
          
          
          <a className="transition-all ease-in transition-duration-200 mb-2 inline-block rounded bg-orange-500 px-8 md:px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#FCD34D] transition duration-150 ease-in-out hover:bg-orange-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mr-2 md:mb-0" href="decks/new">Create a New Deck</a>
        </div>
  )
}
