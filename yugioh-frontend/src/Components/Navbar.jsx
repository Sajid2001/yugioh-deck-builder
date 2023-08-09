import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLogout } from '../Hooks/UseLogout'
import logo from '../assets/puzzle.png'

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const user = useSelector((state) => state.user.value)
  const {logout} = useLogout();

  const openMobileMenu = () => {
    setMobileMenu(!mobileMenu)
  }
  return (
    <header className="bg-amber-300 sticky top-0">
        <nav className="flex justify-between items-center w-[92%] p-4  mx-auto">
          <img className='h-12 mx-2 rounded-xl' src={logo} alt='logo'/>
            <a href='/' className="font-bold text-xl md:text-3xl hover:opacity-50 transition-all transition-duration-200 ease-in">
              Duel.it
            </a>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto ml-6">
              <div className="text-xl hidden md:flex md:flex-grow">
                {user &&
                  <>
                    <a href="/" className="block mt-4 lg:inline-block lg:mt-0 hover:opacity-70 mr-4">
                      My Decks
                    </a>
                    
                    <a href="/decks/public" className="block mt-4 lg:inline-block lg:mt-0 hover:opacity-70 mr-4">
                      Public Decks
                    </a>
                  </>
                }
              </div>
            </div>
            <div className="flex items-center gap-6">
              {!user &&
                <>
                  <a href='/signin' className="px-3 py-2 underline text-lg hidden md:flex md:flex-grow">Sign in</a>
                  <a href='/signup' className="px-3 py-2 underline text-lg hidden md:flex md:flex-grow">Sign up</a>
                </>
              }
              {user &&
                <>
                  <div className='text-sm md:text-lg hidden md:flex md:flex-grow'>{user.username}</div>
                  <button onClick={logout} className="bg-orange-400 hover:bg-orange-600 text-white px-5 py-2 rounded-full md:text-lg text-xs hidden md:flex md:flex-grow">Log Out</button>
                </>
              }
                <button onClick={openMobileMenu} className='flex flex-grow md:hidden'>
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 6l16 0"></path>
                    <path d="M4 12l16 0"></path>
                    <path d="M4 18l16 0"></path>
                  </svg>
                </button>
            </div>
      </nav>
    {mobileMenu && 
      (<div className='flex flex-col md:hidden p-3 bg-amber-200 text-left text-md'>
        {user &&
          <>
            <a href="/" className='p-2 hover:opacity-50'>
              My Decks
            </a>
          
            <a href="/decks/public" className='p-2 hover:opacity-50'>
              Public Decks
            </a>
          </>
        }
          {!user &&
            <>
              <a href='/signin' className='p-2 hover:opacity-50'>
                Sign in
              </a>
              <a href='/signup' className='p-2 hover:opacity-50'>
                Sign up
              </a>
            </>
          }
          {user &&
            <>
              <div className='p-2 hover:opacity-50'>
                {user.username}
              </div>
              <button onClick={logout} className="p-2 hover:opacity-50 text-left">Log Out</button>
            </>
          }
        </div>
      )
    }
    </header>
  )
}
