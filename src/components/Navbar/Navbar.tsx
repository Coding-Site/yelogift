import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import MobileMenu from './MobileMenu.tsx';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import { FaCheck } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useLocalStorage } from '../../hooks/useLocalStorage.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/index.ts';
import {
    getCartData,
    updateCartItem,
} from '../../store/CartSlice/CartSlice.tsx';
import instance from '../../axios/index.ts';

function Navbar() {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [notifications, setNotifications] = useState({
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
    const { removeItem } = useLocalStorage();

    const [hoveredNotificationId, setHoveredNotificationId] = useState<
        number | null
    >(null);

    const Signout = () => {
        removeItem('userData');
        removeItem('adminData');
        navigate(0);
    };

    const onCheckout = () => {
        if (carts.length > 0) {
            instance
                .post(
                    `/api/user/order/checkout`,
                    {
                        name: 'mohamemd',
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    }
                )
                .then((d) => {
                    const orderId = d.data.data.id;
                    console.log(d);
                    localStorage.setItem('orderId', JSON.stringify(orderId));
                })
                .then(() => navigate('/checkout'))
                .catch((err) => console.log(err));
        }
    };

    const fetchNotifications = () => {
        instance
            .get('/api/user/notification', {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'ngrok-skip-browser-warning': true,
                },
            })
            .then((response) => {
                setNotifications(response.data.data);
                console.log(response.data.data);
            })
            .catch((error) => {
                console.log('Error fetching notifications:', error);
            });
    };

    useEffect(() => {
        dispatch(getCartData());
        fetchNotifications();
    }, [dispatch, userToken]);

    const formatDate = (dateString: any) => {
        const options = {
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

    const handleRead = (id) => {
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

    return (
        <>
            <div className="w-full bg-mainBlack text-mainWhite px-5 flex justify-between items-center py-5 gap-3">
                <MobileMenu open={openMenu} setOpenMenu={setOpenMenu} />
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
                                ? 'text-main font-semibold'
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
                <div className="flex justify-between items-center grow-0 sm:grow">
                    <div className="flex justify-center ms-auto me-3 gap-3 text-3xl">
                        <div className="dropdown dropdown-end bg-transparent text-3xl">
                            <div tabIndex={0} role="button">
                                <IoMdNotificationsOutline className="cursor-pointer" />
                            </div>
                            {notifications.unreadCount > 0 && (
                                <span className="absolute size-4 z-10 text-xs flex justify-center items-center font-semibold top-0 right-0 text-black bg-white rounded-full">
                                    {notifications.unreadCount}
                                </span>
                            )}
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-white rounded sm:w-96 w-80 text-mainLightBlack"
                            >
                                {notifications.unreadNotifications.length ||
                                notifications.readNotifications.length ? (
                                    <>
                                        {notifications.unreadNotifications.map(
                                            (notification, idx) => (
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
                                                            className={`text-black sm:text-base text-sm w-full ${
                                                                hoveredNotificationId ===
                                                                notification.id
                                                                    ? 'break-all'
                                                                    : 'text-ellipsis overflow-hidden'
                                                            }`}
                                                        >
                                                            {
                                                                notification.message
                                                            }
                                                        </span>
                                                        <span className="font-extralight text-slate-400 text-xs ">
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
                                            (notification, idx) => (
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
                                                            className={`text-black sm:text-base text-sm w-full ${
                                                                hoveredNotificationId ===
                                                                notification.id
                                                                    ? 'break-all'
                                                                    : 'text-ellipsis overflow-hidden'
                                                            }`}
                                                        >
                                                            {
                                                                notification.message
                                                            }
                                                        </span>
                                                        <span className="font-extralight text-slate-400 text-xs ">
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

                        <div className="dropdown dropdown-end bg-transparent text-3xl">
                            <div tabIndex={0} role="button">
                                <LiaShoppingBagSolid className="cursor-pointer" />
                            </div>
                            {carts.length > 0 && (
                                <span className="absolute size-4 z-10 text-xs flex justify-center items-center font-semibold top-0 right-0 text-black bg-white rounded-full">
                                    {carts.length}
                                </span>
                            )}
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box sm:w-96 w-80 text-mainLightBlack"
                            >
                                {carts.length > 0 ? (
                                    carts.map((cart, idx) => (
                                        <li
                                            key={idx}
                                            className="flex justify-between items-center gap-3 w-full"
                                        >
                                            <img
                                                src={cart.image}
                                                alt="cart"
                                                className="w-[50px]"
                                            />
                                            <div className="flex flex-col gap-1 w-full">
                                                <span className="text-black font-bold sm:text-base text-sm">
                                                    {cart.name}
                                                </span>
                                                <span className="text-black sm:text-base text-sm">
                                                    {cart.price}$
                                                </span>
                                                <div className="flex justify-between items-center gap-3">
                                                    <span className="text-black sm:text-base text-sm">
                                                        Qty: {cart.qty}
                                                    </span>
                                                    <button
                                                        className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                                                        onClick={() =>
                                                            dispatch(
                                                                updateCartItem(
                                                                    cart.id,
                                                                    0
                                                                )
                                                            )
                                                        }
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li className="flex justify-center text-2xl">
                                        No Items
                                    </li>
                                )}
                                <li>
                                    <button
                                        className="w-full bg-main text-mainWhite py-2 rounded mt-2"
                                        onClick={onCheckout}
                                    >
                                        Checkout
                                    </button>
                                </li>
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
