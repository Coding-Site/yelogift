import { Link, NavLink } from "react-router-dom";
import Switcher from "../../utils/Switcher.tsx";
import { useState } from "react";
import NavbarCart from "./NavbarCart.tsx";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileMenu from "./MobileMenu.tsx";

function Navbar() {
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  return (
    <>
      <div className="w-full bg-mainBalck text-mainWhite  px-5 flex justify-between  items-center py-5 gap-3">
        <MobileMenu open={openMenu} />
        <div className="flex justify-between items-center gap-4">
          <GiHamburgerMenu className="text-main text-2xl cursor-pointer flex sm:hidden" onClick={() => setOpenMenu(!openMenu)} />
          <Link className="" to="/">
            <img
              src="/logo.png"
              className="cursor-pointer w-[100px]"
              alt="logo"
            />
          </Link>
        </div>
        <div className="hidden sm:flex justify-start gap-9 items-center grow">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-main  font-semibold" : "text-mainWhite"
            }
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-main font-semibold" : "text-mainWhite"
            }
            to="/category"
          >
            Categories
          </NavLink>
        </div>

        <div className="hidden sm:flex grow relative">
          <input
            type="text"
            placeholder="Search"
            className="hidden sm:flex rounded-full placeholder:text-mainWhite placeholder:text-xs px-4 py-2 w-full border border-mainWhite bg-mainLightBlack"
          />
          <img
            src="/navbar/search.png"
            className="absolute right-5 top-[50%] -translate-y-[50%]"
            alt=""
          />
        </div>

        <div className="flex justify-between items-center grow-0 sm:grow">
          <div className="flex justify-center gap-3">
            <img
              src="/navbar/alert.png"
              className="cursor-pointer"
              alt="alert"
            />

            <img
              src="/navbar/heart.png"
              className="cursor-pointer"
              alt="favorite"
            />

            <div className="relative">
              <img
                src="/navbar/cart.png"
                onClick={() => setOpenCart(!openCart)}
                className="cursor-pointer"
                alt="cart"
              />
              <div
                className={`${
                  openCart ? "flex" : "hidden"
                } absolute z-30 top-3 flex flex-col right-4  bg-white rounded-md p-2 w-[400px] text-mainLightBlack`}
              >
                <NavbarCart />
              </div>
            </div>
          </div>

          <div className="hidden sm:flex justify-center gap-3">
            <Switcher />
          </div>


          <div className="hidden sm:flex justify-center gap-3">
            <button className="btn">sign up</button>
            <button className="btn btn-transparent">sign in</button>
          </div>
        </div>
      </div>

      <div className="container">
        <input
          type="text"
          placeholder="Search"
          className="flex sm:hidden rounded-full placeholder:text-mainWhite placeholder:text-xs px-4 py-2 w-full border border-mainWhite bg-mainLightBlack"
        />
      </div>
    </>
  );
}

export default Navbar;
