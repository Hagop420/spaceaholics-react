import { createContext } from 'react'

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
  url: string
}

type planetContextVal = {
  planetItem: Item[]
  setPlanetFavorite: (planetItem: Item) => void
  setStoredFavorite: () => void
  setImageContentStored: (planetItem: Item) => void
  // setPlanetContent: () => void
  imageContentStored: Item
}

export const planetContext = createContext<planetContextVal>({
  planetItem: [],
  setPlanetFavorite: () => undefined,
  setStoredFavorite: () => undefined,
  setImageContentStored: () => undefined,
  // setPlanetContent: () => undefined,
  imageContentStored: {
    data: [],
    url: '',
    links: [],
  },
})

export const PlanetProvider = planetContext.Provider
