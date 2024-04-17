import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICard } from "../../../models/ICard";

function PopularCards() {
  const [popularProducts, setPopularProducts] = useState<ICard[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/home/products/popular`)
      .then((populars) => setPopularProducts(populars.data.data));
  }, []);

  return (
    <div className="flex flex-col w-full container py-5">
      <div className="w-full flex justify-between border-b border-mainWhite border-opacity-65 pb-5">
        <span className="text-mainWhite ">Popular Cards</span>
        <Link to="/" className="text-main flex gap-6">
          view more <img className="w-6" src="slider/prev.png" alt="" />
        </Link>
      </div>

      <div className="flex overflow-x-scroll scrollbar-none">
        {popularProducts.map((card:ICard, idx) => (
          <img
            className="w-[300px]"
            src={`${import.meta.env.VITE_BASEURL}/public/storage/${card.image}`}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
}

export default PopularCards;
