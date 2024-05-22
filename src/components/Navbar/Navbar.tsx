import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import MobileMenu from './MobileMenu.tsx';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import { FaCheck } from "react-icons/fa";
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
    const [notifications, setNotifications] = useState({ readNotifications: [], unreadNotifications: [], unreadCount: 0 });
    const navigate = useNavigate();
    const carts = useSelector((state: RootState) => state.cartSlice.items);
    const dispatch = useDispatch<AppDispatch>();
    const localstorageUser = JSON.parse(localStorage.getItem('userData') as string);
    const localstorageAdmin = JSON.parse(localStorage.getItem('adminData') as string);
    const userToken = localstorageUser?.userToken;
    const adminRole = localstorageAdmin?.role;
    const adminToken = localstorageAdmin?.adminToken;
    const { removeItem } = useLocalStorage();

    const Signout = () => {
        removeItem('userData');
        removeItem('adminData');
        navigate(0);
    };

    const onCheckout = () => {
        if (carts.length > 0) {
            instance.post(`/api/user/order/checkout`, {
                name: "mohamemd"
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

    useEffect(() => {
        dispatch(getCartData());

        instance.get('/api/user/notification', {
            headers: {
                Authorization: `Bearer ${userToken}`,
                'ngrok-skip-browser-warning':true
            },
        })
            .then((response) => {
                setNotifications(response.data.data);
                console.log(response.data.data)
            })
            .catch((error) => {
                console.log('Error fetching notifications:', error);
            });
    }, [dispatch, userToken]);

    const formatDate = (dateString :any) => {
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
      }


      const handleRead = (id) => {
        instance.post(`/api/user/notification/read`, {"notification_id":id} ,{
            headers: {
                Authorization: `Bearer ${userToken}`,
                'ngrok-skip-browser-warning':true
            },
        })
            .then(() => {
                dispatch(getNotifications()); 
            })
            .catch((error) => {
                console.log('Error marking notification as read:', error);
            });
    }


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
                                <span className='absolute size-4 z-10 text-xs flex justify-center items-center font-semibold top-0 right-0 text-black bg-white rounded-full'>
                                    {notifications.unreadCount}
                                </span>
                            )}
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-white rounded sm:w-96 w-80 text-mainLightBlack"
                            >
                                {notifications.unreadNotifications.length || notifications.readNotifications.length ? (
                                    <>
                                        { notifications.unreadNotifications.map((notification, idx) => (
                                            <div
                                                className="flex justify-start items-center gap-3 w-full"
                                                key={idx}
                                            >
                                                <div className="flex flex-col gap-0 mb-3">
                                                    <div className='w-full	 flex item-center justify-between'>
                                                    <span className='text-black font-bold sm:text-base text-sm whitespace-nowrap'>{notification.title}</span>
                                                    <FaCheck color='#888' onClick={() => handleRead(notification.id)} />
                                                    </div>
                                                    <span className='text-black sm:text-base text-sm whitespace-nowrap '>{notification.message}
                                                    </span><span className='font-extralight text-slate-400 text-xs '> {formatDate(notification.updated_at)}</span>
                                                    <hr />
                                                </div>
                                            </div>
                                        ))}
                                        {notifications.readNotifications.map((notification, idx) => (
                                             <div
                                             className="flex justify-start items-center gap-3 w-full"
                                             key={idx}
                                         >
                                             <div className="flex flex-col gap-0 ">
                                             <div className='w-full	 flex item-center justify-between'>
                                                    <span className='text-slate-400 font-bold sm:text-base text-sm whitespace-nowrap'>{notification.title}</span>
                                                    <FaCheck color='rgba(240, 185, 11, 1)' />
                                                    </div>
                                                 <span className='text-slate-400 sm:text-base text-sm whitespace-nowrap '>{notification.message}
                                                 </span><span className='font-extralight text-slate-400 text-xs '> {formatDate(notification.updated_at)}</span>
                                             </div>
                                         </div>
                                        ))}
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
                                <span className='absolute size-4 z-10 text-xs flex justify-center items-center font-semibold top-0 right-0 text-black rounded-full'>
                                    {carts.length}
                                </span>
                            )}

                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-white rounded sm:w-96 w-80 text-mainLightBlack"
                            >
                                {userToken && carts.length ? (
                                    carts.map((cart, idx) => (
                                        cart.quantity ? (
                                            <div
                                                className="flex justify-start items-center gap-3 w-full"
                                                key={idx}
                                            >
                                                <img
                                                    className="w-20 h-12"
                                                    src={`${import.meta.env.VITE_BASEURL}/storage/${cart.product?.image}`}
                                                    alt="cart"
                                                />
                                                <div className="flex flex-col gap-0">
                                                    <span className='text-black sm:text-base text-sm whitespace-nowrap'>{cart.product?.name}</span>
                                                    <span className="sm:text-sm text-xs text-gray-500">
                                                        AED {cart.product?.price}
                                                    </span>
                                                </div>
                                                <div className="flex sm:basis-24 basis-16 text-base h-8 min-w-[80px] sm:min-w-[100px] px-2 sm:px-3 items-center ms-auto w-auto justify-between rounded-full border border-gray-300">
                                                    <span
                                                        onClick={() => {
                                                            dispatch(
                                                                updateCartItem({ cart_id: cart.id as number, quantity: cart.quantity - 1 })
                                                            ).then(() => {
                                                                dispatch(getCartData());
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
                                                                updateCartItem({ cart_id: cart.id as number, quantity: cart.quantity + 1 })
                                                            ).then(() => {
                                                                dispatch(getCartData());
                                                            });
                                                        }}
                                                        className="cursor-pointer"
                                                    >
                                                        +
                                                    </span>
                                                </div>
                                            </div>
                                        ) : null
                                    ))
                                ) : (
                                    <div className="flex justify-center text-2xl">
                                        No Products in the Cart
                                    </div>
                                )}
                                <div className="flex justify-between text-base mt-6 border-t border-gray-200 pt-2">
                                    <button className="!rounded-full shadow-md px-5">
                                        keep shopping
                                    </button>
                                    <button
                                        onClick={() => onCheckout()}
                                        className="btn !rounded-full shadow-md"
                                    >
                                        checkout
                                    </button>
                                </div>
                            </ul>
                        </div>
                    </div>

                    <div className="hidden sm:flex justify-center gap-3">
                        {adminRole === "admin" ? (
                            <Link to="/admin/dashboard" className="btn btn-transparent">
                                admin
                            </Link>
                        ) : userToken ? (
                            <button onClick={Signout} className="btn btn-transparent">
                                sign out
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/signup"
                                    className="btn btn-transparent"
                                >
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
