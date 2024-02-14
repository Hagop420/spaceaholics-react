import { usePlanet } from '../lib/usePlanet'
import { Item, PlanetProvider } from './planetProvider'

type PlanetStoringImagesAndContentsProp = {
  planet: Item[]
}

export function FavoritePlanets({
  planet,
}: PlanetStoringImagesAndContentsProp) {
  const { setPlanetFavorite } = usePlanet()
  console.log()

  return <>{console.log(planet)}</>
}
