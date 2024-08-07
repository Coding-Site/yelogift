/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import MobileMenu from './MobileMenu.tsx';
import { FaCheck } from 'react-icons/fa';
import { useLocalStorage } from '../../hooks/useLocalStorage.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/index.ts';
import {
    getCartData,
    updateCartItem,
    clearCart,
    deleteCartProduct,
} from '../../store/CartSlice/CartSlice.tsx';
import instance from '../../axios/index.ts';
import styles from '../../utils/styles/navbar.module.css';

function Navbar() {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [keyword, setKeyword] = useState('');
    const [notifications, setNotifications] = useState<any>({
        readNotifications: [],
        unreadNotifications: [],
        unreadCount: 0,
    });
    const navigate = useNavigate();
    const carts = useSelector((state: RootState) => state.cartSlice.items);
    const dispatch = useDispatch<AppDispatch>();
    const localstorageUser = JSON.parse(
        localStorage.getItem('userData') as string
    );
    const localstorageAdmin = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const userToken = localstorageUser?.userToken;
    const adminRole = localstorageAdmin?.role;
    const adminToken = localstorageAdmin?.adminToken;
    const userAuth = localstorageUser?.auth;
    const { removeItem } = useLocalStorage();

    const [hoveredNotificationId, setHoveredNotificationId] = useState<
        number | null
    >(null);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const trimmedKeyword = keyword.trim().replace(/\s+/g, ' ');
            if (trimmedKeyword !== '') {
                navigate(`/search/${trimmedKeyword}`);
                setKeyword('');
            }
        }
    };
    const Signout = () => {
        removeItem('userData');
        removeItem('adminData');
        dispatch(clearCart());
        removeItem('orderId');
        navigate('/');
        window.location.reload();
    };

    const onCheckout = () => {
        if (carts.length > 0) {
            navigate('/checkout');
        }
    };

    const fetchNotifications = () => {
        if (userToken) {
            instance
                .get('/api/user/notification', {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'ngrok-skip-browser-warning': true,
                    },
                })
                .then((response) => {
                    setNotifications(response.data.data);
                })
                .catch((error) => {
                    console.log('Error fetching notifications:', error);
                });
        }
    };

    useEffect(() => {
        dispatch(getCartData());
        fetchNotifications();
    }, [dispatch, userToken]);

    const formatDate = (dateString: any) => {
        const options: any = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        const date = new Date(dateString);
        return date.toLocaleString('en-US', options);
    };

    const handleRead = (id: any) => {
        instance
            .post(
                `/api/user/notification/read`,
                { notification_id: id },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'ngrok-skip-browser-warning': true,
                    },
                }
            )
            .then(() => {
                fetchNotifications();
            })
            .catch((error) => {
                console.log('Error marking notification as read:', error);
            });
    };

    const handleDecrease = (id: number) => {
        const item = carts.find((cart) => cart.id === id);
        if (item) {
            if (item.quantity === 1) {
                dispatch(deleteCartProduct({ id })).then(() => {
                    dispatch(getCartData());
                });
            } else {
                dispatch(
                    updateCartItem({ cart_id: id, quantity: item.quantity - 1 })
                ).then(() => {
                    dispatch(getCartData());
                });
            }
        }
    };

    return (
        <>
            <div className="w-full bg-mainBlack text-mainWhite px-5 flex justify-between items-center py-5 gap-3">
                <MobileMenu open={openMenu} setOpenMenu={setOpenMenu} />
                <div className="w-max flex justify-between items-center gap-4 py-4">
                    <GiHamburgerMenu
                        className="text-main text-2xl cursor-pointer flex md:hidden"
                        onClick={() => setOpenMenu(!openMenu)}
                    />
                </div>
                <Link className="mx-auto min-w-[115px] " to="/">
                    <img
                        src="/assets/Logo/Asset-1.png"
                        className="cursor-pointer w-[150px]"
                        alt="logo"
                    />
                </Link>
                <div className="hidden md:flex justify-start gap-5 ps-5 py-4 items-center">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-main font-semibold'
                                : 'dark:text-gray-600 text-mainWhite'
                        }
                    >
                        Home
                    </NavLink>

                    {userToken && (
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-main font-semibold text-nowrap	'
                                    : 'dark:text-gray-600 text-mainWhite text-nowrap	'
                            }
                            to="/ordershistory"
                        >
                            My Orders
                        </NavLink>
                    )}
                    {userToken && userAuth == 'yelogift' && (
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-main font-semibold text-nowrap	'
                                    : 'dark:text-gray-600 text-mainWhite text-nowrap	'
                            }
                            to={`user-settings`}
                        >
                            Settings
                        </NavLink>
                    )}
                </div>
                <div className="hidden md:flex grow gap-x-1 w-full">
                    <div className=" w-full  flex items-center rounded-full border-gray-400 border px-4 pb-2 pt-1.5 placeholder:text-xs ">
                        <img
                            src="/assets/admin/9035096_search_icon 4.svg"
                            alt="search"
                            className="mr-2"
                        />
                        <input
                            type="text"
                            onChange={(e) => setKeyword(e.target.value)}
                            value={keyword}
                            onKeyPress={handleKeyPress}
                            placeholder="Search"
                            className="bg-transparent outline-none w-full"
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center grow-0 sm:grow">
                    <div className="flex justify-center ms-auto me-3 gap-3 text-3xl">
                        {userToken && (
                            <div className="dropdown dropdown-end bg-transparent text-3xl z-[1000]">
                                <div tabIndex={0} role="button">
                                    <img
                                        src="/assets/navbar/Asset_26.png"
                                        alt="icon"
                                        className="cursor-pointer min-w-5 w-5"
                                    />
                                    {notifications.unreadCount > 0 && (
                                        <span className="absolute size-4 z-10 text-xs flex justify-center items-center font-semibold top-0 right-0 text-black bg-white rounded-full">
                                            {notifications.unreadCount}
                                        </span>
                                    )}
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content z-[1] menu p-2 shadow bg-white rounded sm:w-96 w-80 text-mainLightBlack"
                                >
                                    {notifications.unreadNotifications.length ||
                                    notifications.readNotifications.length ? (
                                        <>
                                            {notifications.unreadNotifications.map(
                                                (
                                                    notification: any,
                                                    idx: any
                                                ) => (
                                                    <div
                                                        className="flex justify-start items-center gap-3 w-full"
                                                        key={idx}
                                                        onMouseEnter={() =>
                                                            setHoveredNotificationId(
                                                                notification.id
                                                            )
                                                        }
                                                        onMouseLeave={() =>
                                                            setHoveredNotificationId(
                                                                null
                                                            )
                                                        }
                                                    >
                                                        <div className="flex flex-col gap-0 mb-3 w-full">
                                                            <div className="w-full flex item-center justify-between">
                                                                <span className="text-black font-bold sm:text-base text-sm w-full break-all overflow-hidden ">
                                                                    {
                                                                        notification.title
                                                                    }
                                                                </span>
                                                                <FaCheck
                                                                    color="#888"
                                                                    onClick={() =>
                                                                        handleRead(
                                                                            notification.id
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <span
                                                                className={`text-black sm:text-base text-sm w-9/12 ${
                                                                    hoveredNotificationId ===
                                                                    notification.id
                                                                        ? 'break-all'
                                                                        : `${styles.line_clamp}`
                                                                }`}
                                                            >
                                                                {
                                                                    notification.message
                                                                }
                                                            </span>
                                                            <span className="font-extralight text-slate-400 text-xs ml-auto mt-2">
                                                                {formatDate(
                                                                    notification.updated_at
                                                                )}
                                                            </span>
                                                            <hr />
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                            {notifications.readNotifications.map(
                                                (
                                                    notification: any,
                                                    idx: any
                                                ) => (
                                                    <div
                                                        className="flex justify-start items-center gap-3 w-full"
                                                        key={idx}
                                                        onMouseEnter={() =>
                                                            setHoveredNotificationId(
                                                                notification.id
                                                            )
                                                        }
                                                        onMouseLeave={() =>
                                                            setHoveredNotificationId(
                                                                null
                                                            )
                                                        }
                                                    >
                                                        <div className="flex flex-col gap-0 w-full">
                                                            <div className="w-full flex item-center justify-between">
                                                                <span className="text-slate-400 font-bold sm:text-base text-sm w-full break-all overflow-hidden">
                                                                    {
                                                                        notification.title
                                                                    }
                                                                </span>
                                                                <FaCheck color="rgba(240, 185, 11, 1)" />
                                                            </div>
                                                            <span
                                                                className={`text-black sm:text-base text-sm w-9/12 ${
                                                                    hoveredNotificationId ===
                                                                    notification.id
                                                                        ? ''
                                                                        : `${styles.line_clamp}`
                                                                }`}
                                                            >
                                                                {
                                                                    notification.message
                                                                }
                                                            </span>
                                                            <span className="font-extralight text-slate-400 text-xs ml-auto mt-2">
                                                                {formatDate(
                                                                    notification.updated_at
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </>
                                    ) : (
                                        <div className="flex justify-center text-2xl">
                                            No Notifications
                                        </div>
                                    )}
                                </ul>
                            </div>
                        )}
                        <div className="dropdown dropdown-end bg-transparent text-3xl">
                            <div tabIndex={0} role="button">
                                <img
                                    src="/assets/navbar/Asset_24.png"
                                    alt="ShoppingCart"
                                    className="cursor-pointer min-w-6 w-6"
                                />
                                {carts.length > 0 && (
                                    <span className="absolute size-4 z-10 text-xs flex justify-center items-center font-semibold top-0 right-0 text-black bg-white rounded-full">
                                        {carts.length}
                                    </span>
                                )}
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[10000] menu p-2 shadow bg-white rounded-box sm:w-96 w-80 text-mainLightBlack"
                            >
                                {userToken && carts.length ? (
                                    carts.map((cart: any, idx) => {
                                        if (cart.quantity) {
                                            return (
                                                <div
                                                    className="flex justify-start items-center gap-3 w-full "
                                                    key={idx}
                                                >
                                                    <img
                                                        className="w-20 h-12"
                                                        src={`${
                                                            import.meta.env
                                                                .VITE_BASEURL
                                                        }/public/storage/${
                                                            cart.product_image
                                                        }`}
                                                        alt="cart"
                                                    />
                                                    <div className="flex flex-col gap-0">
                                                        <span className="text-black sm:text-base text-sm whitespace-nowrap">
                                                            {cart.part_name}
                                                        </span>
                                                        <span className="sm:text-sm text-xs text-gray-500">
                                                            USD
                                                            {cart.part_price}
                                                        </span>
                                                    </div>
                                                    <div className="flex sm:basis-24 basis-16 text-base h-8 min-w-[80px] sm:min-w-[100px] px-2 sm:px-3 items-center ms-auto w-auto  justify-between rounded-full border border-gray-300">
                                                        <span
                                                            onClick={() =>
                                                                handleDecrease(
                                                                    cart.id
                                                                )
                                                            }
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
                                                                            cart_id:
                                                                                cart.id as number,
                                                                            quantity:
                                                                                cart.quantity +
                                                                                1,
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
                                <div className="flex justify-end text-base mt-6 border-t border-gray-200 pt-2">
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
                    <div className="hidden sm:flex justify-center gap-3">
                        {adminRole == 'admin' ? (
                            <Link to="/admin" className="btn">
                                Admin Panel
                            </Link>
                        ) : (
                            ''
                        )}
                        {userToken || adminToken ? (
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
        </>
    );
}

export default Navbar;
