import { Link, NavLink } from "react-router-dom";

function Navbar() {
    return (
        <div className="w-full bg-mainBalck text-mainWhite px-5 flex justify-between py-5 gap-3">
            <div className="flex justify-start gap-9 items-center grow">
                <Link className="-mt-2" to="/">
                    <img src="logo.png" className="cursor-pointer" alt="logo" />
                </Link>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "text-main font-semibold" : "text-mainWhite"
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "text-main font-semibold" : "text-mainWhite"
                    }
                    to="/cats"
                >
                    Categories
                </NavLink>
            </div>
            <div className="flex grow relative">
                <input
                    type="text"
                    placeholder="Search"
                    className="rounded-full placeholder:text-mainWhite placeholder:text-xs px-4 py-2 w-full border border-mainWhite bg-mainLightBlack"
                />
                <img src="navbar/search.png" className="absolute right-5 top-[50%] -translate-y-[50%]" alt="" />
            </div>
            <div className="flex justify-between items-center grow">
                <div className="flex justify-center gap-3">
                    <img src="navbar/alert.png" className="cursor-pointer" alt="alert" />
                    <img src="navbar/heart.png" className="cursor-pointer" alt="favorite"/>
                    <img src="navbar/cart.png" className="cursor-pointer" alt="cart" />
                </div>
                <div className="flex justify-center gap-3">
                    <img
                        src="navbar/light_mode.png"
                        className="cursor-pointer"
                        alt="Lightmode"
                    />
                    <input
                        type="checkbox"
                        className="toggle toggle-primar checked:!bg-main  border-none"
                    />
                    <img
                        src="navbar/dark_mode.png"
                        className="cursor-pointer"
                        alt="Lightmode"
                    />
                </div>
                

                <div className="flex justify-center gap-3">
                    <button className="btn">sign up</button>
                    <button className="btn btn-transparent">sign in</button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
