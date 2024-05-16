/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import OrderDetalisCard from '../components/OrderDetalisCard';
import { RiShareBoxLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PaymentAuto() {
    const localstorage = JSON.parse(localStorage.getItem('userData') as string);
    const userToken = localstorage?.userToken;
    const [binancePayData,  setBinancePayData] = useState<any>({})
   

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
        <div className="flex py-10 w-full container text-mainLightBlack">
            <div className="flex justify-between w-full gap-3">
                <div className="flex justify-start flex-col px-10 py-10 bg-white grow w-1/2">
                    <OrderDetalisCard order={binancePayData?.order} />
                </div>
                <div className="flex justify-start flex-col px-10 py-10 bg-white grow w-1/2">
                    <span className="text-2xl font-semibold mb-5">
                        {' '}
                        Payment{' '}
                    </span>

                    <div className="flex flex-col gap-y-2 items-center ">
                        <p>Scan this QR code in the Binance app</p>
                        <img
                            className="w-60"
                            src={binancePayData?.pay_data?.qrcodeLink}
                            alt="QR code"
                        />
                        <Link
                            to={binancePayData?.pay_data?.checkoutUrl}
                            className="btn -mb-[200px] flex gap-x-2 items-center !rounded-full py-5 !h-auto !bg-mainLightColor"
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
