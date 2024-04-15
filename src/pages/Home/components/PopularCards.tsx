import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PopularCards() {
  const [cards, setCards] = useState([
    { image: "cards/card1.png", link: "/" },
    { image: "cards/card1.png", link: "/" },
  ]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/home/products/popular`)
      .then((data) => setCards(data.data.data));
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
        {cards.map((card, idx) => (
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
