import { useEffect, useState } from 'react';
import Spinner from '../utils/Spinner';
import instance from '../axios';
import { useNavigate } from 'react-router-dom';
import { FiCopy } from 'react-icons/fi';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function OrdersHistory() {
    const [orders, setOrders] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

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
                console.log(d);
                console.log(d.data.data);
                setOrders(d.data.data);
                setLoading(false);
            });
    }, []);

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

    const openModal = (order: any) => {
        setSelectedOrder(order);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setModalIsOpen(false);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Code copied to clipboard!');
        });
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
                                    {order.status == 1 && (
                                        <button
                                            type="button"
                                            onClick={() => openModal(order)}
                                            className="bg-transparent border-2 border-white w-52 py-3 flex justify-center items-center text-white"
                                        >
                                            Order Details{' '}
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
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        zIndex: 1000,
                    },
                    content: {
                        color: '#F0B90B',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10000,
                        width: '50%',
                        maxWidth: '90%',
                        backgroundColor: '#1E2329',
                        borderColor: '#FCD535',
                        maxHeight: '95vh',
                        overflowY: 'auto',
                    },
                }}
            >
                <h2 className="text-2xl font-semibold mb-4 text-center text-white">
                    Order Details
                </h2>
                {selectedOrder && (
                    <div className="space-y-2">
                        <p className="text-lg text-gray-200 text-center">
                            {new Date(
                                selectedOrder.updated_at
                            ).toLocaleDateString()}
                        </p>
                        <p className="text-lg ">
                            <span className="font-semibold text-[#fff]">
                                Order Price:
                            </span>{' '}
                            {selectedOrder.price}{' '}
                            <span className=" text-[#fff]">USDT</span>
                        </p>
                        <p className="text-lg ">
                            <span className="font-semibold text-[#fff]">
                                Email:
                            </span>{' '}
                            {selectedOrder.email}
                        </p>
                        <p className="text-lg ">
                            <span className="font-semibold text-[#fff]">
                                Payment Method:
                            </span>{' '}
                            {selectedOrder.payment_method}
                        </p>
                        <p className="text-lg ">
                            <span className="font-semibold text-[#fff]">
                                Order ID:
                            </span>{' '}
                            {selectedOrder.id}
                        </p>
                        <div className="space-y-2">
                            {selectedOrder.order_product.map(
                                (product: any, idx: number) => (
                                    <div key={idx} className="p-1  rounded-lg">
                                        <p className="text-white font-semibold mb-2">
                                            {product.product_part.title}
                                        </p>
                                        <div className="space-y-1">
                                            {product.order_code.map(
                                                (
                                                    code: any,
                                                    codeIdx: number
                                                ) => (
                                                    <div
                                                        key={codeIdx}
                                                        className="flex items-center justify-between "
                                                    >
                                                        <span>
                                                            {code.decrypt_code}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                copyToClipboard(
                                                                    code.decrypt_code
                                                                )
                                                            }
                                                            className="ml-2 px-2 py-1 bg-[#F0B90B] text-white text-sm rounded hover:bg-[#f0b90bb0]"
                                                        >
                                                            <FiCopy size={16} />
                                                        </button>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}
                <button
                    onClick={closeModal}
                    className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Close
                </button>
            </Modal>
        </div>
    );
}

export default OrdersHistory;
