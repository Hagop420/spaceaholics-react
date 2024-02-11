import { ApodImageAPI } from './ApodImageAPI'
import { Navbar } from './Navbar'
import { SearchImageAPI } from './SeacrhImageAPI'

export function HomePageWrap() {
  return (
    <>
      <div data-view="entries">
        <Navbar />
        <ApodImageAPI />
        <SearchImageAPI />
      </div>
    </>
  )
}
