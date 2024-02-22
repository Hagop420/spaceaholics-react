import { useState, useEffect } from 'react'
import placeholderImage from '../images/placeholder-image.jpg'
import No_Video from '../images/No_Video.png'
import '../css/apodAPI.css'
import { LightDarkMode } from './LightDarkComponent'

// browser theme

export function ApodImageAPI() {
  //state for apod image response
  const [apod, setAPOD] = useState<Response>()

  // API image days states

  // api key
  const apiKey = 'RJxySWoCj5Mz4VD5v3hzxeCp8KqbGdRUaCzeHrVy'

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

  return (
    <>
      <LightDarkMode />
      <div className="container m-auto block md:flex">
        {/* medias testing */}

        {apod?.url.includes('youtube') ? (
          <iframe
            title={apod?.url}
            width="560"
            height="315"
            src={apod.url}
            className="rounded-none md:h-screen md:object-fill m-auto w-96 sm:w-auto imageAPOD"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : apod?.url.includes('youtube') === undefined ? (
          <img
            src={No_Video}
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
