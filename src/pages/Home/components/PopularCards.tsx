import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../../../models/IProduct";

function PopularCards() {
  const [popularProducts, setPopularProducts] = useState<IProduct[]>([]);

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

      <div className="flex  overflow-x-auto scrollbar-none gap-x-2 mt-5">
        {popularProducts.map((card: IProduct, idx) => (
          <Link to={`/product/${card.id}`}  key={idx} className="min-w-[200px]">
            <img
              className="w-[300px]"
              src={`${import.meta.env.VITE_BASEURL}/public/storage/${
                card.image
              }`}
             
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularCards;
