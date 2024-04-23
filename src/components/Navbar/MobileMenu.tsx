import { NavLink } from "react-router-dom";
import Switcher from "../../utils/Switcher";

function MobileMenu({ open }: { open: boolean }) {
  return (
    <>
      <div
        className={`absolute top-12  sm:hidden h-screen z-30 flex flex-col gap-4 bg-mainBlack transition-all ease-out lef-0 text-white w-[200px] ${
          open ? "" : "-translate-x-[100%]"
        }  p-2 `}
      >
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

        <div className="flex sm:hidden justify-center gap-3">
          <Switcher />
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
