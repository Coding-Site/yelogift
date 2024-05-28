import { Link } from 'react-router-dom';
import { IProduct } from '../../../models/IProduct';

function Card({ data }: { data: IProduct }) {
    return (
        <Link
            to={`product/${data.id}`}
            className="flex flex-shrink-0 flex-col items-center gap-2 bg-gray-200 rounded-lg py-2 h-full w-32  sm:w-60 px-3"
        >
            <img
                className="w-[60%] mx-auto"
                src="/assets/cards/top.png"
                alt="top card"
            />
            <img
                className="w-[242px] h-[80px] sm:h-[135px]"
                src={`${import.meta.env.VITE_BASEURL}/public/storage/${
                    data.image
                }`}
                alt="image for card"
            />
            <span className="text-zinc-800 font-bold font-arial text-xs sm:text-sm ">
                {data.name}
            </span>
            <span className="text-zinc-500 font-extralight font-arial">
                {data?.category?.name}
            </span>
        </Link>
    );
}

export default Card;
