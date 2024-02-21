import { ChangeEvent, useEffect, useRef, useState } from 'react'
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

  // browser theme
  function handleToggle(e) {
    if (e.target.checked) {
      setTheme('night')
    } else {
      setTheme('lofi') //light
    }
  }
  // browser theme
  useEffect(() => {
    localStorage.setItem('theme', theme)
    const localTheme = localStorage.getItem('theme') ?? 'lofi'
    document.querySelector('html')?.setAttribute('data-theme', localTheme)
  }, [theme])

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

  return (
    <>
      {/* Light and dark mode component rendering */}
      <div className="flex container m-3 justify-start">
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            onChange={handleToggle}
            checked={theme === 'lofi' ? false : true}
          />

          {/* sun icon */}
          <svg
            className="swap-on fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-off fill-current w-10 h-10 text-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
      {/* end Light and dark mode section */}
      <div className="flex items-center flex-col justify-center h-screen gap-y-5">
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
                className="rounded-none md:object-cover m-auto imgSearch"
                alt=""
              />
            </a>
          </LightGallery>

          {/* end */}
        </div>
        <h1 className="text-2xl">{planetItem[+planetId]?.data[0]?.title}</h1>
        <div className="flex">
          <button>
            <img
              className="object-contain hole_animation deskPlans"
              src={BH_IMAGE}
              onClick={openModal}
            />
          </button>
          <button>
            <img
              className="object-contain flex-end sun_animation deskPlans"
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
