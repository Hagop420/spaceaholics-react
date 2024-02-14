import { usePlanet } from '../lib/usePlanet'
import { Item } from './planetProvider'

type PlanetStoringImagesProp = {
  planet: Item
}

export function FavoritePlanets({ planet }: PlanetStoringImagesProp) {
  const { planetItem } = usePlanet()
  console.log(planetItem)

  return <>{/* <h1>{planetItem.map}</h1> */}</>
}
