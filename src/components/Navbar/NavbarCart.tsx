import {  useNavigate } from "react-router-dom";

function NavbarCart() {
  const navigate = useNavigate();
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
  return (
    <div className="bg-white flex flex-col gap-2 rounded-md p-3 ">
      <div className="flex flex-col gap-3">
        {carts.map((cart, idx) => (
          <div className="flex justify-start gap-3 w-full " key={idx}>
            <img className="w-20 h-12" src={cart.img} alt="cart" />
            <div className="flex flex-col gap-0">
              <span className="text-xl text-black ">{cart.description.length > 10 ? cart.description.slice(0, 10) + '...' : cart.description}</span>
              <span className="text-sm text-gray-500">AED {cart.price}</span>
            </div>
            <div className="flex basis-24 h-8 min-w-[100px] px-3 items-center ms-auto w-auto  justify-between rounded-full border border-gray-300">
                <span>-</span>
                <span>{cart.quantity}</span>
                <span>+</span>
            </div>
          </div>
        ))}

        <div className="flex justify-between ">
            <button className="!rounded-full shadow-md px-5">keep shopping</button>
            <button onClick={() => { navigate('/checkout'); }}  className="btn !rounded-full  shadow-md">checkout</button>
        </div>
      </div>
    </div>
  );
}

export default NavbarCart;
