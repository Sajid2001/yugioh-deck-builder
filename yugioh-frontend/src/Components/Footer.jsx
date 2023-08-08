import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-amber-200 rounded-lg shadow m-4 dark:bg-gray-800 sticky top-[80vh]">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <a href="/" className="text-2xl font-bold">Duel.it</a>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
        <li>
            <a href="/" className="mr-4 hover:underline md:mr-6 ">Home</a>
        </li>
        <li>
            <a href="/" className="mr-4 hover:underline md:mr-6">My Decks</a>
        </li>
        <li>
            <a href="/decks/public" className="mr-4 hover:underline md:mr-6">Public Decks</a>
        </li>
    </ul>
    </div>
</footer>
  )
}
