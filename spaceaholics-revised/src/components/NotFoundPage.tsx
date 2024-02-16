import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import solarPlanets from '../images/planets.gif'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/translucent.css'
import '../css/NotFoundPage.css'

export function NotFoundPage() {
  const homeIconRef = useRef(null)

  useEffect(() => {
    if (homeIconRef.current) {
      tippy(homeIconRef.current, {
        content: 'Home', // Tooltip content
        placement: 'bottom',
      })
    }
  }, [])

  return (
    <div className="" id="error">
      <div className="">
        <div className="flex flex-col items-center justify-center h-screen">
          <img
            className="h-96 rounded-none object-contain"
            src={solarPlanets}
            alt="Something Lost"
          />
          <div className="font-bold">
            <div className="text-center">
              <h1 className="text-yellow-custom">
                Oops, looks like the page is lost.
              </h1>
              <p className="text-yellow-custom" style={{ fontSize: '17px' }}>
                This is not a fault, just an accident that was not intentional.
              </p>
            </div>
          </div>

          <p className="text-muted">
            {' '}
            <Link
              to="/"
              className="flex justify-center text-4xl m-4"
              ref={homeIconRef}
            >
              <FaHome />
            </Link>{' '}
          </p>
        </div>
      </div>
    </div>
  )
}
