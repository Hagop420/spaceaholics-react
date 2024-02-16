import { ChangeEvent, useEffect, useState } from 'react'
import '../css/searchImageApi.css'
import { FaSearch, FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Item } from './planetProvider'
import { usePlanet } from '../lib/usePlanet'

export function SearchImageAPI() {
  // input state search for any nasa stuff
  const [inp, setInp] = useState<any>('')

  // href API apod image state

  const [hrefImg, setHrefImg] = useState()

  // data content API state

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

  const { setPlanetFavorite, imageContentStored } = usePlanet()

  // video pausing

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
      if (window.innerWidth < 768) {
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
    const inp = document.querySelector('.inpMobile')

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
  async function handleInputChange(index) {
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
        } else if (dataCol[i]?.keywords) {
          // const regexTags = /<[^>]*>/g // Match any HTML tags
          // const regexEntities = /&[a-zA-Z]+;/g // Match HTML entities like &lt;
          // let result = dataCol[i]?.description.replace(regexTags, '') // Remove HTML tags
          // result = result.replace(regexEntities, '') // Remove HTML entities
          // dataCol[i].description = result
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

  // putting the data in my LS when star is clicked
  function stored() {
    if (displayedContent === undefined) return
    setPlanetFavorite(displayedContent)
    navigate('/favoritePlanets')
  }

  return (
    <>
      <section className="flex justify-center sm:justify-start">
        <div className="hidden sm:flex sm:m-auto sm:justify-center">
          <input
            className=" rounded md:w-80 lg:w-96 sm:m-3 sm:p-1"
            type="text"
            placeholder="Feeling spacy..."
            value={inp}
            onChange={handleChange}
          />

          <div className="flex flex-col justify-center items-start">
            <button
              className="bg-blue-500 rounded p-2"
              onClick={handleInputChange}
            >
              <FaSearch
                className="search-icon hover:cursor-pointer"
                color="black"
              />
            </button>
          </div>
        </div>

        <iframe
          width="500"
          height="295"
          className="m-4"
          src="https://www.youtube.com/embed/_IkaetPoBZM?si=E2HSa_s5AqMQVjX2"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>

        <iframe
          width="500"
          height="295"
          className="rounded pause_first hidden sm:flex sm:m-4"
          src="https://www.youtube.com/embed/5vjl6tdwmFA?si=rlEamOmZYS3Vts_t"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </section>

      <div className="flex justify-center sm:hidden">
        <input
          className="form-control w-60 rounded inpMobile"
          type="text"
          value={inp}
          placeholder="Feeling spacy..."
          onChange={handleChange}
        />

        <button
          className="bg-blue-500 rounded ml-3 p-2"
          onClick={handleInputChange}
        >
          <FaSearch className="search-icon" color="black" />
        </button>
        <div className={isI ? 'ml-3 text-2xl' : ''}>{inpReq}</div>
      </div>

      <div className="m-auto flex justify-center">
        {hrefImg && (
          <img src={hrefImg} className="zoomable rounded-none" alt="" />
        )}

        <div className="hidden item-width sm:flex sm:flex-col sm:justify-start sm:m-auto sm:p-1 content-width">
          <span className="text-2xl font-bold flex">
            <h1>{dataApi[0]?.title}</h1>
          </span>
          {dataApi.length > 0 && !dataApi[0].hasOwnProperty('description') ? (
            <span>No description available</span>
          ) : (
            <span>{dataApi[0]?.description}</span>
            // <span>ferwtfgre</span>
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
        </div>
      </div>

      <div className="hidden sm:flex sm:flex-col sm:items-center sm:text-3xl hover:text-yellow-300">
        <button onClick={stored}>{hrefImg ? <FaStar /> : ''}</button>
      </div>
    </>
  )
}
