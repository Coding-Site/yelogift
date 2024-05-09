/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { getCartData, updateCartItem } from '../store/CartSlice/CartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Checkout() {
    const carts = useSelector((state: RootState) => state.cartSlice.items);
    const [methods, setMethods] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    const [currencyId, setCurrencyId] = useState(null);
    const localstorage = JSON.parse(localStorage.getItem('userData') as string);
    const userToken = localstorage?.userToken;

    const [payMethod, setPayMethod] = useState<'binance' | 'crypto'>('crypto');

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BASEURL}/api/user/order/currancy`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
            .then((d) => setMethods(d.data.data));
    }, []);

    const SendToDB = () => {
        if(payMethod == 'binance') {
            navigate('/paymentauto')
        }else{
            navigate('/paymentmanual')
        }
        // axios.get(`${import.meta.env.VITE_BASEURL}/api/user/carts/delete/all`,{
        //   headers: {
        //     Authorization: `Bearer ${userToken}`
        //   }
        // })
        // .then(() => {
        //   if (payMethod == 'binance') {
        //       axios
        //           .post(
        //               `${
        //                   import.meta.env.VITE_BASEURL
        //               }/api/user/order/binance/pay`,
        //               {
        //                   order_id: orderId,
        //               },
        //               {
        //                   headers: {
        //                       Authorization: `Bearer ${userToken}`,
        //                   },
        //               }
        //           )
        //           .then((d) => {
        //             const binancePayData = d.data.data;
        //             localStorage.setItem('binancePayData', JSON.stringify(binancePayData));
        //             navigate('/paymentauto')
        //           })
        //           .catch((err) => console.log(err));
        //   } else {
        //       axios
        //           .post(
        //               `${
        //                   import.meta.env.VITE_BASEURL
        //               }/api/user/order/pay/currancy`,
        //               {
        //                   order_id: orderId,
        //                   currency_id: currencyId,
        //               },
        //               {
        //                   headers: {
        //                       Authorization: `Bearer ${userToken}`,
        //                   },
        //               }
        //           )
        //           .then((d) => console.log(d))
        //           .catch((err) => console.log(err));
        //   }
        // })
    };

    return (
        <div className="flex flex-col py-10 w-full container text-mainLightBlack">
            <div className="flex justify-between flex-col sm:flex-row w-full gap-3">
                <div className="flex justify-start flex-col gap-y-10  px-10 py-10 bg-white grow">
                    <span className="text-2xl font-semibold  ">
                        Order Summary
                    </span>
                    <div className="flex flex-col gap-3">
                        {carts.length ? (
                            carts.map((cart, idx) => {
                                if(cart.quantity){
                                    return (
                                        <div
                                        className="flex  justify-start gap-3 w-full "
                                        key={idx}
                                    >
                                        <img
                                            className="w-20 h-12"
                                            src={`${
                                                import.meta.env.VITE_BASEURL
                                            }/public/storage/${
                                                cart.product?.image
                                            }`}
                                            alt="cart"
                                        />
                                        <div className="flex flex-col gap-0">
                                            {/* <span className="text-xl text-black ">
                        {cart.description.length > 10
                          ? cart.description.slice(0, 10) + "..."
                          : cart.description}
                      </span> */}
                                            <span className="text-sm text-gray-500">
                                                AED {cart.product?.price}
                                            </span>
                                        </div>
                                        <div className="flex basis-24 h-8 min-w-[100px] px-3 items-center ms-auto w-auto  justify-between rounded-full border border-gray-300">
                                            <span
                                                className=" cursor-pointer"
                                                onClick={() => {
                                                    dispatch(
                                                        updateCartItem({
                                                            cart_id:
                                                                cart.id as number,
                                                            quantity:
                                                                cart.quantity - 1,
                                                        })
                                                    ).then(() => {
                                                        dispatch(getCartData());
                                                    });
                                                }}
                                            >
                                                -
                                            </span>
                                            <span>{cart.quantity}</span>
                                            <span
                                                className=" cursor-pointer"
                                                onClick={() => {
                                                    dispatch(
                                                        updateCartItem({
                                                            cart_id:
                                                                cart.id as number,
                                                            quantity:
                                                                cart.quantity + 1,
                                                        })
                                                    ).then(() => {
                                                        dispatch(getCartData());
                                                    });
                                                }}
                                            >
                                                +
                                            </span>
                                        </div>
                                    </div>
                                    )
                                }
                            })
                        ) : (
                            <span>No Items in the Cart</span>
                        )}
                    </div>
                </div>
                <div className="flex justify-start flex-col gap-y-10 px-10 py-10 bg-white grow">
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
                                    onClick={() => {setCurrencyId(method?.id); localStorage.setItem('currencyId', JSON.stringify(method?.id))}}
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

export default Checkout;
