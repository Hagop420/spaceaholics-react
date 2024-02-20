import { useState, useEffect } from 'react'
import placeholderImage from '../images/placeholder-image.jpg'
import '../css/apodAPI.css'

// browser theme

export function ApodImageAPI() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'lofi')

  //state for apod image response
  const [apod, setAPOD] = useState<Response>()

  // API image days states

  const [mediaType, setMediaType] = useState(null)

  // api key
  const apiKey = 'RJxySWoCj5Mz4VD5v3hzxeCp8KqbGdRUaCzeHrVy'

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

  // Fetching the APOD image API

  useEffect(() => {
    async function apodFetchFunction() {
      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
        )
        console.log(response)
        const data = await response.json()
        setAPOD(data)
        console.log(data)
        console.log(apod?.hdurl)
      } catch (err) {
        console.log(err)
      }
    }

    apodFetchFunction()
  }, [])

  // useEffect(() => {
  //   if (apod) {
  //     setIsImage(apod?.media_type === 'image')
  //     setIsVideo(apod?.media_type === 'video')
  //   }
  // }, [apod])

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

      <div className="container m-auto block md:flex">
        {/* medias testing */}

        {apod?.url.includes('youtube') ? (
          <iframe
            title={apod?.url}
            width="560"
            height="315"
            src={apod.url}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : apod?.url.includes('youtube') === undefined ? (
          <img
            src="https://cdn.dribbble.com/users/17914/screenshots/4902225/media/0d6d47739dae97adc81ca7076ee56cc9.png?resize=400x300&vertical=center"
            className="rounded-none md:h-screen md:object-fill m-auto w-96 sm:w-auto imageAPOD"
            alt="APOD video."
          />
        ) : apod?.hdurl === undefined ? (
          <img
            src={placeholderImage}
            className="rounded-none md:h-screen md:object-contain m-auto w-96"
            alt="Placeholder Image."
          />
        ) : (
          <img
            src={apod?.hdurl}
            className="rounded-none md:h-screen md:object-fill m-auto w-96 sm:w-auto imageAPOD"
            alt="APOD Img."
          />
        )}

        {/* media testing end */}

        <hr className="m-4" />
        <div className="text-center block sm:text-left sm:flex sm:flex-col sm:justify-center">
          <div className="space-APOD-content">
            <h2 className="text-2xl">
              {apod?.title || `Our solar system ☀️🪐🌍🌕 `}
            </h2>
            <p className="p-2 first-letter:text-blue-500 first-letter:font-cursive first-letter:font-bold first-letter:text-3xl">
              {apod?.explanation ||
                "In our solar system, there's a fascinating celestial object known as Saturn's moon Enceladus. Despite its small size, this icy moon has garnered significant attention due to its remarkable geysers erupting from its south pole. These geysers spew water vapor and icy particles into space, creating a striking plume that extends hundreds of kilometers above the moon's surface. This phenomenon indicates the presence of a subsurface ocean beneath Enceladus's icy crust, making it one of the most promising locations for potential extraterrestrial life within our solar system. The discovery of these geysers came from observations made by the Cassini spacecraft, which provided invaluable insights into the dynamic and potentially habitable environments of moons orbiting Saturn"}
            </p>
          </div>
          <p className="m-4">{` @ Copyright ${apod?.date || 'SS.'}`}</p>
        </div>
      </div>
    </>
  )
}
