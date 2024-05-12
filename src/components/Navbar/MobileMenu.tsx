import { Link, NavLink, useNavigate } from 'react-router-dom';
// import Switcher from "../../utils/Switcher";
import { IoClose } from 'react-icons/io5';
import { Dispatch, SetStateAction } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

function MobileMenu({open, setOpenMenu,
}: {
    open: boolean;
    setOpenMenu: Dispatch<SetStateAction<boolean>>;
}) {


  const localstorage = JSON.parse(localStorage.getItem('userData') as string);
  const userToken = localstorage?.userToken;

  const { removeItem } = useLocalStorage();
  const navigate = useNavigate();
  const Signout = () => {
    removeItem('userData');
    navigate(0);
};
    return (
        <>
            <div
                className={`absolute top-12 sm:hidden h-screen z-30 flex flex-col gap-4 pt-5 bg-mainBlack transition-all ease-out lef-0 text-white w-[200px] ${
                    open ? '' : '-translate-x-[120%]'
                }  p-2 `}
            >
                <span
                    onClick={() => setOpenMenu(!open)}
                    className="cursor-pointer absolute top-3 right-2 text-white text-3xl"
                >
                    <IoClose />
                </span>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? 'text-main  font-semibold' : 'text-mainWhite'
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? 'text-main font-semibold' : 'text-mainWhite'
                    }
                    to="/categories"
                >
                    Categories
                </NavLink>
                {/* 
        <div className="flex sm:hidden justify-center gap-3">
          <Switcher />
        </div> */}

                <div className="flex sm:hidden mt-5 justify-center gap-3">
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
        </>
    );
}

export default MobileMenu;
