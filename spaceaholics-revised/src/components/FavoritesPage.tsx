import { FaPencil } from 'react-icons/fa6'
import { Item } from './planetProvider'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { usePlanet } from '../lib/usePlanet'
import { FaHome } from 'react-icons/fa'
import LightGallery from 'lightgallery/react'
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
  src: string
  title: string
}

export function FavoritePlanets({
  planet,
  src,
  title,
}: PlanetStoringImagesAndContentsProp) {
  console.log()

  const navigate = useNavigate()

  // navbar home button function
  const homeApi = () => {
    // play the click sound
    const clickSoundEffect = new Audio(
      'https://www.fesliyanstudios.com/play-mp3/387',
    )
    clickSoundEffect.play()
    navigate('/')
  }

  // state for theme

  // const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'lofi')

  // LS destructured

  const { setStoredFavorite, setImageContentStored } = usePlanet()

  // get my local storage items
  useEffect(() => {
    setStoredFavorite()
  }, [])

  // iframe pause useEffect

  useEffect(() => {
    function framesChange() {
      const iframes = document.querySelectorAll<HTMLIFrameElement>(
        '.pause_first',
      )

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

  useEffect(() => {
    function framesChange() {
      const iframe = document.querySelector<HTMLIFrameElement>('.main_iframe')

      if (iframe !== null) {
        const temp = iframe.src
        iframe.src = temp
      }
    }

    function handleResize() {
      if (window.innerWidth > 768) {
        framesChange()
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // pause all other i frames when the targeted i frame is fullScreen
  useEffect(() => {
    const handleFullScreenChange = (e: { target: any }) => {
      const fullscreenElement: any = document.fullscreenElement

      const clickedIframe = e.target

      if (
        fullscreenElement ||
        fullscreenElement.classList.contains('fullScreen')
      ) {
        iframes.forEach((iframe) => {
          if (
            iframe !== clickedIframe &&
            iframe.classList.contains('fullScreen')
          ) {
            const temp = iframe.src
            iframe.src = temp
          }
        })
      }
    }

    const iframes = document.querySelectorAll('.fullScreen') as NodeListOf<
      HTMLIFrameElement
    >

    iframes.forEach((iframe) => {
      iframe.addEventListener('fullscreenchange', handleFullScreenChange)
      iframe.addEventListener('webkitfullscreenchange', handleFullScreenChange)
      iframe.addEventListener('mozfullscreenchange', handleFullScreenChange)
      iframe.addEventListener('MSFullscreenChange', handleFullScreenChange)
    })

    return () => {
      iframes.forEach((iframe) => {
        iframe.removeEventListener('fullscreenchange', handleFullScreenChange)
        iframe.removeEventListener(
          'webkitfullscreenchange',
          handleFullScreenChange,
        )
        iframe.removeEventListener(
          'mozfullscreenchange',
          handleFullScreenChange,
        )
        iframe.removeEventListener('MSFullscreenChange', handleFullScreenChange)
      })
    }
  }, [])
  // end UE

  if (planet.length === 0) {
    return (
      <>
        <nav className="p-2 navbar flex justify-between sm:justify-around bg-blue-400">
          <div className="transform rotate-3 transition-transform duration-300 ease-in-out hover:rotate-6">
            <h1 className="text-2xl">
              <Link to="/" onClick={homeApi}>
                Galaxy Quest🪐
              </Link>
            </h1>
          </div>

          <button
            className="py-2 px-5 bg-black font-semibold rounded-full shadow-md hover:bg-slate-800"
            onClick={homeApi}
          >
            <FaHome color="white" />
          </button>
        </nav>

        {/* body */}

        <h2 className="text-center text-2xl p-5 font-bold">
          No Favorite Planets 🪐🌙 🌏
        </h2>

        <LightDarkMode />

        <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3">
          <iframe
            width="510"
            height="315"
            className="md:m-3 md:p-20 sm:mb-4 lg:p-12 pause_first fullScreen"
            src="https://www.youtube.com/embed/XeUP83wRhjQ?si=dQiGHoF1bITIhvt-"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          {/* iframe 2 */}
          <iframe
            width="520"
            height="315"
            className="md:m-3 md:p-20 sm:mb-4 lg:p-12 pause_first fullScreen"
            src="https://www.youtube.com/embed/X7GE6Ye8c3c?si=OBtQXOdfDMqOdS4t"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          {/* iframe3 */}
          <iframe
            width="520"
            height="315"
            className="md:m-3 md:p-20 sm:mb-4 lg:p-12 pause_first fullScreen"
            src="https://www.youtube.com/embed/pJZQlX2Fs7A?si=CeprScpcxUVKxAdH"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          {/* iframe4 */}
          <iframe
            width="520"
            height="315"
            className="md:m-3 md:p-20 sm:mb-4 lg:p-12 pause_first fullScreen"
            src="https://www.youtube.com/embed/iqnpZngxYMs?si=S3BV9_ONHk7JbMXD"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          {/* iframe5 */}
          <iframe
            width="520"
            height="315"
            className="md:m-3 md:p-20 sm:mb-4 lg:p-12 pause_first fullScreen"
            src="https://www.youtube.com/embed/JhGNH88XshI?si=LlvtF1YYSICzg_AG"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          {/* iframe6 */}
          <iframe
            width="520"
            height="315"
            className="md:m-3 md:p-20 sm:mb-4 lg:p-12 pause_first fullScreen"
            src="https://www.youtube.com/embed/IP-JCw2Lrks?si=hQ3VwZPxQbJL6hxz"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        <div className="flex justify-center m-8 p-10 md:hidden">
          <iframe
            width="770"
            height="660"
            src="https://www.youtube.com/embed/wzjWIxXBs_s?si=NAiFGFWQ-2Sn9W-G"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="main_iframe sm:rounded"
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
          <h1 className="text-2xl">Galaxy Quest🪐</h1>
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
