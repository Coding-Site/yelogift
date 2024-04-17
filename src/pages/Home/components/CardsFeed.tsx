import { Link } from "react-router-dom";
import { ICard } from "../../../models/ICard";
import Card from "./Card";

function CardsFeed(data: { title: string; link: string; cards: ICard[] }) {
  return (
    <div className="flex flex-col w-full container py-5">
      <div className="w-full flex justify-between border-b border-mainWhite border-opacity-65 pb-5">
        <span className="text-mainWhite ">{data.title} </span>
        <Link to={data.link} className="text-main flex gap-6">
          {" "}
          view more{" "}
          <img className="w-6" src="slider/prev.png" alt="view more" />{" "}
        </Link>
      </div>

      <div className="flex  justify-start overflow-x-auto scrollbar-none gap-12 mt-10">
        {data.cards.slice(0, data.cards.length / 2).map((card, idx) =>  <Card key={idx} data={card} /> )}
      </div>
      {/* <div className="flex justify-start overflow-x-scroll scrollbar-none gap-12 mt-10">
        {data.cards.slice( data.cards.length / 2, data.cards.length).map((card, idx) => <Card key={idx} image={card.image} category={card.category} title={card.title} /> )}
      </div> */}
    </div>
  );
}

export default CardsFeed;
