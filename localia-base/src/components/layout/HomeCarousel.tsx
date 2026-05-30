import { useState} from 'react'
import { slidesData } from '../../mockData/data'



export function Carousel() {
  const [current, setCurrent] = useState(0)

 

  const prev = () => setCurrent(i => (i - 1 + slidesData.length) % slidesData.length)
  const next = () => setCurrent(i => (i + 1) % slidesData.length)

  return (
    <div className="relative w-full h-full overflow-hidden  rounded-xl ">
      {/* Image */}
      <img
        src={slidesData[current].image}
        className="w-full h-130 object-cover "
      />

      {/* Buttons*/}
      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 text-white px-3 py-1  text-4xl">
        ‹
      </button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 text-white px-3 py-1  text-4xl">
        ›
      </button>

      
       
      
    </div>
  )
}


export default Carousel;