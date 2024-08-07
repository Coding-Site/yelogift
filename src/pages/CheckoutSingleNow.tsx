import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import instance from '../axios';
import { PiWarningCircleThin } from 'react-icons/pi';
import { IoIosArrowForward } from 'react-icons/io';

function CheckoutSingleNow() {
    const [methods, setMethods] = useState([]);
    const navigate = useNavigate();
    const [currencyId, setCurrencyId] = useState(null);
    const localstorage = JSON.parse(localStorage.getItem('userData') as string);
    const userToken = localstorage?.userToken;
    const [payMethod, setPayMethod] = useState<'binance' | 'crypto'>('binance');
    const orderId = JSON.parse(localStorage.getItem('orderId') as string);
    const [orderData, setOrderData] = useState<any>(null);
    const [feeDesc, setFeeDesc] = useState<any>(null);
    const [feePer, setFeePer] = useState<any>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
            .then((d) => setMethods(d.data.data));

        instance
            .get(`/api/user/order/get/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
            .then((response) => setOrderData(response.data.data))
            .catch((error) =>
                console.error('Error fetching order details:', error)
            );
    }, [orderId, userToken]);

    const SendToDB = () => {
        if (payMethod === 'binance') {
            navigate('/paymentauto');
        } else {
            navigate('/paymentmanual');
        }
    };

    const calculateTotalPrice = () => {
        if (orderData && feePer && payMethod === 'binance') {
            return (orderData.total_price * (1 + feePer / 100)).toFixed(2);
        }
        return orderData?.total_price.toFixed(2);
    };

    return (
        <div className="flex flex-col md:py-10 w-full md:container text-mainLightBlack">
            <div className="flex justify-between flex-col sm:flex-row w-full gap-3">
                <div className="flex justify-start flex-col gap-y-1 sm:gap-y-10 sm:text-black text-white px-5 sm:px-10 md:py-10 sm:bg-white grow">
                    <span className="sm:flex hidden text-2xl font-semibold  ">
                        Order Summary
                    </span>
                    <div className="w-full">
                        <div className="flex justify-between sm:justify-start gap-3 w-full ">
                            <img
                                className="w-20 h-12"
                                src={`${
                                    import.meta.env.VITE_BASEURL
                                }/public/storage/${
                                    orderData?.order.order_product[0].product
                                        .image
                                }`}
                                alt="cart"
                            />
                            <div className="flex flex-col gap-0">
                                <span className="text-white sm:text-black sm:text-base text-sm whitespace-nowrap">
                                    {
                                        orderData?.order.order_product[0]
                                            .product_part.title
                                    }
                                </span>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">
                                        {
                                            orderData?.order.order_product[0]
                                                .product_part.price_text
                                        }
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        $
                                        {
                                            orderData?.order.order_product[0]
                                                .product_part.price
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between text-sm mt-5">
                            <span>Total Estimate</span>
                            <span className="text-xl text-[#6D6D6D]">
                                USDT {calculateTotalPrice()}
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
                <div className="flex justify-start flex-col sm:text-black text-white gap-y-3 md:gap-y-10 px-10 py-2 md:py-10 sm:bg-white grow">
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
                                className="custom-radio"
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

export default CheckoutSingleNow;
