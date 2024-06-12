import { useEffect, useState } from 'react';
import Spinner from '../utils/Spinner';
import instance from '../axios';
// import { useNavigate } from 'react-router-dom';

function OrdersHistory() {
    const [orders, setOrders] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const localstorage = JSON.parse(
            localStorage.getItem('userData') as string
        );
        const userToken = localstorage?.userToken;

        instance
            .get(`/api/user/order`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
            .then((d) => {
                setOrders(d.data.data);
                setLoading(false);
            });
    }, []);

    // const onCheckout = (orderId: any) => {
    //     localStorage.setItem('orderId', JSON.stringify(orderId));
    //     navigate('/checkout');
    // };

    return (
        <div className="flex py-10 w-full  min-h-[100vh] ">
            <div className="flex flex-col  w-full ">
                <div className="mb-5 ml-2 text-[25px]">Orders History</div>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="flex flex-col gap-y-3 w-full sm:w-[80%] sm:mx-auto p-5">
                        {orders.map((order: any, idx: any) => (
                            <div
                                className="flex flex-col sm:flex-row w-full justify-between bg-mainLightBlack gap-[10px] p-[25px] lg:px-[105px] lg:py-[35px]"
                                key={idx}
                            >
                                <div className="flex flex-col bg-white px-[15px] py-[6px] lg:p-10 w-full  sm:w-1/2 rounded w-full">
                                    {order?.order_product?.map(
                                        (order: any, idxx: any) => (
                                            <div
                                                className="flex py-2 gap-x-2  last:border-b-0 border-b-[1px] border-gray-500 max-w-full overflow-hidden"
                                                key={idxx}
                                            >
                                                <img
                                                    className=" w-[74px] h-[45px] sm:w-14"
                                                    src={
                                                        import.meta.env
                                                            .VITE_BASEURL +
                                                        '/public/storage/' +
                                                        order.product.image
                                                    }
                                                    alt="order"
                                                />
                                                <div className="flex flex-col gap-y-2 w-full">
                                                    <p className="text-sm text-zinc-900 font-semibold text-nowrap ">
                                                        {order.product.name}
                                                    </p>
                                                    <div className="text-sm text-gray-500">
                                                        {order.quantity} x{' '}
                                                        {order.price} USDT
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className="flex flex-col justify-center items-center gap-y-2 w-full sm:w-1/2 py-2">
                                    {/* {order.status == 0 && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onCheckout(order.id);
                                            }}
                                            className="bg-transparent border-2 border-white w-52 py-3 flex justify-center items-center text-white"
                                        >
                                            Check out
                                        </button>
                                    )} */}
                                    <span className="text-lg font-semibold">
                                        {order.status == 0 ? (
                                            <span className="text-gray-600">
                                                Pending
                                            </span>
                                        ) : order.status == 1 ? (
                                            <span className="text-green-700">
                                                {' '}
                                                Delivered{' '}
                                            </span>
                                        ) : (
                                            <span> Canceled</span>
                                        )}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrdersHistory;
