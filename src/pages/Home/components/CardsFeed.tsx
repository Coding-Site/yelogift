import { Link } from "react-router-dom";
import Card from "./Card";
import { IProduct } from "../../../models/IProduct";

function CardsFeed(data: { title: string; link: string; products: IProduct[] }) {
  return (
    <div className="flex flex-col w-full container py-5">
      <div className="w-full flex justify-between border-b border-mainWhite border-opacity-65 pb-5">
        <span className="text-mainWhite ">{data.title} </span>
        <Link to={data.link} className="text-main flex gap-6">
          {" "}
          view more{" "}
          <img className="w-6" src="/assets/slider/prev.png" alt="view more" />{" "}
        </Link>
      </div>

      <div className="hidden sm:flex justify-start overflow-x-auto scrollbar-none gap-12 mt-10">
        {data.products.slice(0, Math.ceil(data.products.length / 2)).map((card, idx) =>  <Card key={idx} data={card} /> )}
      </div>
      <div className="hidden sm:flex justify-start overflow-x-scroll scrollbar-none gap-12 mt-10">
        {data.products.slice( data.products.length / 2, data.products.length).map((product, idx) => <Card key={idx} data={product} /> )}
      </div>


      <div className="flex sm:hidden justify-start overflow-x-scroll scrollbar-none gap-12 mt-10">
        {data.products.map((product, idx) => <Card key={idx} data={product} /> )}
      </div>



    </div>
  );
}

export default CardsFeed;
