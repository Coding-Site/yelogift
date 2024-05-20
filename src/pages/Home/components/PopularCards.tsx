import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../../../models/IProduct";
import instance from "../../../axios";

function PopularCards() {
  const [popularProducts, setPopularProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    instance
      .get(`/api/home/products/popular`)
      .then((populars) => { 
        setPopularProducts(populars.data.data) 
      });
  }, []);

  return (
    <div className="flex flex-col w-full container py-5">
      <div className="w-full flex flex-col sm:flex-row justify-center items-center sm:justify-between border-0 sm:border-b border-mainWhite border-opacity-65 pb-5">
        <span className="text-mainWhite text-2xl ">Popular Cards</span>
        <hr className="flex sm:hidden border-0 rounded-full bg-main text-main w-[50px] h-1" />
        <Link to="/categories" className="text-main hidden  sm:flex gap-6">
          view more <img className="w-6" src="slider/prev.png" alt="" />
        </Link>
      </div>

      <div className="flex overflow-x-auto scrollbar-none gap-x-2 mt-5 mb-8 sm:mb-0">
        {popularProducts.map((card: IProduct, idx) => (
          <Link to={`/product/${card.id}`} key={idx} className="min-w-[130px] sm:min-w-[200px]">
            <img
              className="w-[300px]"
              src={`${import.meta.env.VITE_BASEURL}/storage/${card.image
                }`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularCards;
