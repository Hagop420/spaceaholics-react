import { ApodImageAPI } from "./ApodImageAPI";
import { Navbar } from "./Navbar";
import { SearchImageAPI } from "./SeacrhImageAPI";


export function HomePageWrap(){
  return(
    <>
      <Navbar />
    <ApodImageAPI />
    <SearchImageAPI />
    </>
  )
}
