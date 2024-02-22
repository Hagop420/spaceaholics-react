import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { LightDarkMode } from './LightDarkComponent'
import SCRIBBLES_SVG from '../lib/scribbles.svg'
import '../css/searchImageApi.css'
import BH_IMAGE from '../images/black-hole-image.png'
import SUN_IMAGE from '../images/sun.png'
import { FaHotel, FaSearch, FaStar, FaTimes } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { Item, planetContext } from './planetProvider'
import LightGallery from 'lightgallery/react'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgHash from 'lightgallery/plugins/hash'
import lgPager from 'lightgallery/plugins/pager'
import lgRotate from 'lightgallery/plugins/rotate'
import lgShare from 'lightgallery/plugins/share'
import { usePlanet } from '../lib/usePlanet'
import daisyui from 'daisyui'
import { data } from 'jquery'
import { TbLocationCancel } from 'react-icons/tb'
import { Navbar } from './Navbar'

export function EditingPage() {
  const [isOpen, setIsOpen] = useState(false)

  const { planetId } = useParams()
  const navigate = useNavigate()

  function planetFavoritesSwapped() {
    navigate('/favoritePlanets')
    // play the click sound
    const clickSoundEffect = new Audio(
      'https://www.fesliyanstudios.com/play-mp3/387',
    )
    clickSoundEffect.play()
  }

  const { planetItem, setPlanetItem } = usePlanet()

  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'lofi')

  if (planetId === undefined) return

  console.log(planetItem[+planetId])

  // theme

  //   // browser theme
  //   function handleToggle(e) {
  //     if (e.target.checked) {
  //       setTheme('night')
  //     } else {
  //       setTheme('lofi') //light
  //     }
  //   }
  //   // browser theme
  //   useEffect(() => {
  //     localStorage.setItem('theme', theme)
  //     const localTheme = localStorage.getItem('theme') ?? 'lofi'
  //     document.querySelector('html')?.setAttribute('data-theme', localTheme)
  //   }, [theme])

  //   modal functions

  // audio ref hook
  const audioRef = useRef(new Audio())

  const openModal = () => {
    setIsOpen(true)

    const audio = audioRef.current
    audio.src =
      'https://dl.vgmdownloads.com/soundtracks/club-penguin-original-soundtrack/vgxkhusmkl/07.%20Box%20Dimension.mp3'
    audio.loop = true
    audio.play()
  }

  const closeModal = () => {
    setIsOpen(false)

    const audio = audioRef.current
    audio.pause()

    // play the click sound
    const clickSoundEffect = new Audio(
      'https://www.fesliyanstudios.com/play-mp3/387',
    )
    clickSoundEffect.play()
  }

  function favoritesPlanetGone() {
    if (planetId === undefined) return
    setPlanetItem(+planetId)

    const audio = audioRef.current

    audio.pause()
    navigate('/favoritePlanets')

    const clickSoundEffect = new Audio(
      'https://www.fesliyanstudios.com/play-mp3/387',
    )
    clickSoundEffect.play()
  }

  // months functionallity arr
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const dateString = planetItem[+planetId]?.data[0]?.date_created

  if (dateString === undefined) return

  const date = new Date(dateString)

  const month = monthNames[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()
  let hours = date.getHours()
  const minutes = date.getMinutes()

  // Determine AM/PM
  const amPM = hours >= 12 ? 'PM' : 'AM'

  // Convert hours to 12-hour format
  hours = hours % 12 || 12

  // Pad minutes with leading zero if necessary
  const paddedMinutes = String(minutes).padStart(2, '0')

  return (
    <>
      <Navbar />
      <LightDarkMode />
      <div className="flex items-center flex-col justify-center h-screen gap-y-5">
        <h1 className="text-2xl">
          {`Photo taken on: ${month} ${day} ${year} at ${hours}:${paddedMinutes} ${amPM}`}
        </h1>
        <div className="flex justify-center">
          {/* lightgallery */}

          <LightGallery
            plugins={[lgThumbnail, lgHash, lgPager, lgRotate, lgShare]}
          >
            <a
              data-lg-size="1406-1390"
              className="gallery-item"
              data-src={planetItem[+planetId]?.links[0]?.href} // Set data-src to the href value
              href={planetItem[+planetId]?.links[0]?.href} // Set href to the href value
              data-sub-html={`<div className='galleryContents'>
                  <h2 className='text-2xl'><a href='https://unsplash.com/@entrysquare' ><strong>Title</strong>: ${
                    planetItem[+planetId]?.data[0]?.title || 'No Title'
                  }</a> <br> <div className='para'><p className=' text-4xl'><strong>Description:</strong> ${
                planetItem[+planetId]?.data[0]?.description || 'No description'
              }</p> </div>
              <strong>Center:</strong> ${
                planetItem[+planetId]?.data[0]?.date_created || 'No Center'
              }</p>
              <br>
                  <strong>Keywords:</strong> ${
                    planetItem[+planetId]?.data[0]?.keywords?.join(', ') ||
                    'No Keywords'
                  }</p><br>
                  <strong>Id:</strong> ${
                    planetItem[+planetId]?.data[0]?.nasa_id || 'No Id'
                  }</p><br>
                  <strong>Created on:</strong>
                  <span>${
                    planetItem[+planetId]?.data[0]?.date_created || 'No date'
                  }</span>
                  <br>
                  <strong>Photo credit:</strong>
                  <span>${
                    planetItem[+planetId]?.data[0]?.secondary_creator ||
                    'No creator'
                  }</span>
                  
                  </h2>
                  
                  
                  </div>`}
            >
              <img
                src={planetItem[+planetId]?.links[0]?.href}
                className="rounded md:object-cover m-auto imgSearch"
                alt="Editing Image."
              />
            </a>
          </LightGallery>

          {/* end */}
        </div>
        <h2 className="text-2xl font-bold">
          {planetItem[+planetId]?.data[0]?.title}
        </h2>
        <div className="flex flex-col items-center justify-center sm:flex sm:flex-row">
          <button>
            <img
              className="h-20 sm:h-28 md:h-28 lg:h-10 animate-spin sm:object-contain deskPlans"
              src={BH_IMAGE}
              onClick={openModal}
            />
          </button>
          <button>
            <img
              className="h-20 sm:h-28 md:h-28 lg:object-contain sun_animation sm:object-contain deskPlans"
              src={SUN_IMAGE}
              onClick={planetFavoritesSwapped}
            />
          </button>
        </div>
        {isOpen && (
          <div id="modalContainer" className="modal-container ">
            <div className="flex-col items-center m-auto justify-center openingModalClr h-screen">
              <div className="bg-white rounded p-10">
                <div className="flex justify-end hover:opacity-75 hover:text-blue-950">
                  <button
                    className="flex flex-col items-end float-right justify-end "
                    onClick={closeModal}
                  >
                    <FaTimes color="black" />
                  </button>
                </div>
                <div className="flex p-5">
                  <p className="text-black font-bold text-center">
                    Are you sure you want to delete this awesome image?
                  </p>
                </div>
                <div className="flex justify-between">
                  <button
                    className="modal-button bg-red-600 transition-transform duration-300 ease-in-out hover:scale-110"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="modal-button bg-green-600 transition-transform duration-300 ease-in-out hover:scale-110"
                    onClick={favoritesPlanetGone}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
