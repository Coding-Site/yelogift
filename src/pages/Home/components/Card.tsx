import { Link } from "react-router-dom"
import { ICard } from "../../../models/ICard"

function Card( {data} ) {
  return (
    <Link to="/" className='flex flex-shrink-0 flex-col items-center gap-2 bg-gray-200 rounded-lg py-2 h-full w-60 px-3'>
        <img className="w-[60%] mx-auto"  src="cards/top.png" alt="top card" />
        <pre>
          from card com
          {JSON.stringify(data, null, 2)}
        </pre>
        {/* <img className="w-[242px] h-[135px]" src={data.image} alt="image for card" /> */}
        {/* <span className="text-zinc-800 font-bold font-arial ">{data.title}</span>
        <span className="text-zinc-500 font-extralight font-arial">{data.title}</span> */}
    </Link>
  )
}

export default Card