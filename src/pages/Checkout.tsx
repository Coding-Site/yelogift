import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { decreaseOneItem, increaseOneItem } from "../store/CartSlice/CartSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

function Checkout() {
  const carts = useSelector((state: RootState) => state.cartSlice.items);
  const dispatch = useDispatch();
  const [payMethod, setPayMethod] = useState<"binance" | "crypto">("crypto");
  const mathods = [
    {
      title: "sdsa",
      img: "/assets/methods/btc.png",
    },
    {
      title: "sds",
      img: "/assets/methods/btc.png",
    },
    {
      title: "sdv",
      img: "/assets/methods/btc.png",
    },
    {
      title: "sdsa",
      img: "/assets/methods/btc.png",
    },
    {
      title: "sds",
      img: "/assets/methods/btc.png",
    },
    {
      title: "sdv",
      img: "/assets/methods/btc.png",
    },
  ];

  const SendToDB = () => {
    console.log(payMethod);
  };

  return (
    <div className="flex flex-col py-10 w-full container text-mainLightBlack">
      <div className="flex justify-between flex-col sm:flex-row w-full gap-3">
        <div className="flex justify-start flex-col gap-y-10  px-10 py-10 bg-white grow">
          <span className="text-2xl font-semibold  ">Order Summary</span>
          <div className="flex flex-col gap-3">
            {carts.length ? carts.map((cart, idx) => (
              <div className="flex  justify-start gap-3 w-full " key={idx}>
                <img
                  className="w-20 h-12"
                  src={`${import.meta.env.VITE_BASEURL}/public/storage/${
                    cart.product?.image
                  }`}
                  alt="cart"
                />
                <div className="flex flex-col gap-0">
                  {/* <span className="text-xl text-black ">
                    {cart.description.length > 10
                      ? cart.description.slice(0, 10) + "..."
                      : cart.description}
                  </span> */}
                  <span className="text-sm text-gray-500">
                    AED {cart.product?.price}
                  </span>
                </div>
                <div className="flex basis-24 h-8 min-w-[100px] px-3 items-center ms-auto w-auto  justify-between rounded-full border border-gray-300">
                  <span
                    className=" cursor-pointer"
                    onClick={() =>
                      dispatch(decreaseOneItem(cart.product?.id as number))
                    }
                  >
                    -
                  </span>
                  <span>{cart.quantity}</span>
                  <span
                    className=" cursor-pointer"
                    onClick={() =>
                      dispatch(increaseOneItem(cart.product?.id as number))
                    }
                  >
                    +
                  </span>
                </div>
              </div>
            )) : (<span>No Items in the Cart</span>)}
          </div>
        </div>
        <div className="flex justify-start flex-col gap-y-10 px-10 py-10 bg-white grow">
          <span className="text-2xl font-semibold  ">
            Select Payment method{" "}
          </span>
          <div className="flex flex-col font-medium text-xl ">
            <label htmlFor="binance" className="flex gap-2">
              <input
                type="radio"
                onClick={() => setPayMethod("binance")}
                className="flex"
                name="method"
                
                id="binance"
              />
              Binance Pay
            </label>
            <label htmlFor="pay" className="flex gap-2">
              <input
                type="radio"
                onClick={() => setPayMethod("crypto")}
                className="flex"
                defaultChecked
                name="method"
                id="pay"
              />
              Cryptocurrency
            </label>
          </div>
          {payMethod == "crypto" && (
            <div className="flex justify-evenly flex-wrap gap-x-2 gap-y-8">
              {mathods.map((cart, idx) => (
                <div
                  className="flex rounded-full !w-1/6 !h-10 flex-col justify-start items-center gap-y-1  "
                  key={idx}
                >
                  <img
                    className="size-10 rounded-full"
                    src={cart.img}
                    alt="cart"
                  />

                  <span className="text-xs bg-gray-300 text-mainLightBlack rounded-full px-1 ">
                    {cart.title.slice(0, 5)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-5  items-center py-14">
        <button className="btn !rounded-md !w-56" onClick={SendToDB}>
          {" "}
          Submit
        </button>
        <Link to="/" className="text-white">
          {" "}
          Cancel
        </Link>
      </div>
    </div>
  );
}

export default Checkout;
