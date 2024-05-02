/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from "react-redux";
import { RootState } from "../store";


function OrderDetalisCard() {
  const carts = useSelector((state: RootState )=> state.cartSlice.items)
    // const carts = [
    //     {
    //       img: "/cards/card1.png",
    //       description: "avsfvsgd",
    //       price: 125,
    //       quantity: 1,
    //     },
    //     {
    //       img: "/cards/card1.png",
    //       description: "avsfvsgadfvasdvafvdd",
    //       price: 125,
    //       quantity: 1,
    //     },
    //   ];
  return (
    <>
      <span className="text-2xl font-semibold mb-5">Order Details</span>
      <div className="flex flex-col gap-3">
        <div className="felx flex-col gap-1">
          <span>Email Address</span>
          <p className="font-semibold">sara2072020@gmail.com </p>
        </div>
        <div className="felx flex-col gap-1">
          <span>Payment method</span>
          <p className="font-semibold">Binance Pay </p>
        </div>
        <div className="felx flex-col gap-1">
          <span>Invioce id</span>
          <p className="font-semibold">b3a5002e-868f-4f52-9a54-f62df025b50e </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-5 ">
        {carts.map((car, idx) => (
          <div
            key={idx}
            className="flex border-t border-gray-300 justify-start items-start gap-x-3 gap-y-3 py-4"
          >
            <img
               src={`${import.meta.env.VITE_BASEURL}/public/storage/${
                car.product?.image
              }`}
              className="aspect-video w-20"
              alt=" cart product"
            />
            <div className="flex flex-col gap-0">
              {/* <span className="font-semibold">{car.description}</span> */}
              <span className="text-gray-400 uppercase">{car.product?.price} SAR</span>
              <span>
                Code: <span className="font-bold"> {car.productPartId}</span>
              </span>
            </div>
          </div>
        ))}
        <hr className="bg-gray-400" />
        <div className="flex w-full justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-bold">3255</span>
        </div>
      </div>
    </>
  );
}

export default OrderDetalisCard;
