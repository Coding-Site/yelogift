import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import instance from '../axios';

function CheckoutSingleNow() {
    const [methods, setMethods] = useState([]);
    const navigate = useNavigate();
    const [currencyId, setCurrencyId] = useState(null);
    const localstorage = JSON.parse(localStorage.getItem('userData') as string);
    const userToken = localstorage?.userToken;
    const [payMethod, setPayMethod] = useState<'binance' | 'crypto'>('crypto');
    const orderId = JSON.parse(localStorage.getItem('orderId') as string);
    const [orderData, setOrderData] = useState<any>(null);

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
        if (payMethod == 'binance') {
            navigate('/paymentauto');
        } else {
            navigate('/paymentmanual');
        }
    };

    return (
        <div className="flex flex-col py-10 w-full container text-mainLightBlack">
            <div className="flex justify-between flex-col sm:flex-row w-full gap-3">
                <div className="flex justify-start flex-col gap-y-10 sm:text-black text-white px-10 py-10 sm:bg-white grow">
                    <span className="sm:flex hidden text-2xl font-semibold  ">
                        Order Summary
                    </span>
                    <div>
                        <div className="flex  justify-start gap-3 w-full ">
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
                                <span className="text-black sm:text-base text-sm whitespace-nowrap">
                                    {
                                        orderData?.order.order_product[0]
                                            .product_part.title
                                    }
                                </span>
                                <span className="text-sm text-gray-500">
                                    USD
                                    {orderData?.total_price}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-5">
                        <span>Total Estimate</span>
                        <span className="text-xl text-[#6D6D6D]">
                            ${orderData?.total_price}
                        </span>
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
            <div className="flex flex-col gap-y-5  items-center py-14">
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

export default CheckoutSingleNow;
