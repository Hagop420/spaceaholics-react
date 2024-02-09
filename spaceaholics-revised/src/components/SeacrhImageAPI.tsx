import { ChangeEvent, useEffect, useState } from "react";
import { FaSearch } from 'react-icons/fa';




export function SearchImageAPI(){
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'lofi');


const [star , setStar] = useState(false)




    function handleToggle(e) {
    if (e.target.checked) {
      setTheme('night');
    } else {
      setTheme('lofi'); //light
    }
  }
  const [inp , setInp] = useState<string>('')

  const [hrefImg , setHrefImg] = useState()


  const [dataApi , setDataApi] = useState<any>([])

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







  // input search function


     async function handleInputChange(){
      try{
       const getApodCurrImg = await fetch(`https://images-api.nasa.gov/search?q=${inp}`)
       const jsonConverted = await getApodCurrImg.json()
        setInputApi(jsonConverted)
        console.log(jsonConverted?.collection)
        // const rend = Math.random() * getApodCurrImg.collection
        // console.log(rend)
console.log(jsonConverted.collection)
        const randomNumber =Math.floor( Math.random() * jsonConverted?.collection.items.length)


        const numKeyword = Math.floor(Math.random() * 100 + 1);

        const apodImgCol = jsonConverted?.collection.items[randomNumber].links[0].href
        setHrefImg(apodImgCol)

          const dataCol = jsonConverted?.collection.items[randomNumber].data

          setDataApi(dataCol)
          console.log('dataApi' , dataCol[0].description)

   }catch(err){
        alert(err)
      }
    }



    // star icon func



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

    <img src={hrefImg} alt="" />

<h2>{dataApi[0]?.title}</h2>

<h2>{dataApi[0]?.keywords[0]}</h2>


{/* write a condition tern if the search was clicked  have a state if true star pops up  */}



      </>

  )
}
