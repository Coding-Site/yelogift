import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import instance from '../axios';
import { PiWarningCircleThin } from 'react-icons/pi';
import { IoIosArrowForward } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCartData,
    updateCartItem,
    deleteCartProduct,
} from '../store/CartSlice/CartSlice.tsx';
import { FaRegTrashAlt } from 'react-icons/fa';

function Checkout() {
    const [methods, setMethods] = useState([]);
    const navigate = useNavigate();
    const [currencyId, setCurrencyId] = useState(null);
    const localstorage = JSON.parse(localStorage.getItem('userData') as string);
    const userToken = localstorage?.userToken;
    const [payMethod, setPayMethod] = useState<'binance' | 'crypto'>('binance');
    const [daaaata, setDaaaata] = useState<any>([]);
    const dispatch = useDispatch<any>();
    const [feeDesc, setFeeDesc] = useState<any>(null);
    const [feePer, setFeePer] = useState<any>(null);
    const [flag, setFlag] = useState<any>(false);
    const carts = useSelector((state: any) => state.cartSlice.items);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleDecrease = (id: number) => {
        const item = carts.find((cart: any) => cart.id === id);
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
        setFlag(!flag);
    };

    const handleRemove = (id: number) => {
        dispatch(deleteCartProduct({ id })).then(() => {
            dispatch(getCartData());
        });
        setFlag(!flag);
    };

    useEffect(() => {
        const fetchFeeData = async () => {
            try {
                const response = await instance.get('/api/fee');
                const feeData = response.data.data;
                setFeeDesc(feeData?.description);
                setFeePer(feeData?.percent);
            } catch (error) {
                console.error('Failed to fetch fee data:', error);
            }
        };
        fetchFeeData();
    }, []);

    useEffect(() => {
        instance
            .get(`/api/user/order/currancy`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
            .then((d) => {
                setMethods(d.data.data);
            });
    }, []);

    useEffect(() => {
        instance
            .get(`/api/user/carts`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
            .then((d) => setDaaaata(d.data.data));
    }, [flag]);

    const SendToDB = () => {
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
                localStorage.setItem('orderId', JSON.stringify(orderId));
            })
            .then(() => {
                dispatch(getCartData());
                if (payMethod === 'binance') {
                    navigate('/paymentauto');
                } else {
                    navigate('/paymentmanual');
                }
            });
    };

    const calculateTotalPrice = () => {
        const totalPrice = daaaata.reduce((total: number, cart: any) => {
            return total + cart.quantity * cart.product_part.price;
        }, 0);

        if (payMethod === 'binance' && feePer) {
            return totalPrice * (1 + feePer / 100);
        }

        return totalPrice;
    };

    return (
        <div className="flex flex-col md:py-10 w-full md:container text-mainLightBlack">
            <div className="flex justify-between flex-col sm:flex-row w-full gap-3">
                <div className="flex justify-start flex-col gap-y-10 sm:text-black text-white px-5 md:py-10 sm:bg-white grow">
                    <span className="sm:flex hidden text-2xl font-semibold">
                        Order Summary
                    </span>
                    <span className="sm:hidden flex items-center text-2xl font-semibold gap-x-2">
                        <img
                            className="w-8"
                            src="/assets/checkout/cart.png"
                            alt="cart"
                        />
                        Cart
                        {daaaata.length > 0 && (
                            <span className="text-sm text-gray-500">
                                (
                                {daaaata.reduce(
                                    (total: any, item: any) =>
                                        total + item.quantity,
                                    0
                                )}
                                {daaaata.reduce(
                                    (total: any, item: any) =>
                                        total + item.quantity,
                                    0
                                ) === 1
                                    ? ' Item'
                                    : ' Items'}
                                )
                            </span>
                        )}
                    </span>
                    <div className="flex flex-col gap-3 sm:text-black text-white">
                        {daaaata.length ? (
                            daaaata.map((item: any, idx: any) => {
                                if (item.quantity) {
                                    return (
                                        <div key={idx}>
                                            <div className="flex items-center justify-between w-full gap-[6px]">
                                                <img
                                                    className="w-[108px] h-[66px] mr-[15px] rounded-[12px]"
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_BASEURL
                                                    }/public/storage/${
                                                        item.product.image
                                                    }`}
                                                    alt="cart"
                                                />
                                                {/* <div className="flex items-center  sm:justify-center gap-[7px]"> */}

                                                {/* </div> */}
                                                <div className="flex flex-col flex-wrap	 sm:flex-row justify-center sm:w-full sm:justify-between  w-full sm:w-auto  items-start">
                                                    <div className="flex flex-col gap-[5px] ">
                                                        <span className="text-white sm:text-black sm:text-base text-sm whitespace-nowrap">
                                                            {
                                                                item
                                                                    .product_part
                                                                    .title
                                                            }
                                                        </span>
                                                        <div className="flex justify-between items-center gap-[5px] sm:gap-[17px]">
                                                            <span className="text-sm text-gray-500">
                                                                {
                                                                    item
                                                                        .product_part
                                                                        .price_text
                                                                }
                                                            </span>
                                                            <span className="text-sm text-gray-500">
                                                                $
                                                                {
                                                                    item
                                                                        .product_part
                                                                        .price
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex mt-[5px]">
                                                        <div className="flex sm:basis-24 basis-16 text-base h-8 min-w-[70px] sm:min-w-[100px] px-2 sm:px-3 items-center ms-auto w-auto  justify-between rounded-[8px] sm:rounded-full border border-[#6D6D6D]">
                                                            <span
                                                                onClick={() =>
                                                                    handleDecrease(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="cursor-pointer"
                                                            >
                                                                -
                                                            </span>
                                                            <span>
                                                                {item.quantity}
                                                            </span>
                                                            <span
                                                                onClick={() => {
                                                                    dispatch(
                                                                        updateCartItem(
                                                                            {
                                                                                cart_id:
                                                                                    item.id as number,
                                                                                quantity:
                                                                                    item.quantity +
                                                                                    1,
                                                                            }
                                                                        )
                                                                    ).then(
                                                                        () => {
                                                                            dispatch(
                                                                                getCartData()
                                                                            );
                                                                        }
                                                                    );
                                                                    setFlag(
                                                                        !flag
                                                                    );
                                                                }}
                                                                className="cursor-pointer"
                                                            >
                                                                +
                                                            </span>
                                                        </div>
                                                        <div
                                                            onClick={() =>
                                                                handleRemove(
                                                                    item.id
                                                                )
                                                            }
                                                            className="cursor-pointer h-8 flex items-center justify-center gap-[7px] ml-[5px] sm:ml-[17px] mx-auto rounded-[8px] sm:rounded-full border border-[#6D6D6D] p-[7px] sm:border-none"
                                                        >
                                                            <FaRegTrashAlt className="text-[#6D6D6D] text-[15px]" />
                                                            <span className="sm:hidden text-[11px] text-[#6D6D6D]">
                                                                Remove
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className="mt-[26px]" />
                                        </div>
                                    );
                                }
                                return null;
                            })
                        ) : (
                            <span>No Items in the Cart</span>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center  justify-between text-sm mt-5">
                            <span>Total Estimate</span>
                            <span className="text-xl text-[#6D6D6D]">
                                USDT {calculateTotalPrice().toFixed(2)}
                            </span>
                        </div>
                        {feeDesc && payMethod === 'binance' && (
                            <div className="w-fit bg-[#f3ca49] mx-auto flex gap-2 items-center justify-center sm:max-w-[265px] lg:max-w-[500px] rounded-2xl mt-5 p-2">
                                <PiWarningCircleThin className="text-[#000] text-[20px]" />
                                <p className="mx-auto text-center text-[#000] text-[10px]">
                                    {feeDesc}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-start flex-col sm:text-black text-white gap-[20px] sm:gap-y-10 px-5 sm:px-10 py-5 sm:py-10 sm:bg-white grow">
                    <span className=" text-[17px]  sm:text-2xl font-semibold">
                        Select Payment method
                    </span>
                    <div className="flex flex-col font-medium text-xl">
                        <label
                            htmlFor="binance"
                            className="flex gap-2 items-center"
                        >
                            <input
                                type="radio"
                                onClick={() => setPayMethod('binance')}
                                defaultChecked
                                className=" custom-radio"
                                name="method"
                                id="binance"
                            />
                            <img
                                className="w-[20px] h-[20px] object-cover"
                                src="assets/cLogo/Binance_logo_coin 5.png"
                                alt=".."
                            />
                            Binance Pay
                        </label>
                        <label
                            htmlFor="pay"
                            className="flex gap-2 items-center"
                        >
                            <input
                                type="radio"
                                onClick={() => setPayMethod('crypto')}
                                className="custom-radio"
                                name="method"
                                id="pay"
                            />
                            <img
                                className="w-[20px] h-[20px] object-cover"
                                src="assets/cLogo/IMG_4669 1.png"
                                alt=".."
                            />
                            Cryptocurrency
                        </label>
                    </div>
                    {payMethod === 'crypto' && (
                        <div className="flex justify-evenly flex-wrap gap-x-2 gap-y-8">
                            {methods.map((method: any, idx: any) => (
                                <div
                                    className="flex rounded-full !w-1/6 !h-10 flex-col cursor-pointer justify-start items-center gap-y-1 mb-[20px]"
                                    key={idx}
                                    style={{
                                        border:
                                            currencyId === method?.id
                                                ? '1px solid #ccc'
                                                : '',
                                    }}
                                    onClick={() => {
                                        setCurrencyId(method?.id);
                                        localStorage.setItem(
                                            'currencyId',
                                            JSON.stringify(method?.id)
                                        );
                                    }}
                                >
                                    <img
                                        className="size-10 rounded-full"
                                        src={
                                            import.meta.env.VITE_BASEURL +
                                            '/public/storage/' +
                                            method?.currency.icon
                                        }
                                        alt="icon"
                                    />
                                    <span className="text-xs bg-gray-300 text-mainLightBlack rounded-full px-1">
                                        {method?.currency.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-y-5 items-center pt-2 pb-10  md:py-14">
                <button
                    className="hidden sm:block btn !rounded-md !w-[80%] sm:!w-56"
                    onClick={SendToDB}
                >
                    Submit
                </button>
                <button
                    className="sm:hidden btn !rounded-md !w-[80%] sm:!w-56"
                    onClick={SendToDB}
                >
                    Pay Now <IoIosArrowForward />
                </button>
                <Link to="/" className="text-white">
                    Cancel
                </Link>
            </div>
        </div>
    );
}

export default Checkout;
