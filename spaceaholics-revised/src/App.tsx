import './App.css'
import { HomePageWrap } from './components/HomePageWrap'
import { FavoritePlanets } from './components/FavoritesPage'
import { ApodImageAPI } from './components/ApodImageAPI'
import { Navbar } from './components/Navbar'
import { SearchImageAPI } from './components/SeacrhImageAPI'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePageWrap />} />
        <Route path="/favoritePlanets" element={<FavoritePlanets />} />
      </Routes>
    </>
  )
}

export default App
