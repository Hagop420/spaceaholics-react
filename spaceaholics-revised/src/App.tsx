import './App.css'
import { ApodImageAPI } from './components/ApodImageAPI'
import { Navbar } from './components/Navbar'
import { SearchImageAPI } from './components/SeacrhImageAPI'

function App() {

  return (
    <>
      <Navbar />
      <ApodImageAPI/>
      <SearchImageAPI />
    </>
  )
}

export default App
