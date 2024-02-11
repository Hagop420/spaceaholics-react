import { ChangeEvent, useEffect, useState } from 'react'
import '../css/searchImageApi.css'
import { FaSearch, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export function SearchImageAPI() {
  const [inp, setInp] = useState<any>('')

  const [hrefImg, setHrefImg] = useState<any>()

  const [dataApi, setDataApi] = useState<any>([])

  const [inputApi, setInputApi] = useState<Response>()

  const [planetStorage, setPlanetStorage] = useState([])

  // video pausing

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInp(e.target.value)
  }

  // localStorage

  let data = {
    view: 'entries',
    entries: [],
    editing: null,
    nextEntryId: 1,
  }

  useEffect(() => {
    const jsonPlanets = JSON.stringify(data)

    let savedToStorage: any = localStorage.setItem(
      'Planet_information',
      jsonPlanets,
    )
  })

  const planetStorageLocalStorageItems = {
    planetImageURL: hrefImg,
  }
  data.nextEntryId++

  // LS end

  // input search function

  async function handleInputChange() {
    try {
      const getApodCurrImg = await fetch(
        `https://images-api.nasa.gov/search?q=${inp}`,
      )
      const jsonConverted = await getApodCurrImg.json()
      setInputApi(jsonConverted)
      console.log(jsonConverted?.collection)
      // const rend = Math.random() * getApodCurrImg.collection
      // console.log(rend)
      console.log(jsonConverted.collection)
      const randomNumber = Math.floor(
        Math.random() * jsonConverted?.collection.items.length,
      )

      const apodImgCol =
        jsonConverted?.collection.items[randomNumber].links[0].href

      setHrefImg(apodImgCol)

      const dataCol = jsonConverted?.collection.items[randomNumber].data

      setDataApi(dataCol)
      console.log('dataApi', dataCol[0].description)

      return <img src={hrefImg} alt="" />
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <section className="flex justify-center sm:justify-start">
        <div className="hidden sm:flex sm:m-auto sm:justify-center">
          <input
            className=" rounded sm:w-96 sm:m-3 sm:p-1"
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
          src="https://www.youtube.com/embed/X40Re7j1WlI?si=VjSUrp1mgEysrg6W"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>

        <iframe
          width="500"
          height="295"
          className="rounded pause_first hidden sm:flex sm:m-4"
          src="https://www.youtube.com/embed/AErpXJq67LM?si=AqYy35CCfH1ix_ys"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </section>

      <div className="flex justify-center sm:hidden">
        <input
          className="form-control w-60 rounded"
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
      </div>

      <div className="m-auto flex justify-center">
        {hrefImg && <img src={hrefImg} className="zoomable" alt="" />}

        <div className="hidden flex-col item-width sm:block sm:m-auto content-width">
          <h1 className="text-3xl">{dataApi[0]?.keywords[0]}</h1>
          <p>{dataApi[0]?.description}</p>
        </div>
      </div>

      <div className="flex flex-col items-center text-center sm:hidden">
        <h1 className="text-2xl">{dataApi[0]?.keywords[0]}</h1>

        <p>{dataApi[0]?.description_508}</p>

        <div className="text-3xl hover:text-yellow-300">
          <Link
            to="/favoritePlanets"
            onClick={() => setPlanetStorage(planetStorageLocalStorageItems)}
          >
            {hrefImg ? <FaStar /> : ''}
          </Link>
        </div>
      </div>

      <div className="hidden sm:flex sm:flex-col sm:items-center sm:text-3xl hover:text-yellow-300">
        <Link
          to="/favoritePlanets"
          onClick={() => setPlanetStorage(planetStorageLocalStorageItems)}
        >
          {hrefImg ? <FaStar /> : ''}
        </Link>
      </div>
    </>
  )
}
