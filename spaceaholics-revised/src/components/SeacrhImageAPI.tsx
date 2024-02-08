import { useCallback, useEffect, useState } from "react";




export function SearchImageAPI(){
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'lofi');


    const [inputValue, setInputValue] = useState<string>('');





    function handleToggle(e) {
    if (e.target.checked) {
      setTheme('night');
    } else {
      setTheme('lofi'); //light
    }
  }

  const [apod , setAPOD] = useState<Response>()


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







  // input search function

   const handleInputChange = useCallback((e) => {
        setInputValue(e.target.value);
    }, []);

  useEffect(() => {
    async function handleInputChange(){
      try{
       const getApodCurrImg = await fetch(`https://images-api.nasa.gov/search?q=${inputValue}`)
      }
    }
  })



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



    <input
    type="text"
    value={inputValue}
    onChange={handleInputChange}  />


      </>

  )
}
