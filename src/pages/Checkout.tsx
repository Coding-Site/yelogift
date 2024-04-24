
function Checkout() {
  

  const carts = [
    {
      img: "/cards/card1.png",
      description: "avsfvsgd",
      price: 125,
      quantity: 1,
    },
    {
      img: "/cards/card1.png",
      description: "avsfvsgadfvasdvafvdd",
      price: 125,
      quantity: 1,
    },
  ];
  const mathods = [
    {
      title: "sdsadv",
      img: "/cards/card1.png",
    },
    {
      title: "sdsadv",
      img: "/cards/card1.png",
    },
    {
      title: "sdsadv",
      img: "/cards/card1.png",
    },
  ];

  

  return (
    <div className="flex py-10 w-full container text-mainLightBlack">
      <div className="flex justify-between w-full gap-3">
        <div className="flex justify-start flex-col px-10 py-10 bg-white grow">
          <span className="text-2xl mb-5">Order Summary</span>
          <div className="flex flex-col gap-3">
            {carts.map((cart, idx) => (
              <div className="flex  justify-start gap-3 w-full " key={idx}>
                <img className="w-20 h-12" src={cart.img} alt="cart" />
                <div className="flex flex-col gap-0">
                  <span className="text-xl text-black ">
                    {cart.description.length > 10
                      ? cart.description.slice(0, 10) + "..."
                      : cart.description}
                  </span>
                  <span className="text-sm text-gray-500">
                    AED {cart.price}
                  </span>
                </div>
                <div className="flex basis-24 h-8 min-w-[100px] px-3 items-center ms-auto w-auto  justify-between rounded-full border border-gray-300">
                  <span>-</span>
                  <span>{cart.quantity}</span>
                  <span>+</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-start flex-col px-10 py-10 bg-white grow">
          <span className="text-2xl mb-5">Select Payment method </span>
          <div className="flex flex-col ">
            <label htmlFor="binance" className="flex gap-2">
              <input type="radio" name="method" id="binance" />
              Binance Pay
            </label>
            <label htmlFor="pay" className="flex gap-2">
              <input type="radio" name="method" id="pay" />
              Cryptocurrency
            </label>
          </div>
          <div className="flex gap-3">
            {mathods.map((cart, idx) => (
              <div
                className="flex rounded-full !w-10 !h-10 flex-col justify-start gap-3  "
                key={idx}
              >
                <img className="w-20 h-12" src={cart.img} alt="cart" />

                <span className="text-xs bg-gray-300 text-mainLightBlack rounded-full px-2 p-1 ">
                  {cart.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
