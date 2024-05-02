import { Link, NavLink, useNavigate } from "react-router-dom";
import Switcher from "../../utils/Switcher.tsx";
import { useState } from "react";
import NavbarCart from "./NavbarCart.tsx";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileMenu from "./MobileMenu.tsx";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { useLocalStorage } from "../../hooks/useLocalStorage.tsx";



function Navbar() {
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const  localstorage  = JSON.parse((localStorage.getItem("userData")) as string);
  const userToken = localstorage?.userToken
  const { removeItem } = useLocalStorage();

  const Signout = () => {
    removeItem("userData");
    navigate(0);
  };

  return (
    <>
      <div className="w-full bg-mainBalck text-mainWhite  px-5 flex justify-between  items-center py-5 gap-3">
        <MobileMenu open={openMenu} setOpenMenu={setOpenMenu} />
        {/* Menu items */}
        <div className="flex justify-between items-center gap-4 py-4">
          <GiHamburgerMenu
            className="text-main text-2xl cursor-pointer flex sm:hidden"
            onClick={() => setOpenMenu(!openMenu)}
          />
          <Link className="" to="/">
            <img
              src="/assets/logo.png"
              className="cursor-pointer w-[150px]"
              alt="logo"
            />
          </Link>
        </div>
        <div className="hidden sm:flex justify-start gap-9 ps-5 py-4 items-center grow">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-main  font-semibold"
                : "dark:text-gray-600 text-mainWhite"
            }
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-main font-semibold"
                : "dark:text-gray-600 text-mainWhite"
            }
            to="/category"
          >
            Categories
          </NavLink>
        </div>

        {/* Search input */}
        <div className="hidden sm:flex grow relative">
          <input
            type="text"
            placeholder="Search"
            className="hidden sm:flex dark:bg-mainWhite rounded-full placeholder:text-mainWhite placeholder:text-xs px-4 py-2 w-full border border-mainWhite dark:border-gray-600 placeholder:dark:text-gray-400 bg-mainLightBlack"
          />
          <img
            src="/assets/navbar/search.png"
            className="absolute right-5 top-[50%] -translate-y-[50%]"
            alt=""
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center grow-0 sm:grow">
          <div className="flex justify-center gap-3 text-3xl">
            <IoMdNotificationsOutline />
            <FaRegHeart />

            <div className="relative">
              <LiaShoppingBagSolid
                className="cursor-pointer"
                onClick={() => setOpenCart(!openCart)}
              />

              <div
                className={`${
                  openCart ? "flex" : "hidden"
                } absolute z-30 top-3 flex flex-col right-4  bg-white rounded-md p-2 w-[400px] text-mainLightBlack`}
              >
                <NavbarCart setOpenCart={setOpenCart} openCart={openCart} />
              </div>
            </div>
          </div>

          <div className="hidden sm:flex justify-center gap-3">
            <Switcher />
          </div>

          <div className="hidden sm:flex justify-center gap-3">
            {userToken ? (
              <button onClick={() => Signout()} className="btn">
                sign out
              </button>
            ) : (
              <>
                <Link to="/signup" className="btn">
                  sign up
                </Link>
                <Link to="/signin" className="btn btn-transparent">
                  sign in
                </Link>
              </>
            )}
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
