import { ChangeEvent, useEffect, useState } from 'react'
import '../css/searchImageApi.css'
import { FaSearch, FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Item } from './planetProvider'
import LightGallery from 'lightgallery/react'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgHash from 'lightgallery/plugins/hash'
import lgPager from 'lightgallery/plugins/pager'
import lgRotate from 'lightgallery/plugins/rotate'
import lgShare from 'lightgallery/plugins/share'
import { usePlanet } from '../lib/usePlanet'

export function SearchImageAPI() {
  // input state search for any nasa
  const [inp, setInp] = useState<any>('')

  // href API apod image state

  const [hrefImg, setHrefImg] = useState<any>()

  // data content API state

  const [dataApi, setDataApi] = useState<any>([])

  // input is blank or not state

  const [isI] = useState(true)

  // API convert to json state

  const [, setInputApi] = useState<Response>()

  // input blank state

  const [inpReq, setInpReq] = useState<string>('')

  // content state random from API
  const [displayedContent, setDisplayedContent] = useState<Item>()

  // Enter key pressed state

  // LS from usePlanet hook

  // const { setPlanetFavorite, imageContentStored } = usePlanet()

  const { setPlanetFavorite, planetItem, imageContentStored } = usePlanet()
  // video pausing

  // state for modal

  const navigate = useNavigate()

  // iframe pause useEffect
  useEffect(() => {
    function framesChange() {
      const iframe = document.querySelector<HTMLIFrameElement>('.pause_first')

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

  // iframe pause useEffect
  useEffect(() => {
    function framesChange() {
      const iframe = document.querySelector<HTMLIFrameElement>(
        '.pause_final_frame',
      )

      if (iframe !== null) {
        const temp = iframe.src
        iframe.src = temp
      }
    }

    function handleResize() {
      if (window.innerWidth < 1280) {
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

    // enter key is checked
  }

  // fetching my APOD search input API
  async function handleInputChange() {
    try {
      const getApodCurrImg = await fetch(
        `https://images-api.nasa.gov/search?q=${inp}`,
      )

      const jsonConverted = await getApodCurrImg.json()
      setInputApi(jsonConverted)

      const randomNumber = Math.floor(
        Math.random() * jsonConverted?.collection.items.length,
      )

      const apodImgCol =
        jsonConverted?.collection.items[randomNumber].links[0].href

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
          const unwantedHref = /href=http:\/\/www\.facebook\.com\/pages\/Greenbelt-MD\/NASA-Goddard\/39501/ // Match the unwanted href

          let result = dataCol[i]?.description.replace(regexTags, '') // Remove HTML tags
          result = result.replace(regexEntities, '') // Remove HTML entities
          result = result.replace(regexHref, '')
          result = result.replace(unwantedHref, '') // Remove unwanted href
          dataCol[i].description = result
        }
      }
      setDataApi(dataCol)
    } catch (err) {
      const input_mobile = document.querySelector<HTMLInputElement>(
        '.inpMobile',
      )

      if (input_mobile?.value === '') {
        alert('Input field is a required field')
        return
      }

      alert('Input value invalid or limited')
    }
  }

  // if the enter key is pressed call my API

  function handleKeyDown(e: { key: string }) {
    if (e.key === 'Enter') handleInputChange()
  }

  // putting the data in my LS when star is clicked
  function stored() {
    if (displayedContent === undefined) return
    setPlanetFavorite(displayedContent)
    navigate('/favoritePlanets')
  }

  return (
    <>
      <section className="flex justify-center m-auto md:justify-start container">
        <div className="hidden sm:flex lg:flex sm:m-auto md:p-4 sm:justify-center">
          {planetItem.length !== 0 ? (
            <input
              className="rounded pl-2 sm:w-60 sm:m md:w-80 lg:w-80 xl:w-96 lofiInput"
              type="text"
              placeholder="Feeling spacy..."
              value={inp}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <input
              className="rounded pl-2 sm:w-60 sm:m md:w-80 lg:w-80 xl:w-96 lofiInput"
              type="text"
              placeholder="Feeling spacy..."
              value={inp}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          )}

          {planetItem.length !== 0 ? (
            <div className="flex flex-col justify-center items-start">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors BL duration-300 p-2 ml-3"
                onClick={handleInputChange}
              >
                <FaSearch className="search-icon" color="black" />
              </button>
            </div>
          ) : (
            <div className="flex-col justify-center items-start">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors BL duration-300 p-2 ml-3"
                onClick={handleInputChange}
              >
                <FaSearch className="search-icon" color="black" />
              </button>
            </div>
          )}
        </div>

        <iframe
          width="500"
          height="295"
          className="m-4 lg:w-96 rounded-none sm:rounded fullScreen"
          src="https://www.youtube.com/embed/libKVRa01L8?si=F43dD9dWos-l_hpI"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <iframe
          width="500"
          height="295"
          className="rounded pause_first hidden sm:hidden sm:m-4 lg:flex lg:w-96 fullScreen"
          src="https://www.youtube.com/embed/5vjl6tdwmFA?si=rlEamOmZYS3Vts_t"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        {imageContentStored && (
          <iframe
            width="500"
            height="295"
            className="rounded hidden pause_final_frame lg:hidden sm:m-4 lg:w-96 fullScreen xl:flex"
            src="https://www.youtube.com/embed/Ia39ekE_pLU?si=uEPsCsFSSZMAmA6c"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </section>

      <div className="flex justify-center sm:hidden">
        {planetItem.length !== 0 ? (
          <input
            className="form-control pl-2 w-60 rounded inpMobile lofiInput"
            type="text"
            value={inp}
            placeholder="Feeling spacy..."
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <>
            <input
              className="form-control pl-2 w-60 rounded inpMobile lofiInput"
              type="text"
              value={inp}
              placeholder="Feeling spacy..."
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white BL font-bold py-2 px-4 rounded transition-colors duration-300 ml-3 p-2"
              onClick={handleInputChange}
            >
              <FaSearch className="search-icon" color="black" />
            </button>
          </>
        )}

        {planetItem.length !== 0 && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white BL font-bold py-2 px-4 rounded transition-colors duration-300 ml-3 p-2"
            onClick={handleInputChange}
          >
            <FaSearch className="search-icon" color="black" />
          </button>
        )}

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
                    dataApi[0]?.title || 'No Title'
                  }</a> <br> <div className='para'><p className=' text-4xl'><strong>Description:</strong> ${
                dataApi[0]?.description || 'No description'
              }</p> </div>
              <strong>Center:</strong> ${dataApi[0]?.center || 'No Center'}</p>
              <br>
                  <strong>Keywords:</strong> ${
                    dataApi[0]?.keywords?.join(', ') || 'No Keywords'
                  }</p><br>
                  <strong>Id:</strong> ${dataApi[0]?.nasa_id || 'No Id'}</p><br>
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
            {dataApi[0]?.date_created ? (
              <h1>Date Taken: {dataApi[0]?.date_created}</h1>
            ) : (
              <span>{dataApi[0]?.description}</span>
            )}{' '}
          </span>
          {dataApi?.title !== undefined ? (
            <span>No title available</span>
          ) : (
            <div className="text-2xl font-bold">
              <span>{dataApi?.title}</span>
            </div>
          )}
          <span className="text-2xl font-bold">
            {/* <h1>{dataApi[0]?.title}</h1> */}
          </span>
          {dataApi[0]?.description === undefined ? (
            <h1></h1>
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
            <span>{dataApi[0]?.description}</span>
          )}
        </div>
        {dataApi[0]?.description === undefined ? (
          <h1></h1>
        ) : (
          <span>{dataApi[0]?.description}</span>
        )}

        <div className="text-3xl hover:text-yellow-300">
          <button onClick={stored}>
            {hrefImg ? (
              <>
                <FaStar />
              </>
            ) : (
              ''
            )}
          </button>
        </div>
      </div>

      <div className="hidden sm:flex sm:flex-col sm:items-center sm:text-3xl hover:text-yellow-300">
        <button onClick={stored}>
          {hrefImg ? (
            <>
              <FaStar />
            </>
          ) : (
            ''
          )}
        </button>
      </div>
    </>
  )
}
