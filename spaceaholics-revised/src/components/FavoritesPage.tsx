import { FaPencil } from 'react-icons/fa6'
import { Item } from './planetProvider'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { usePlanet } from '../lib/usePlanet'
import { FaHome } from 'react-icons/fa'
import LightGallery from 'lightgallery/react'
import lgZoom from 'lightgallery/plugins/zoom'
import lgVideo from 'lightgallery/plugins/video'
import '../css/favorites.css'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgHash from 'lightgallery/plugins/hash'
import lgPager from 'lightgallery/plugins/pager'
import lgRotate from 'lightgallery/plugins/rotate'
import lgShare from 'lightgallery/plugins/share'
import { LightDarkMode } from './LightDarkComponent'

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

  // const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'lofi')

  // LS destructured

  const {
    setStoredFavorite,
    setImageContentStored,
    imageContentStored,
  } = usePlanet()

  const [contentPlanet, setContentPlanet] = useState<Item>()

  // // browser theme
  // function handleToggle(e) {
  //   if (e.target.checked) {
  //     setTheme('night')
  //   } else {
  //     setTheme('lofi') //light
  //   }
  // }
  // // browser theme
  // useEffect(() => {
  //   localStorage.setItem('theme', theme)
  //   const localTheme = localStorage.getItem('theme') ?? 'lofi'
  //   document.querySelector('html')?.setAttribute('data-theme', localTheme)
  // }, [theme])

  // get my local storage items
  useEffect(() => {
    setStoredFavorite()
  }, [])

  // iframe pause useEffect
  useEffect(() => {
    function framesChange() {
      const iframes = document.querySelectorAll('.pause_first')

      if (iframes !== null) {
        iframes.forEach((iframe) => {
          const temp = iframe.src
          iframe.src = temp
        })
      }
    }

    function handleResize() {
      if (window.innerWidth < 768) {
        framesChange()
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
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

        <h2 className="text-center text-2xl p-5 font-bold">
          No Favorite Planets 🪐🌙 🌏
        </h2>

        <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3">
          <iframe
            width="510"
            height="315"
            className="md:m-3 md:p-20 sm:mb-4 lg:p-12 pause_first"
            src="https://www.youtube.com/embed/XeUP83wRhjQ?si=dQiGHoF1bITIhvt-"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
          {/* iframe 2 */}
          <iframe
            width="520"
            height="315"
            className="md:m-3 md:p-20 sm:mb-4 lg:p-12 pause_first"
            src="https://www.youtube.com/embed/X7GE6Ye8c3c?si=OBtQXOdfDMqOdS4t"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
          {/* iframe3 */}
          <iframe
            width="520"
            height="315"
            className="md:m-3 md:p-20 sm:mb-4 lg:p-12 pause_first"
            src="https://www.youtube.com/embed/pJZQlX2Fs7A?si=CeprScpcxUVKxAdH"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
          {/* iframe4 */}
          <iframe
            width="520"
            height="315"
            className="md:m-3 md:p-20 sm:mb-4 lg:p-12 pause_first"
            src="https://www.youtube.com/embed/iqnpZngxYMs?si=S3BV9_ONHk7JbMXD"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
          {/* iframe5 */}
          <iframe
            width="520"
            height="315"
            className="md:m-3 md:p-20 sm:mb-4 lg:p-12 pause_first"
            src="https://www.youtube.com/embed/JhGNH88XshI?si=LlvtF1YYSICzg_AG"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
          {/* iframe6 */}
          <iframe
            width="520"
            height="315"
            className="md:m-3 md:p-20 sm:mb-4 lg:p-12 pause_first"
            src="https://www.youtube.com/embed/IP-JCw2Lrks?si=hQ3VwZPxQbJL6hxz"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>

        <div className="flex justify-center m-8 p-10 md:hidden">
          <iframe
            width="770"
            height="660"
            src="https://www.youtube.com/embed/beW6KCQ90Qc?si=9lNwG1TdtTzPJt-B"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="pause_first sm:rounded"
          ></iframe>
        </div>
      </>
    )
  }

  // console.log(setImageContentStored)
  // when pencil icon clicked fire this function

  function delFunctionPlanet(currIndex: number) {
    setImageContentStored(planet[currIndex])
    // setContentPlanet(imageContentStored)
    // play the click sound
    const clickSoundEffect = new Audio(
      'https://www.fesliyanstudios.com/play-mp3/387',
    )
    clickSoundEffect.play()
    navigate(`/EditingPage/${currIndex}`)
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

      <LightDarkMode />

      <div className="flex justify-center">
        <h1 className="text-3xl">Favorite Planets</h1>
      </div>

      <ul className="list-none flex flex-col md:grid md:grid-cols-3 lg:grid lg:grid-cols-3 sm:grid sm:grid-cols-2">
        {planet.map((pl, index) => (
          <li key={index}>
            <>
              <div className="flex m-auto items-center justify-center">
                <LightGallery
                  plugins={[lgThumbnail, lgHash, lgPager, lgRotate, lgShare]}
                >
                  <a
                    data-lg-size="1406-1390"
                    className="gallery-item"
                    data-src={pl.links[0]?.href} // Set data-src to the href value
                    href={pl.links[0]?.href} // Set href to the href value
                    data-sub-html={`<div className='galleryContents'>
                  <h2 className='text-2xl'><a href='https://unsplash.com/@entrysquare' ></a><strong>Title</strong>: ${
                    pl.data[0]?.title
                  } <br> <div className='para'><p className=' text-4xl'><strong>Description:</strong> ${
                      pl.data[0]?.description
                    }</p></div>
              <strong>Center:</strong> ${pl.data[0]?.center}</p>
              <br>
                  <strong>Keywords:</strong> ${
                    pl.data[0]?.keywords?.join(', ') || 'No Keywords'
                  }</p><br>
                  <strong>Id:</strong> ${pl.data[0]?.nasa_id}</p><br>
                  <strong>Created on:</strong>
                  <span>${pl.data[0]?.date_created || 'No date'}</span>
                  <br>
                  <strong>Photo credit:</strong>
                  <span>${pl.data[0]?.secondary_creator || 'No creator'}</span>
                  
                  </h2>
                  
                  
                  </div>`}
                  >
                    <img
                      src={pl.links[0]?.href}
                      className="rounded-none h-28 sm:h-40 lg:rounded"
                      alt=""
                    />
                  </a>
                </LightGallery>
              </div>

              {/* <img src={pl.links[0]?.href} className="m-auto lg:rounded" /> */}
              <div className="flex flex-col items-center">
                <div className="divWrap text-center">
                  <h2 className="font-bold">{pl.data[0].title}</h2>
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
