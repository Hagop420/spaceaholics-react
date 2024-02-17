import { FaPencil } from 'react-icons/fa6'
import { Item } from './planetProvider'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { usePlanet } from '../lib/usePlanet'
import { FaHome } from 'react-icons/fa'
import BH_IMAGE from '../images/black-hole-image.png'
import LightGallery from 'lightgallery/react'
import lgZoom from 'lightgallery/plugins/zoom'
import lgVideo from 'lightgallery/plugins/video'
import '../css/favorites.css'

//planet array type []
type PlanetStoringImagesAndContentsProp = {
  planet: Item[]
}

export function FavoritePlanets({
  planet,
}: PlanetStoringImagesAndContentsProp) {
  console.log()

  const navigate = useNavigate()

  // navbar home button function
  const homeApi = () => {
    navigate('/')
  }

  // state for theme

  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'lofi')

  // LS destructured

  const {
    setStoredFavorite,
    setImageContentStored,
    imageContentStored,
  } = usePlanet()

  const [contentPlanet, setContentPlanet] = useState()

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

  // get my local storage items
  useEffect(() => {
    setStoredFavorite()
  }, [])

  if (planet.length === 0) {
    return (
      <>
        <nav className="p-3 navbar flex justify-between sm:justify-around bg-slate-400">
          <div className="transform rotate-3 transition-transform duration-300 ease-in-out hover:rotate-6">
            <h1 className="text-2xl">Spaceaholics🪐</h1>
          </div>

          <button
            className="py-2 px-5 bg-black font-semibold rounded-full shadow-md hover:bg-amber-400"
            onClick={homeApi}
          >
            <FaHome />
          </button>
        </nav>

        {/* body */}

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

        <h2 className="text-center text-2xl p-5 font-bold">
          No Favorite Planets 🪐🌙 🌏
        </h2>

        <div className="flex flex-col items-center md:hidden">
          <iframe
            width="510"
            height="315"
            className="md:m-3 md:p-12 sm:mb-4"
            src="https://www.youtube.com/embed/XeUP83wRhjQ?si=dQiGHoF1bITIhvt-"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          {/* iframe 2 */}
          <iframe
            width="520"
            height="315"
            className="md:p-12 sm:mb-4"
            src="https://www.youtube.com/embed/X7GE6Ye8c3c?si=OBtQXOdfDMqOdS4t"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          {/* iframe3 */}
          <iframe
            width="520"
            height="315"
            className="sm:mb-4"
            src="https://www.youtube.com/embed/-qePthgj0e0?si=un6DSuX5UaAJSwir"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          {/* iframe4 */}
          <iframe
            width="520"
            height="315"
            className="sm:mb-4"
            src="https://www.youtube.com/embed/4s8Ps9bchvU?si=5FIJlbV68YpzNKUz"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>

        <div className="hidden md:flex md:flex-col md:items-center">
          <iframe
            width="770"
            height="660"
            src="https://www.youtube.com/embed/beW6KCQ90Qc?si=9lNwG1TdtTzPJt-B"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen=""
            class="ifNan"
          ></iframe>
        </div>
      </>
    )
  }

  console.log(setImageContentStored)
  // when pencil icon clicked fire this function

  function delFunctionPlanet(currIndex: number) {
    setImageContentStored(planet[currIndex])
    navigate('/')
  }

  return (
    <>
      <nav className="p-3 navbar flex justify-between sm:justify-around bg-slate-400">
        <div className="transform rotate-3 transition-transform duration-300 ease-in-out hover:rotate-6">
          <h1 className="text-2xl">Spaceaholics🪐</h1>
        </div>

        <button
          className="py-2 px-5 bg-black font-semibold rounded-full shadow-md hover:bg-amber-400"
          onClick={homeApi}
        >
          <FaHome color="gold" />
        </button>
      </nav>

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

      <div className="flex justify-center">
        <h1 className="text-3xl">Favorite Planets</h1>
      </div>

      <ul className="list-none flex flex-col md:grid md:grid-cols-3 lg:grid lg:grid-cols-3 sm:grid sm:grid-cols-2">
        {planet.map((pl, index) => (
          <li key={index}>
            <>
              <LightGallery plugins={[lgZoom, lgVideo]} mode="lg-fade">
                <a
                  data-lg-size="1406-1390"
                  className="gallery-item"
                  data-src={pl.links[0]?.href} // Set data-src to the href value
                  href={pl.links[0]?.href} // Set href to the href value
                  data-sub-html={`
                  <h2 className='text-2xl'><a href='https://unsplash.com/@entrysquare' >Title: ${
                    pl.data[0]?.title
                  } <br> <p className=' text-4xl'><strong>Description:</strong> ${
                    pl.data[0]?.description
                  }</p>  </a>
                  <strong>Keywords:</strong> ${
                    pl.data[0]?.keywords?.join(' ') || 'N/A'
                  }</p>
                  <strong>Center:</strong> ${pl.data[0]?.center}</p>
                  <strong>Id:</strong> ${pl.data[0]?.nasa_id}</p></h2>`}
                >
                  <img
                    className="img-responsive rounded-none m-ato "
                    src={pl.links[0]?.href}
                  />
                </a>
              </LightGallery>

              {/* <img src={pl.links[0]?.href} className="m-auto lg:rounded" /> */}
              <div className="flex flex-col items-center">
                <div className="divWrap text-center">
                  <h2>{pl.data[0].title}</h2>
                  <h2>{pl.data[0].date_created}</h2>
                  <span>
                    {planet.length !== 0 ? (
                      <button
                        className="text-2xl pen"
                        onClick={() => delFunctionPlanet(index)}
                      >
                        <FaPencil />
                      </button>
                    ) : (
                      ''
                    )}
                  </span>
                </div>
              </div>
            </>
          </li>
        ))}
      </ul>
    </>
  )
}
