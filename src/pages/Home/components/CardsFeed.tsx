import { Link } from "react-router-dom";
// import Card from "./Card";
import { IProduct } from "../../../models/IProduct";

function CardsFeed(data: { title: string; link: string; products: IProduct[] }) {
  return (
    <div className="flex flex-col w-full container py-5">
      <div className="w-full flex justify-between sm:border-b border-0  border-mainWhite border-opacity-65 pb-5">
        <span className="text-mainWhite font-medium">{data.title} </span>
        <Link to={data.link} className="text-main flex sm:gap-6 gap-3">
          {" "}
          view more{" "}
          <img className="w-6" src="/assets/slider/prev.png" alt="view more" />{" "}
        </Link>
      </div>



      <div className="hidden sm:flex overflow-x-auto scrollbar-none gap-x-2 mt-5 mb-8 sm:mb-0">
        {data.products.slice(0, 6).map((product: IProduct, idx) => (
          <Link to={`/product/${product.id}`} key={idx} className="min-w-[130px] sm:min-w-[200px]">
            <img className="w-[300px]" src={`${import.meta.env.VITE_BASEURL}/storage/${product.image}`} />
          </Link>
        ))}
      </div>


      <div className="hidden sm:flex overflow-x-auto scrollbar-none gap-x-2 mt-5 mb-8 sm:mb-0">
        {data.products.slice(7, data.products.length).map((product: IProduct, idx) => (
          <Link to={`/product/${product.id}`} key={idx} className="min-w-[130px] sm:min-w-[200px]">
            <img className="w-[300px] " src={`${import.meta.env.VITE_BASEURL}/storage/${product.image }`} />
          </Link>
        ))}
      </div>


      <div className="flex sm:hidden justify-start overflow-x-scroll scrollbar-none sm:gap-12 gap-x-4 mt-3 sm:mt-10">
        {data.products.map((product: IProduct, idx) => (
          <Link to={`/product/${product.id}`} key={idx} className="min-w-[130px] sm:min-w-[200px]">
            <img className="w-[300px]" src={`${import.meta.env.VITE_BASEURL}/storage/${product.image }`} />
          </Link>
        ))}
      </div>





      {/* 
      <div className="hidden sm:flex justify-start overflow-x-auto scrollbar-none gap-12 mt-10">
        {data.products.slice(0, 6).map((card, idx) =>  <Card key={idx} data={card} /> )}
      </div>
      <div className="hidden sm:flex justify-start overflow-x-scroll scrollbar-none gap-12 mt-10">
        {data.products.slice( 7, data.products.length).map((product, idx) => <Card key={idx} data={product} /> )}
      </div> */}

      {/* 
      <div className="flex sm:hidden justify-start overflow-x-scroll scrollbar-none sm:gap-12 gap-x-4 mt-3 sm:mt-10">
        {data.products.map((product, idx) => <Card key={idx} data={product} /> )}
      </div> */}



    </div>
  );
}

export default CardsFeed;
