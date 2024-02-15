import { useEffect, useState } from 'react'
import './App.css'
import { HomePageWrap } from './components/HomePageWrap'
import { FavoritePlanets } from './components/FavoritesPage'
import { PlanetProvider , type Item } from './components/planetProvider'
import { Route, Routes } from 'react-router-dom'




function App() {
  const [planetItems, setPlanetItems] = useState<Item[]>([])

  const [planetPull, setPlanetPull] = useState<Item>()


  function setItemFavoritePlanet(item: Item) {
    let planetFav = [...planetItems, item]
    setPlanetItems(planetFav)
    
    localStorage.setItem('Planet_information', JSON.stringify(planetFav))
  }

 

  function storedContents() {
      const getStored = localStorage.getItem('Planet_information')
      setPlanetItems(JSON.parse(getStored))
}




  const contextValuePlanet = {
    planetItem: planetItems,
    setPlanetFavorite: setItemFavoritePlanet,
    setStoredFavorite: storedContents
  }
  return (
    
    <PlanetProvider value={contextValuePlanet}>
      <Routes>
        <Route index element={<HomePageWrap />} />
        <Route path="/favoritePlanets" element={<FavoritePlanets planet={planetItems} />} />
      </Routes>
    </PlanetProvider>
    
  )
}

export default App
