import { useState } from 'react'
import './App.css'
import { HomePageWrap } from './components/HomePageWrap'
import { FavoritePlanets } from './components/FavoritesPage'
import { PlanetProvider , type Item } from './components/planetProvider'
import { Route, Routes } from 'react-router-dom'
import { NotFoundPage } from './components/NotFoundPage'




function App() {

  // getting the item array state
  const [planetItems, setPlanetItems] = useState<Item[]>([])

 // state for Item object - only 1
 const [imageContentStored, setImageContentStored] = useState<Item>()


  // Creating the LS function

  function setItemFavoritePlanet(item: Item) {
    let planetFav = [...planetItems, item]
    setPlanetItems(planetFav)
    
    localStorage.setItem('Planet_information', JSON.stringify(planetFav))
  }

 

  // getting my LS planets info parsed
  function storedContents() {
      const getStored = localStorage.getItem('Planet_information')
      setPlanetItems(JSON.parse(getStored))
  }
  
 



// context function
  const contextValuePlanet = {
    planetItem: planetItems,
    setPlanetFavorite: setItemFavoritePlanet,
    setStoredFavorite: storedContents,
    setImageContentStored: setImageContentStored,
    imageContentStored: imageContentStored,
    
    }
  return (
    
    <PlanetProvider value={contextValuePlanet}>
      <Routes>
        <Route index element={<HomePageWrap />} />
        <Route path="/favoritePlanets" element={<FavoritePlanets planet={planetItems} />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </PlanetProvider>
    
  )
}

export default App
