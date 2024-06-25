import { useEffect, useState } from 'react';
import Spinner from '../utils/Spinner';
import instance from '../axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function OrdersHistory() {
    const [orders, setOrders] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    // const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    // const [orderIdToDelete, setOrderIdToDelete] = useState<string | null>(null);
    const navigate = useNavigate();

    const localstorage = JSON.parse(localStorage.getItem('userData') as string);
    const userToken = localstorage?.userToken;
    useEffect(() => {
        setLoading(true);

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

    // const deleteOrder = () => {
    //     if (!orderIdToDelete) return;
    //     instance
    //         .delete(`/api/user/order/delete/${orderIdToDelete}`, {
    //             headers: {
    //                 Authorization: `Bearer ${userToken}`,
    //             },
    //         })
    //         .then(() => {
    //             setDeleteModalOpen(false);
    //             setOrderIdToDelete(null);
    //         })
    //         .catch((err) => console.log(err));
    // };

    const onPayNow = (order: any) => {
        localStorage.setItem('orderId', JSON.stringify(order.id));

        if (order.payment_method == 'cryptocurrancy') {
            localStorage.setItem(
                'currencyId',
                JSON.stringify(order.payment_id)
            );
            navigate('/paymentmanual');
        } else if (order.payment_method == 'binance') {
            localStorage.setItem('currencyId', JSON.stringify(0));
            navigate('/paymentauto');
        } else if (order.payment_method == 'pay') {
            navigate(
                `/product/${order?.order_product[0].product.id}/buy-now/${order?.order_product[0].order_id}`
            );
        }
    };

    return (
        <div className="flex py-10 w-full min-h-[100vh]">
            <div className="flex flex-col w-full">
                <div className="mb-5 ml-2 text-[25px]">Orders History</div>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="flex flex-col gap-y-3 w-full sm:w-[80%] sm:mx-auto p-5">
                        {orders.map((order: any, idx: any) => (
                            <div
                                className="relative flex flex-col sm:flex-row w-full justify-between bg-mainLightBlack gap-[10px] p-[25px] lg:px-[105px] lg:py-[35px]"
                                key={idx}
                            >
                                {/* {order.status == '0' &&
                                order.paymentstatus == '1' ? null : (
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full w-6 h-6 flex items-center justify-center"
                                    >
                                        &times;
                                    </button>
                                )} */}
                                {/* {!(
                                    order.status === '0' &&
                                    order.payment_status === '1'
                                ) && (
                                    <button
                                        onClick={() => {
                                            setOrderIdToDelete(order.id);
                                            setDeleteModalOpen(true);
                                        }}
                                        type="button"
                                        className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full w-6 h-6 flex items-center justify-center"
                                    >
                                        &times;
                                    </button>
                                )} */}
                                <div className="flex flex-col bg-white px-[15px] py-[6px] lg:p-10 w-full sm:w-1/2 rounded">
                                    {order?.order_product?.map(
                                        (order: any, idxx: any) => (
                                            <div
                                                className="flex py-2 gap-x-2 last:border-b-0 border-b-[1px] border-gray-500 max-w-full overflow-hidden"
                                                key={idxx}
                                            >
                                                <img
                                                    className="w-[74px] h-[45px] sm:w-14"
                                                    src={
                                                        import.meta.env
                                                            .VITE_BASEURL +
                                                        '/public/storage/' +
                                                        order.product.image
                                                    }
                                                    alt="order"
                                                />
                                                <div className="flex flex-col gap-y-2 w-full">
                                                    <p className="text-sm text-zinc-900 font-semibold text-nowrap">
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
                                    {order.payment_status == 0 && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onPayNow(order);
                                            }}
                                            className="bg-transparent border-2 border-white w-52 py-3 flex justify-center items-center text-white"
                                        >
                                            Pay Now
                                        </button>
                                    )}
                                    <span className="text-lg font-semibold">
                                        {order.status === '-1' ? (
                                            <span className="text-[red]">
                                                Rejected
                                            </span>
                                        ) : order.payment_status == 0 ? (
                                            <span className="text-[gray]">
                                                Pending
                                            </span>
                                        ) : order.status === '0' ? (
                                            <span className="text-main">
                                                InProgress
                                            </span>
                                        ) : (
                                            <span className="text-[green]">
                                                Confirmed
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* <Modal
                isOpen={deleteModalOpen}
                onRequestClose={() => setDeleteModalOpen(false)}
                contentLabel="Confirm Order Modal"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        zIndex: 1000,
                    },
                    content: {
                        color: 'lightsteelblue',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1001,
                        width: '60%',
                        maxWidth: '90%',
                        backgroundColor: '#1E2329',
                    },
                }}
            >
                <h2 className="text-[20px] text-[red]">Delete</h2>
                <p>Are you sure you want to delete this ?</p>
                <div className="flex items-center gap-5 pt-5">
                    <button
                        onClick={deleteOrder}
                        className="bg-[red] !rounded !w-[120px] !h-[35px]"
                    >
                        Yes, Confirm
                    </button>
                    <button
                        onClick={() => {
                            setOrderIdToDelete(null);
                            setDeleteModalOpen(false);
                        }}
                        className="bg-[#F0B90B] text-[black] !rounded !w-[120px] !h-[35px]"
                    >
                        No, Cancel
                    </button>
                </div>
            </Modal> */}
        </div>
    );
}

export default OrdersHistory;
