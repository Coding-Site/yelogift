/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import OrderDetalisCard from '../components/OrderDetalisCard';
import { RiShareBoxLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import instance from '../axios';
import Spinner from '../utils/Spinner';

function PaymentAuto() {
    const localstorage = JSON.parse(localStorage.getItem('userData') as string);
    const userToken = localstorage?.userToken;
    const [loading, setLoading]= useState(false);    
    const [binancePayData, setBinancePayData] = useState<any>({})
    const [orderDetails, setOrderDetails] = useState<any>({})
    const [order, setOrder] = useState<any>({})


    useEffect(() => {
        setLoading(true)
        const orderId = JSON.parse(localStorage.getItem('orderId') as string);
        instance
            .post(
                `/api/user/order/binance/pay`,
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
                setLoading(false)
                console.log('dafvsdfv');
                const data = d.data.data;
                setOrder(data.order)
                setBinancePayData(data.pay_data.data)
                const od = {
                    prepayId: data.pay_data.data.prepayId,
                    email: data.order.email
                }
                setOrderDetails(od);

            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className="flex flex-col py-10  w-full container text-mainLightBlack">
            {loading ? (<Spinner />) : (

            <div className="flex flex-col sm:flex-row justify-between w-full gap-x-12 gap-y-4">

                <div className="flex justify-start flex-col px-10 py-10 sm:bg-white bg-[#222222] text-white sm:text-black grow w-full ">
                    <OrderDetalisCard orderDetails={orderDetails} order={order} />
                </div>
                <div className="flex justify-start flex-col px-10 py-10 sm:bg-white bg-[#222222] text-white sm:text-black grow w-full h-[600px]">
                    <span className="text-2xl font-semibold mb-5">
                        {' '}
                        Payment{' '}
                    </span>

                    <div className="flex flex-col gap-y-7 items-center ">
                        <p>Scan this QR code in the Binance app</p>
                        <img src={binancePayData?.qrcodeLink} className='max-w-[230px]' alt="QR code" />
                        <Link
                            to={binancePayData?.checkoutUrl}
                            className="btn -mb-[200px] flex gap-x-2 items-center w-[600%] !rounded  sm:!rounded-full py-5 !h-auto !bg-mainLightColor"
                        >
                            <RiShareBoxLine />
                            Pay on binance.com
                        </Link>
                    </div>

                </div>
            </div>
            )}

        </div>
    );
}

export default PaymentAuto;
