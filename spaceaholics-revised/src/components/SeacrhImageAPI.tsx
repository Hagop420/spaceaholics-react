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

export function SearchImageAPI() {
  // input state search for any nasa stuff
  const [inp, setInp] = useState<any>('')

  // href API apod image state

  const [hrefImg, setHrefImg] = useState<any>()

  const [populateContent, setPopulateContent] = useState<any>()

  // data content API state

  // audio modal state

  const [audio, setAudio] = useState('')

  const [dataApi, setDataApi] = useState<any>([])

  // input is blank or not state

  const [isI, setIsI] = useState(true)

  // API convert to json state

  const [inputApi, setInputApi] = useState<Response>()

  // input blank state

  const [inpReq, setInpReq] = useState<string>('')

  // content state random from API
  const [displayedContent, setDisplayedContent] = useState<Item>()

  // LS from usePlanet hook

  // const { setPlanetFavorite, imageContentStored } = usePlanet()

  const { setPlanetFavorite, imageContentStored } = usePlanet()
  // video pausing

  // state for modal

  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate()

  // iframe pause useEffect
  useEffect(() => {
    function framesChange() {
      const iframe = document.querySelector('.pause_first')

      if (iframe !== null) {
        const temp = iframe.src
        iframe.src = temp
      }
    }

    function handleResize() {
      if (window.innerWidth < 1024) {
        framesChange()
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // input field keydown change validation function

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInp(e.target.value)
    const inputSearchTargetCheck = e.target.value
    const regexInp = /^\s*$/

    if (inputSearchTargetCheck === '') {
      setInpReq('⛔')
      return
    } else if (regexInp.test(inputSearchTargetCheck)) {
      setInpReq('⛔')
      return
    } else {
      setInpReq('✅')
    }
    setInpReq('')
  }

  // fetching my APOD search input API
  async function handleInputChange() {
    try {
      const getApodCurrImg = await fetch(
        `https://images-api.nasa.gov/search?q=${inp}`,
      )

      const jsonConverted = await getApodCurrImg.json()
      setInputApi(jsonConverted)
      // console.log(jsonConverted?.collection)

      // console.log(jsonConverted.collection)

      const randomNumber = Math.floor(
        Math.random() * jsonConverted?.collection.items.length,
      )

      // console.log(randomNumber)

      const apodImgCol =
        jsonConverted?.collection.items[randomNumber].links[0].href
      // console.log(apodImgCol)

      setHrefImg(apodImgCol)
      setDisplayedContent(jsonConverted?.collection.items[randomNumber])
      const dataCol = jsonConverted?.collection.items[randomNumber].data

      for (let i = 0; i < dataCol.length; i++) {
        if (dataCol[i]?.keywords === undefined) {
          break
        } else if (dataCol[i]) {
          const regexTags = /<[^>]*>/g // Match any HTML tags
          const regexEntities = /&[a-zA-Z]+;/g // Match HTML entities like &lt;
          const regexHref = /href\s*=\s*["'][^"']*["']/g // Match href attributes

          let result = dataCol[i]?.description.replace(regexTags, '') // Remove HTML tags
          result = result.replace(regexEntities, '') // Remove HTML entities
          result = result.replace(regexHref, '')
          dataCol[i].description = result
          // console.log(result)
        }
      }
      setDataApi(dataCol)

      // return <img src={hrefImg} alt="" />
    } catch (err) {
      const input_mobile = document.querySelector('.inpMobile')

      if (input_mobile?.value === '') {
        alert('Input field is a required field')
        return
      }

      alert('Input value invalid')
    }
  }

  useEffect(() => {
    setHrefImg(hrefImg)
    setDataApi(dataApi)
  }, [])

  useEffect(() => {
    if (imageContentStored) {
      setHrefImg(imageContentStored.links[0]?.href)
      setDataApi(imageContentStored.data[0].center)
      console.log(imageContentStored)
    }
  }, [imageContentStored])

  const audioCreation = new Audio()
  //  effect for the planet clicked to update the jsx

  // putting the data in my LS when star is clicked
  function stored() {
    if (displayedContent === undefined) return
    setPlanetFavorite(displayedContent)
    navigate('/favoritePlanets')
  }

  // audio ref hook
  const audioRef = useRef(new Audio())

  const openModal = () => {
    setIsOpen(true)
    // Play audio when modal opens
    // const audio = new Audio(
    //   'https://dl.vgmdownloads.com/soundtracks/club-penguin-online-unofficial-soundtrack-online-windows-gamerip-2018/tltdklykwt/2-12.%20Pizza%20Parlor.mp3',
    // )
    // audio.play()

    const audio = audioRef.current
    audio.src =
      'https://dl.vgmdownloads.com/soundtracks/club-penguin-original-soundtrack/vgxkhusmkl/07.%20Box%20Dimension.mp3'
    audio.loop = true
    audio.play()
  }

  const closeModal = () => {
    setIsOpen(false)
    audioCreation.pause()
    const audio = audioRef.current
    audio.pause()

    // play the click sound
    const clickSoundEffect = new Audio(
      'https://www.fesliyanstudios.com/play-mp3/387',
    )
    clickSoundEffect.play()
  }

  function planetFavoritesSwapped() {
    navigate('/favoritePlanets')
  }

  return (
    <>
      <section className="flex justify-center sm:m-10 md:justify-start container">
        <div className="hidden sm:flex lg:flex sm:m-auto sm:justify-center">
          <input
            className=" rounded sm:w-60 sm:m md:w-80 lg:w-80 xl:w-96 lofiInput"
            type="text"
            placeholder="Feeling spacy..."
            value={inp}
            onChange={handleChange}
          />

          <div className="flex flex-col justify-center items-start">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors BL duration-300 p-2 ml-3"
              onClick={handleInputChange}
            >
              <FaSearch className="search-icon" color="black" />
            </button>
          </div>
        </div>

        <iframe
          width="500"
          height="295"
          className="m-4 lg:w-96"
          src="https://www.youtube.com/embed/_IkaetPoBZM?si=E2HSa_s5AqMQVjX2"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <iframe
          width="500"
          height="295"
          className="rounded pause_first hidden sm:hidden sm:m-4 lg:flex lg:w-96"
          src="https://www.youtube.com/embed/5vjl6tdwmFA?si=rlEamOmZYS3Vts_t"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </section>

      <div className="flex justify-center sm:hidden">
        <input
          className="form-control w-60 rounded inpMobile lofiInput"
          type="text"
          value={inp}
          placeholder="Feeling spacy..."
          onChange={handleChange}
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white BL font-bold py-2 px-4 rounded transition-colors duration-300 ml-3 p-2"
          onClick={handleInputChange}
        >
          <FaSearch className="search-icon" color="black" />
        </button>
        <div className={isI ? 'ml-3 text-2xl' : ''}>{inpReq}</div>
      </div>

      <div className="m-auto sm:flex sm:flex-col lg:flex lg:flex-row justify-center">
        {hrefImg && (
          <LightGallery
            plugins={[lgThumbnail, lgHash, lgPager, lgRotate, lgShare]}
          >
            <a
              data-lg-size="1406-1390"
              className="gallery-item"
              data-src={hrefImg} // Set data-src to the href value
              href={hrefImg} // Set href to the href value
              data-sub-html={`<div className='galleryContents'>
                  <h2 className='text-2xl'><a href='https://unsplash.com/@entrysquare' ><strong>Title</strong>: ${
                    dataApi[0]?.title
                  } <br> <div className='para'><p className=' text-4xl'><strong>Description:</strong> ${
                dataApi[0]?.description
              }</p>  </a></div>
              <strong>Center:</strong> ${dataApi[0]?.center}</p>
              <br>
                  <strong>Keywords:</strong> ${
                    dataApi[0]?.keywords?.join(', ') || 'No Keywords'
                  }</p><br>
                  <strong>Id:</strong> ${dataApi[0]?.nasa_id}</p><br>
                  <strong>Created on:</strong>
                  <span>${dataApi[0]?.date_created || 'No date'}</span>
                  <br>
                  <strong>Photo credit:</strong>
                  <span>${dataApi[0]?.secondary_creator || 'No creator'}</span>
                  
                  </h2>
                  
                  
                  </div>`}
            >
              <img
                src={hrefImg}
                className="rounded-none md:object-cover m-auto imgSearch"
                alt=""
              />
            </a>
          </LightGallery>
        )}

        <div className="hidden item-width sm:flex sm:flex-col sm:items-center sm:text-center lg:text-left sm:justify-start sm:m-auto lg:items-start content-width">
          <span className="text-2xl font-bold">
            <h1>{dataApi[0]?.title}</h1>
          </span>
          {dataApi.length > 0 && !dataApi[0].hasOwnProperty('description') ? (
            <span>No description available</span>
          ) : (
            <span>{dataApi[0]?.description}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center text-center sm:hidden">
        <h1 className="text-2xl p-1 m-1 font-bold flex">
          {dataApi[0]?.title}
          <span className="invisible">l</span>
          {/* `${<span class=invisible>ewd</span}` */}
          {dataApi[0]?.title ? (
            <span>
              <h1 className="invisible">l</h1>
              {/* {dataApi[0]?.center} */}
            </span>
          ) : (
            <p>{dataApi[0]?.date_created}</p>
          )}
        </h1>
        <div className="block font-bold">
          {dataApi[0]?.date_created ? (
            <h1>Date Taken: {dataApi[0]?.date_created}</h1>
          ) : (
            // <h2>dataApi</h2>
            <span>{dataApi[0]?.description}</span>
          )}
        </div>
        {dataApi.length > 0 && !dataApi[0].hasOwnProperty('description') ? (
          <h1>No description available</h1>
        ) : (
          // <h2>dataApi</h2>
          <span>{dataApi[0]?.description}</span>
        )}

        <div className="text-3xl hover:text-yellow-300">
          <button onClick={stored}>{hrefImg ? <FaStar /> : ''}</button>

          <button>
            {imageContentStored && (
              <div className="flex flex-col justify-between sm:hidden">
                <img className="h-36 object-contain" src={BH_IMAGE} />
                <img className="h-36" src={SUN_IMAGE} />
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="hidden sm:flex sm:flex-col sm:items-center sm:text-3xl hover:text-yellow-300">
        <button onClick={stored}>{hrefImg ? <FaStar /> : ''}</button>

        <button>
          {imageContentStored && (
            <div className="flex justify-between">
              <img
                className="object-contain hole_animation deskPlans"
                src={BH_IMAGE}
                onClick={openModal}
              />
              <img
                className="object-contain sun_animation deskPlans"
                src={SUN_IMAGE}
                onClick={planetFavoritesSwapped}
              />
            </div>
          )}
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
                  onClick={closeModal}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
