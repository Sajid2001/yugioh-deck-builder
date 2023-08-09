import React from 'react'
import { useSelector } from 'react-redux';

export default function Footer() {
  const user = useSelector((state) => state.user.value)

  return (
    <section className="bg-[#FDDD6C] mt-[200px]">
        <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
            <nav className="flex flex-wrap justify-center -mx-5 -my-2">
                <div className="px-5 py-2">
                    <a href="/decks/public" className="text-base leading-6 text-red-500 hover:text-red-900 transition-all transition-duration-200 ease-in">
                        Public Decks
                    </a>
                </div>
                <div className="px-5 py-2">
                    <a href="/decks" className="text-base leading-6 text-red-500  hover:text-red-900 transition-all transition-duration-200 ease-in">
                        My Decks
                    </a>
                </div>
                <div className="px-5 py-2">
                    <a target='_blank' href="https://ygoprodeck.com/" className="text-base leading-6 text-red-500  hover:text-red-900 transition-all transition-duration-200 ease-in">
                        YGOProDeck API
                    </a>
                </div>
            </nav>
            <p className="mt-8 text-base leading-6 text-center text-gray-400">
                <span className='font-bold text-red-500'>
                  Duel.it Created 2023
                </span>
            </p>
        </div>
    </section>
  )
}
