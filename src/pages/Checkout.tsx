import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import instance from '../axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/index.ts';
import { getCartData } from '../store/CartSlice/CartSlice.tsx';
import { PiWarningCircleThin } from 'react-icons/pi';

function Checkout() {
    const [methods, setMethods] = useState([]);
    const navigate = useNavigate();
    const [currencyId, setCurrencyId] = useState(null);
    const localstorage = JSON.parse(localStorage.getItem('userData') as string);
    const userToken = localstorage?.userToken;
    const [payMethod, setPayMethod] = useState<'binance' | 'crypto'>('crypto');
    const [daaaata, setDaaaata] = useState<any>([]);
    const dispatch = useDispatch<AppDispatch>();
    const [feeDesc, setFeeDesc] = useState<any>(null);

    useEffect(() => {
        const fetchFeeData = async () => {
            try {
                const response = await instance.get('/api/fee');
                const feeData = response.data.data;
                console.log(feeData);
                setFeeDesc(feeData.description);
            } catch (error) {
                console.error('Failed to fetch topnav data:', error);
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
            .then((d) => setMethods(d.data.data));
    }, []);

    useEffect(() => {
        instance
            .get(`/api/user/carts`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
            .then((d) => setDaaaata(d.data.data));
    }, []);

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
            });

        if (payMethod == 'binance') {
            navigate('/paymentauto');
        } else {
            navigate('/paymentmanual');
        }
    };

    const calculateTotalPrice = () => {
        return daaaata.reduce((total: number, cart: any) => {
            return total + cart.quantity * cart.product_part.price;
        }, 0);
    };

    return (
        <div className="flex flex-col md:py-10 w-full md:container text-mainLightBlack">
            <div className="flex justify-between flex-col sm:flex-row w-full gap-3">
                <div className="flex justify-start flex-col gap-y-10 sm:text-black text-white px-5 md:py-10 sm:bg-white grow">
                    <span className="sm:flex hidden text-2xl font-semibold  ">
                        Order Summary
                    </span>
                    <span className="sm:hidden flex items-center text-2xl font-semibold gap-x-2">
                        <img className="w-8" src="/assets/checkout/cart.png" />{' '}
                        Cart{'   '}
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
                                            <div className="flex  justify-between  w-full ">
                                                <img
                                                    className="w-20 h-12"
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_BASEURL
                                                    }/public/storage/${
                                                        item.product.image
                                                    }`}
                                                    alt="cart"
                                                />
                                                <div className="flex flex-col gap-0">
                                                    <span className="text-black sm:text-base text-sm whitespace-nowrap">
                                                        {
                                                            item.product_part
                                                                .title
                                                        }
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        USD{' '}
                                                        {
                                                            item.product_part
                                                                .price
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex  py-1 px-4 items-center   justify-center items-center rounded-full w-auto border border-gray-300">
                                                    {item.quantity}
                                                </div>
                                            </div>
                                            <hr className="mt-2" />
                                        </div>
                                    );
                                }
                            })
                        ) : (
                            <span>No Items in the Cart</span>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center container justify-between text-sm mt-5">
                            <span>Total Estimate</span>
                            <span className="text-xl text-[#6D6D6D]">
                                USDT {calculateTotalPrice()}
                            </span>
                        </div>
                        {feeDesc && (
                            <div className="w-fit  bg-[#f3ca49] mx-auto flex gap-2 items-center justify-center sm:max-w-[265px] lg:max-w-[500px] rounded-2xl mt-5 p-2 ">
                                <PiWarningCircleThin className="text-[#000] text-[20px]" />
                                <p className="mx-auto text-center text-[#000] text-[10px] ">
                                    {feeDesc}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-start flex-col sm:text-black text-white gap-y-10 px-10 py-10 sm:bg-white grow">
                    <span className="text-2xl font-semibold  ">
                        Select Payment method{' '}
                    </span>
                    <div className="flex flex-col font-medium text-xl ">
                        <label htmlFor="binance" className="flex gap-2">
                            <input
                                type="radio"
                                onClick={() => setPayMethod('binance')}
                                className="!flex"
                                name="method"
                                id="binance"
                            />
                            Binance Pay
                        </label>
                        <label htmlFor="pay" className="flex gap-2">
                            <input
                                type="radio"
                                onClick={() => setPayMethod('crypto')}
                                className="!flex"
                                defaultChecked
                                name="method"
                                id="pay"
                            />
                            Cryptocurrency
                        </label>
                    </div>
                    {payMethod == 'crypto' && (
                        <div className="flex justify-evenly flex-wrap gap-x-2 gap-y-8">
                            {methods.map((method: any, idx: any) => (
                                <div
                                    className="flex rounded-full !w-1/6 !h-10 flex-col  cursor-pointer justify-start items-center gap-y-1  "
                                    key={idx}
                                    style={{
                                        border:
                                            currencyId == method?.id
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
                                            method?.icon
                                        }
                                        alt="cart"
                                    />

                                    <span className="text-xs bg-gray-300 text-mainLightBlack rounded-full px-1 ">
                                        {method?.currency}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-y-5  items-center py-2 md:py-14">
                <button className="btn !rounded-md !w-56" onClick={SendToDB}>
                    {' '}
                    Submit
                </button>
                <Link to="/" className="text-white">
                    {' '}
                    Cancel
                </Link>
            </div>
        </div>
    );
}

export default Checkout;
