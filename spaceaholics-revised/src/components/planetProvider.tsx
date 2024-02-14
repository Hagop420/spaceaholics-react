import { Context, createContext } from 'react'

type PlanetItem = {
  collection: {
    version: string
    href: string
    items: {
      href: string
      data: {
        center?: string
        title?: string
        nasa_id?: string
        date_created?: string
        keywords?: string[]
        media_type?: string
        description_508?: string
        secondary_creator?: string
        description?: string
      }[]
    }[]
  }
}

export type Item = {
  href?: string
  data: {
    center?: string
    title?: string
    nasa_id?: string
    date_created?: string
    keywords?: string[]
    media_type?: string
    description_508?: string
    secondary_creator?: string
    description?: string
  }[]
  links: {
    href?: string
  }[]
}
// export type Item = {
//   href: string
//   data: [
//     {
//       center?: string
//       title?: string
//       nasa_id?: string
//       date_created?: string
//       keywords?: string[]
//       media_type?: string
//       description_508?: string
//       secondary_creator?: string
//       description?: string
//     },
//   ]
//   links: [
//     {
//       href?: string
//     },
//   ]
// }

type planetContextVal = {
  planetItem: Item[]
  setPlanetFavorite: (planetItem: Item) => void
}

export const planetContext = createContext<planetContextVal>({
  planetItem: [],
  setPlanetFavorite: () => undefined,
})

export const PlanetProvider = planetContext.Provider
