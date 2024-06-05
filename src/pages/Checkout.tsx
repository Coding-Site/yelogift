/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';
import { RootState } from '../store';
// import { getCartData, updateCartItem } from '../store/CartSlice/CartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import instance from '../axios';

function Checkout() {
    const carts = useSelector((state: RootState) => state.cartSlice.items);
    const [methods, setMethods] = useState([]);
    const navigate = useNavigate();
    // const dispatch = useDispatch<AppDispatch>();
    const [currencyId, setCurrencyId] = useState(null);
    const localstorage = JSON.parse(localStorage.getItem('userData') as string);
    const userToken = localstorage?.userToken;
    const [payMethod, setPayMethod] = useState<'binance' | 'crypto'>('crypto');
    console.log(carts);
    useEffect(() => {
        instance
            .get(`/api/user/order/currancy`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
            .then((d) => setMethods(d.data.data));
    }, []);

    const SendToDB = () => {
        if (payMethod == 'binance') {
            navigate('/paymentauto');
        } else {
            navigate('/paymentmanual');
        }
    };

    const calculateTotalPrice = () => {
        return carts.reduce((total: number, cart: any) => {
            return total + cart.quantity * cart.product.price;
        }, 0);
    };

    return (
        <div className="flex flex-col md:py-10 w-full md:container text-mainLightBlack">
            <div className="flex justify-between flex-col sm:flex-row w-full gap-3">
                <div className="flex justify-start flex-col gap-y-10 sm:text-black text-white px-5 md:py-10 sm:bg-white grow">
                    <span className="sm:flex hidden text-2xl font-semibold  ">
                        Order Summary
                    </span>
                    <span className="sm:hidden flex text-2xl font-semibold gap-x-2">
                        <img className="w-8" src="/assets/checkout/cart.png" />{' '}
                        Cart
                    </span>
                    <div className="flex flex-col gap-3 sm:text-black text-white">
                        {carts.length ? (
                            carts.map((cart: any, idx) => {
                                if (cart.quantity) {
                                    return (
                                        <>
                                            <div
                                                className="flex  justify-between  w-full "
                                                key={idx}
                                            >
                                                <img
                                                    className="w-20 h-12"
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_BASEURL
                                                    }/public/storage/${
                                                        cart.product?.image
                                                    }`}
                                                    alt="cart"
                                                />
                                                <div className="flex flex-col gap-0">
                                                    <span className="text-black sm:text-base text-sm whitespace-nowrap">
                                                        {cart.product?.name}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        USD{' '}
                                                        {cart.product?.price}
                                                    </span>
                                                </div>
                                                <div className="flex  py-1 px-4 items-center   justify-center items-center rounded-full w-auto border border-gray-300">
                                                    {cart.quantity}
                                                </div>
                                            </div>
                                            <hr />
                                        </>
                                    );
                                }
                            })
                        ) : (
                            <span>No Items in the Cart</span>
                        )}
                    </div>
                    <div className="flex items-center container justify-between text-sm mt-5">
                        <span>Total Estimate</span>
                        <span className="text-xl text-[#6D6D6D]">
                            USDT {calculateTotalPrice()}
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
