import { ChangeEvent, useEffect, useState } from "react";
import Lightbox_library from "./Lightbox_library";
import '../css/searchImageApi.css'
import '../css/lightbox-min.css'
import { FaSearch, FaStar } from 'react-icons/fa';




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



        const apodImgCol = jsonConverted?.collection.items[randomNumber].links[0].href


        // lightbox

// // Create the <a> tag with the fetched image
// const aTag = document.createElement('a');
// aTag.href = apodImgCol;
// aTag.setAttribute('data-lightbox', 'cases');

// // Create the <img> tag and append it to the <a> tag
// const imgTag = document.createElement('img');
// imgTag.src = apodImgCol;
// imgTag.alt = 'Fetched Image';
// aTag.appendChild(imgTag);

// // Append the <a> tag to the DOM
// document.body.appendChild(aTag);



        // lightbox end

        setHrefImg(apodImgCol)

          const dataCol = jsonConverted?.collection.items[randomNumber].data

          setDataApi(dataCol)
          console.log('dataApi' , dataCol[0].description)

   }catch(err){
        console.log(err)
      }
    }

    // Lightbox_library.start($('a[data-lightbox="cases"]'))



    // star icon func



  return(

      <>

   <section className="flex justify-center sm:justify-start">


<div className="hidden sm:flex sm:m-auto sm:justify-center">
   <input
      className=" rounded sm:w-96 sm:m-3 sm:p-1"
    type="text"
    placeholder="Feeling spacy..."
    value={inp}
            onChange={handleChange}
      />

    <div className="flex flex-col justify-center items-start">
      <button className="bg-blue-500 rounded p-2" onClick={handleInputChange}>
            <FaSearch className="search-icon hover:cursor-pointer" color="black" />
    </button>
    </div>
</div>




     <iframe
        width="500"
        height="295"
        className="m-4"
        src="https://www.youtube.com/embed/X40Re7j1WlI?si=VjSUrp1mgEysrg6W"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">

    </iframe>

    <iframe
            width="500"
            height="295"
            className="rounded pause_first hidden sm:flex sm:m-4"
            src="https://www.youtube.com/embed/AErpXJq67LM?si=AqYy35CCfH1ix_ys"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>



</section>


<div className="flex justify-center sm:hidden">
  <input
      className="form-control w-60 rounded"
    type="text"
    value={inp}
    placeholder="Feeling spacy..."
    onChange={handleChange}
      />

    <button className="bg-blue-500 rounded ml-3 p-2" onClick={handleInputChange}>
            <FaSearch className="search-icon" color="black" />
    </button>
</div>



<div className="m-auto flex justify-center">
    <a href={hrefImg} data-lightbox="cases" >
      <img src={hrefImg} className="object-cover" alt="" />
    </a>




 <div className="hidden flex-col item-width sm:block sm:m-auto content-width">
<h1 className="text-3xl">{dataApi[0]?.keywords[0]}</h1>
  <p>{dataApi[0]?.description}</p>
    </div>
</div>

    <div className="flex flex-col items-center text-center sm:hidden">
<h1 className="text-2xl">{dataApi[0]?.keywords[0]}</h1>

  <p>{dataApi[0]?.description}</p>

    <div className="text-2xl">
      {inp ? <FaStar /> : ''}
    </div>
    </div>


          <div className="hidden sm:flex sm:flex-col sm:items-center sm:text-2xl">
            {inp ? <FaStar /> : ''}
          </div>


      </>

  )
}
