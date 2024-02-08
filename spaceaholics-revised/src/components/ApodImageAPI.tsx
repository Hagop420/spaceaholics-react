import { useState , useEffect } from "react"
import '../css/apodAPI.css'

export function ApodImageAPI(){

  const [apod , setAPOD] = useState<Response>()
  const apiKey = 'RJxySWoCj5Mz4VD5v3hzxeCp8KqbGdRUaCzeHrVy'

  useEffect(() => {
    async function apodFetchFunction(){
      try{
         const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
        const data = await response.json();
        console.log(data)
        setAPOD(data);
      }catch(err){
        alert(err)
      }
    }
    apodFetchFunction()
  },[apiKey])
  return(
   <div className="container m-auto block sm:flex md:p-3">
      <img src={apod?.hdurl} alt="" />

    <hr className="m-4" />
      <div className="text-center block sm:text-left sm:flex sm:flex-col sm:justify-center">
        <div className="space-APOD-content">
          <h2 className="text-2xl">{apod?.title}</h2>
        <p className="p-2 first-letter:text-blue-500 first-letter:font-cursive first-letter:font-bold first-letter:text-3xl">{apod?.explanation}</p>
        </div>
        <p className="m-4">{`@ Copyright ${apod?.date}`}</p>
      </div>
   </div>
  )
}
