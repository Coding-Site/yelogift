import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full bg-mainBalck text-mainWhite px-5 flex justify-between py-5 gap-3">
      <div className="flex justify-between items-center grow">
        <img src="navbar/menu.png" className="cursor-pointer" alt="menu" />
        <img src="logo.png" className="cursor-pointer" alt="logo" />
        
          <Link to="/">Home</Link>
          <Link to="/cats">Categories</Link>
      </div>
      <div className="flex grow">
        <input
          type="text"
          placeholder="Search"
          className="rounded-2xl placeholder:text-mainWhite px-4 py-2 w-full border border-mainWhite bg-mainBalck"
        />
      </div>
      <div className="flex justify-between items-center grow">
        <img src="navbar/heart.png" className="cursor-pointer" alt="favorite" />
        <img src="navbar/cart.png" className="cursor-pointer" alt="cart" />
        <img src="navbar/alert.png" className="cursor-pointer" alt="alert" />
        <img src="navbar/light_mode.png" className="cursor-pointer" alt="Lightmode" />
      </div>
    </div>
  );
}

export default Navbar;
