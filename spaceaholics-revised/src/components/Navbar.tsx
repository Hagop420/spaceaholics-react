import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import tippy from 'tippy.js'
import Astronaut from '../images/astronaut.png'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/translucent.css'
import { Item } from './planetProvider'

export function Navbar() {
  const [planetItems] = useState<Item[]>([])

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
    // play the click sound
    const clickSoundEffect = new Audio(
      'https://www.fesliyanstudios.com/play-mp3/387',
    )
    clickSoundEffect.play()
    navigate('/favoritePlanets')
  }

  return (
    <nav className="p-2 navbar flex justify-between sm:justify-around bg-blue-400">
      <div className="transform rotate-3 transition-transform duration-300 ease-in-out hover:rotate-6">
        <h1 className="text-2xl">
          <Link to="/">Galaxy Quest🪐</Link>
        </h1>
      </div>

      <button
        className="py-2 px-5 NVWH bg-blue-100 font-semibold text-2xl rounded-full border-0"
        ref={buttonTooltip}
        onClick={favPlanet}
      >
        🖤
      </button>
    </nav>
  )
}
