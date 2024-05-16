/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import OrderDetalisCard from '../components/OrderDetalisCard';
import { RiShareBoxLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PaymentAuto() {
    const localstorage = JSON.parse(localStorage.getItem('userData') as string);
    const userToken = localstorage?.userToken;
    const [binancePayData, setBinancePayData] = useState<any>({})


    useEffect(() => {
        const orderId = JSON.parse(localStorage.getItem('orderId') as string);
        axios
            .post(
                `${import.meta.env.VITE_BASEURL}/api/user/order/binance/pay`,
                {
                    order_id: orderId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            )
            .then((d) => {
                const data = d.data.data;
                setBinancePayData(data)
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className="flex flex-col py-10  w-full container text-mainLightBlack">
            <div className="flex flex-col sm:flex-row justify-between w-full gap-x-12 gap-y-4">

                <div className="flex justify-start flex-col px-10 py-10 sm:bg-white bg-[#222222] text-white sm:text-black grow w-full ">
                    <OrderDetalisCard order={binancePayData?.order} />
                </div>
                <div className="flex justify-start flex-col px-10 py-10 sm:bg-white bg-[#222222] text-white sm:text-black grow w-full h-[600px]">
                    <span className="text-2xl font-semibold mb-5">
                        {' '}
                        Payment{' '}
                    </span>

                    <div className="flex flex-col gap-y-7 items-center ">
                        <p>Scan this QR code in the Binance app</p>
                        <img src="assets/payment/qrcode.png" alt="QR code" />
                        <Link
                            to={binancePayData?.pay_data?.checkoutUrl}
                            className="btn -mb-[200px] flex gap-x-2 items-center w-[600%] !rounded  sm:!rounded-full py-5 !h-auto !bg-mainLightColor"
                        >
                            <RiShareBoxLine />
                            Pay on binance.com
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default PaymentAuto;
