import { useEffect, useState } from 'react';
import Spinner from '../utils/Spinner';
import instance from '../axios';
import { useNavigate } from 'react-router-dom';
import { FiCopy } from 'react-icons/fi';
import Modal from 'react-modal';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            toast.success('Copied', {
                autoClose: 700,
            });
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
                        width: '40%',
                        maxWidth: '90%',
                        backgroundColor: 'transparent',
                        overflowY: 'hidden',
                        border: 'none',
                        padding: '0',
                    },
                }}
            >
                <div className="py-4 sm:p-4 w-full  relative  max-h-[90vh] min-h-[50vh] overflow-y-auto	pop ">
                    <div className="bg-main w-full h-[20px] rounded-[30px] flex items-center justify-center  absolute top-[4px] left-[0]">
                        <div className="bg-[black] rounded-[30px] h-[40%] w-[90%]"></div>
                    </div>
                    <div className="z-2  relative w-full  bg-[#051B29]  rounded-t-[25px] flex flex-col items-center  min-h-fit	 overflow-hidden zigzag_b pb-9 ">
                        <div className="bg-[black] h-[8px] w-full"></div>
                        <img
                            src="/assets/Logo/Asset-1.png"
                            alt="logo"
                            className="w-[55%] my-[15px]"
                        />
                        <div className=" flex flex-col justify-center items-center w-full ">
                            {selectedOrder && (
                                <div className="w-full flex flex-col justify-center items-center ">
                                    <p className="text-[#fff] mx-auto">
                                        date :{' '}
                                        {new Date(
                                            selectedOrder.updated_at
                                        ).toLocaleDateString()}
                                    </p>
                                    <div className="w-full px-[5px] sm:px-[30px] ">
                                        {selectedOrder.order_product.map(
                                            (product: any, idx: number) => (
                                                <div
                                                    key={idx}
                                                    className="p-1  rounded-lg "
                                                >
                                                    <p className="text-white font-semibold mb-2">
                                                        {
                                                            product.product_part
                                                                .title
                                                        }
                                                    </p>
                                                    <div className="w-full ">
                                                        {product.order_code.map(
                                                            (
                                                                code: any,
                                                                codeIdx: number
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        codeIdx
                                                                    }
                                                                    className="flex items-center justify-between mb-[11px] "
                                                                >
                                                                    <span className="font-[700] border  rounded-lg w-full px-[10px] min-h-[30px] flex items-center  break-all">
                                                                        {
                                                                            code.decrypt_code
                                                                        }
                                                                    </span>
                                                                    <button
                                                                        onClick={() =>
                                                                            copyToClipboard(
                                                                                code.decrypt_code
                                                                            )
                                                                        }
                                                                        className="ml-2 px-2 py-1 bg-[#F0B90B] text-white rounded hover:bg-[#f0b90bb0]"
                                                                    >
                                                                        <FiCopy className="text-[16px]" />
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
                            {selectedOrder && (
                                <div className="px-[5px] sm:px-[30px] w-full">
                                    <p className="mx-auto text-center  text-[19px] font-[700]">
                                        Order details
                                    </p>
                                    <div className="mb-[8px]">
                                        <p className="text-[11px]">
                                            Email address
                                        </p>
                                        <p className="text-[#fff] text-[13px] sm:text-[17px] mt-[-5px]  break-all">
                                            {selectedOrder.email}
                                        </p>
                                    </div>
                                    <div className="mb-[8px]">
                                        <p className="text-[11px]">
                                            Payment method
                                        </p>
                                        <p className="text-[#fff] text-[13px] sm:text-[17px] mt-[-5px]">
                                            {selectedOrder.payment_method}
                                        </p>
                                    </div>
                                    <div className="mb-[8px]">
                                        <p className="text-[11px]">Order id</p>
                                        <p className="text-[#fff] text-[13px] sm:text-[17px] mt-[-5px]">
                                            {selectedOrder.id}
                                        </p>
                                    </div>
                                    <hr className="bg-main my-[2px]" />
                                    <div className="flex justify-between items-center">
                                        <p>Total </p>
                                        <p className="text-[#fff]">
                                            {' '}
                                            {selectedOrder.price} $
                                        </p>
                                    </div>

                                    <IoIosCheckmarkCircle className="text-[65px] text-[#43d643] mx-auto my-[10px]" />
                                </div>
                            )}

                            <p>Thank you for shopping!</p>
                        </div>
                    </div>
                </div>
            </Modal>
            <ToastContainer />
        </div>
    );
}

export default OrdersHistory;
