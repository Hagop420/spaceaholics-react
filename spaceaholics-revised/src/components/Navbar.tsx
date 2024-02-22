import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/translucent.css'
import { Item } from './planetProvider'

export function Navbar() {
  const [planetItems, setPlanetItems] = useState<Item[]>([])

  const buttonTooltip = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (buttonTooltip.current) {
      tippy(buttonTooltip.current, {
        content: 'Favorite Planets', // Tooltip content
        placement: 'bottom',
      })
    }
  }, [])

  const favPlanet = () => {
    const item = localStorage.getItem('Planet_information')
    if (!item) {
      localStorage.setItem('Planet_information', JSON.stringify(planetItems))
    }
    navigate('/favoritePlanets')
  }

  return (
    <nav className="p-3 navbar flex justify-between sm:justify-around bg-slate-400">
      <div className="transform rotate-3 transition-transform duration-300 ease-in-out hover:rotate-6">
        <h1 className="text-2xl">Galaxy Quest🪐</h1>
      </div>

      <button
        className="py-2 px-5 bg-black font-semibold rounded-full shadow-md hover:bg-amber-400"
        ref={buttonTooltip}
        onClick={favPlanet}
      >
        🌎⭐
      </button>
    </nav>
  )
}
