import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import DecksPage from './Pages/DecksPage'
import Footer from './Components/Footer'
import SigninPage from './Pages/SigninPage'
import SignupPage from './Pages/SignupPage'
import SingleDeckPage from './Pages/SingleDeckPage'
import CardPage from './Pages/CardPage'
import HomePage from './Pages/HomePage'
import NotFoundPage from './Pages/NotFoundPage'
import NewDeckPage from './Pages/NewDeckPage'
import PublicDecksPage from './Pages/PublicDecksPage'
import { useSelector } from 'react-redux'

function App() {

  const user = useSelector((state) => state.user.value)

  return (
    <div>
      <Navbar/>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={user ? <HomePage/> : <Navigate to={'/signin'}/>}>
              <Route path="/" element={<Navigate replace to="decks"/>} />
              <Route path='decks' element={<DecksPage/>}/>
              <Route path='decks/public' element={<PublicDecksPage/>}/>
              <Route path='decks/new' element={<NewDeckPage/>}/>
              <Route path='deck/:id' element={<SingleDeckPage/>}/>
              <Route path = "deck/:deckId/section/:sectionId/card/:cardId" element={<CardPage/>}/>
            </Route>
            <Route path='/signin' element={!user ? <SigninPage/> : <Navigate to={'/'}/>}/>
            <Route path='/signup' element={!user ? <SignupPage/> : <Navigate to={'/'}/>}/>
            <Route path='*' element={<NotFoundPage />}/>
          </Routes>
        </BrowserRouter>
      <Footer/>
    </div>
  )
}

export default App
