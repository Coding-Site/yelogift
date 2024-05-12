import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import MobileMenu from './MobileMenu.tsx';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import { useLocalStorage } from '../../hooks/useLocalStorage.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/index.ts';
import {
    getCartData,
    updateCartItem,
} from '../../store/CartSlice/CartSlice.tsx';
import axios from 'axios';

function Navbar() {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const navigate = useNavigate();
    const carts = useSelector((state: RootState) => state.cartSlice.items);
    const dispatch = useDispatch<AppDispatch>();
    const localstorage = JSON.parse(localStorage.getItem('userData') as string);
    const userToken = localstorage?.userToken;
    const { removeItem } = useLocalStorage();

    const Signout = () => {
        removeItem('userData');
        navigate(0);
    };

    const onCheckout = () => {
        if (carts.length) {
            axios
                .post(
                    `${import.meta.env.VITE_BASEURL}/api/user/order/checkout`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    }
                )
                .then((d) => {
                    const orderId = d.data.data.id;

                    localStorage.setItem('orderId', JSON.stringify(orderId));
                })
                .then(() => navigate('/checkout'))
                .catch((err) => console.log(err));
        }
    };

    useEffect(() => {
        dispatch(getCartData());
    }, [getCartData]);
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
                                ? 'text-main  font-semibold'
                                : 'dark:text-gray-600 text-mainWhite'
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? 'text-main font-semibold'
                                : 'dark:text-gray-600 text-mainWhite'
                        }
                        to="/categories"
                    >
                        Categories
                    </NavLink>
                </div>

                {/* Search input  */}
                {/* <div className="hidden sm:flex grow relative">
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
                </div> */}

                {/* Actions */}
                <div className="flex justify-between items-center grow-0  sm:grow">
                    <div className="flex justify-center ms-auto me-3 gap-3 text-3xl">
                        {/* <IoMdNotificationsOutline />
                        <FaRegHeart /> */}
                        <div className="dropdown dropdown-end bg-transparent text-3xl">
                            <div tabIndex={0} role="button">
                                <LiaShoppingBagSolid className="cursor-pointer" />
                            </div>

                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded w-96 text-mainLightBlack"
                            >
                                {userToken && carts.length ? (
                                    carts.map((cart, idx) => {
                                        if (cart.quantity) {
                                            return (
                                                <div
                                                    className="flex justify-start items-center gap-3 w-full "
                                                    key={idx}
                                                >
                                                    <img
                                                        className="w-20 h-12"
                                                        src={`${import.meta.env
                                                                .VITE_BASEURL
                                                            }/storage/${cart.product?.image
                                                            }`}
                                                        alt="cart"
                                                    />
                                                    <div className="flex flex-col gap-0">
                                                        <span className="text-sm text-gray-500">
                                                            AED{' '}
                                                            { cart.product?.price}
                                                        </span>
                                                    </div>
                                                    <div className="flex basis-24 text-base h-8 min-w-[100px] px-3 items-center ms-auto w-auto  justify-between rounded-full border border-gray-300">
                                                        <span
                                                            onClick={() => {
                                                                dispatch(
                                                                    updateCartItem(  { cart_id:  cart.id as number,  quantity:  cart.quantity - 1, })
                                                                ).then(() => { dispatch( getCartData());
                                                                });
                                                            }}
                                                            className="cursor-pointer"
                                                        >
                                                            -
                                                        </span>
                                                        <span>
                                                            {cart.quantity}
                                                        </span>
                                                        <span
                                                            onClick={() => {
                                                                dispatch(
                                                                    updateCartItem(
                                                                        {
                                                                            cart_id: cart.id as number,
                                                                            quantity: cart.quantity + 1,
                                                                        }
                                                                    )
                                                                ).then(() => {
                                                                    dispatch(
                                                                        getCartData()
                                                                    );
                                                                });
                                                            }}
                                                            className="cursor-pointer"
                                                        >
                                                            +
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })
                                ) : (
                                    <div className="flex justify-center tex-2xl">
                                        No Products in the Cart
                                    </div>
                                )}
                                <div className="flex justify-between text-base mt-6">
                                    <button className="!rounded-full shadow-md px-5">
                                        keep shopping
                                    </button>
                                    <button
                                        onClick={() => onCheckout()}
                                        className="btn !rounded-full  shadow-md"
                                    >
                                        checkout
                                    </button>
                                </div>
                            </ul>
                        </div>
                    </div>

                    {/* <div className="hidden sm:flex justify-center gap-3">
                        <Switcher />
                    </div> */}

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
                                <Link
                                    to="/signin"
                                    className="btn btn-transparent"
                                >
                                    sign in
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* <div className="container">
        <input
          type="text"
          placeholder="Search"
          className="flex sm:hidden rounded-full placeholder:text-mainWhite placeholder:text-xs px-4 py-2 w-full border border-mainWhite bg-mainLightBlack"
        />
      </div> */}
        </>
    );
}

export default Navbar;
