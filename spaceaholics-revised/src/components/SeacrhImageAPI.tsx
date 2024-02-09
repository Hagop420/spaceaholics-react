import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FaSearch } from 'react-icons/fa';




export function SearchImageAPI(){
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'lofi');







    function handleToggle(e) {
    if (e.target.checked) {
      setTheme('night');
    } else {
      setTheme('lofi'); //light
    }
  }
  const [inp , setInp] = useState<string>('')

  const [inputApi , setInputApi] = useState<Response>()


  // video pausing

 useEffect(() => {
    function framesChange() {
      const iframe = document.querySelector('.pause_first');

      if (iframe !== null) {
        const temp = iframe.src;
        iframe.src = temp;
      }
    }

    function handleResize() {
      if (window.innerWidth < 768) {
        framesChange();
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInp(e.target.value);
  };



  const apiKey = 'RJxySWoCj5Mz4VD5v3hzxeCp8KqbGdRUaCzeHrVy'




  // input search function


     async function handleInputChange(){
      try{
       const getApodCurrImg = await fetch(`https://images-api.nasa.gov/search?q=${inp}`)
       const jsonConverted = await getApodCurrImg.json()
        setInputApi(jsonConverted)
        console.log(inputApi)
      }catch(err){
        alert(err)
      }
    }




  return(

      <>

   <section className="flex justify-center sm:justify-around">
     <iframe
        width="500"
        height="295"
        className="m-3"
        src="https://www.youtube.com/embed/X40Re7j1WlI?si=VjSUrp1mgEysrg6W"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">

    </iframe>

    <iframe
            width="500"
            height="295"
            className="rounded pause_first hidden sm:flex sm:m-3"
            src="https://www.youtube.com/embed/AErpXJq67LM?si=AqYy35CCfH1ix_ys"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>


</section>




   {/* input function API component */}


<div className="flex justify-center">

      <input
      className="form-control rounded"
    type="text"
    value={inp}
            onChange={handleChange}
      />

    <button className="bg-amber-600 rounded p-2" onClick={handleInputChange}>
            <FaSearch className="search-icon" color="black" />
    </button>
</div>


      </>

  )
}
