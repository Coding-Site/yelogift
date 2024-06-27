import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';
import instance from '../../../axios';
import OrderPartCode from './OrderPartCode';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState<any>(null);
    const [orderProducts, setOrderProducts] = useState<any[]>([]);
    const [sendedCode, setSendedCode] = useState([]);
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;
    const [total, setTotal] = useState();
    const [price, setPrice] = useState();
    const [discount, setDiscount] = useState();

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    const navigate = useNavigate();

    console.log({
        order_id: id,
        order_codes: sendedCode,
    });

    const confirmOrderCodes = () => {
        console.log({
            order_id: id,
            order_codes: sendedCode,
        });
        instance
            .post(
                `/api/admin/orders/delivery/code`,
                {
                    order_id: id,
                    order_codes: sendedCode,
                },
                {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                }
            )
            .then(() => {
                setIsConfirmModalOpen(false);
                navigate('/admin/orders');
            })
            .catch((err) => console.log(err));
    };
    const cancelOrder = (id: any) => {
        instance
            .get(`/api/admin/orders/cancel/${id}`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then(() => {
                setIsConfirmModalOpen(false);
                navigate('/admin/orders');
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        instance
            .get(`/api/admin/orders/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then((d) => {
                const order = d.data.data;
                setDiscount(order.discount);
                setPrice(order.order.price);
                setTotal(order.total_price);
                setOrder(order);
                setOrderProducts(order.order.order_product);
            });
    }, []);

    return (
        <div className="flex flex-col gap-4 w-full py-10 container ps-12">
            <div className="flex items-center justify-start w-full relative ">
                <Link to="/admin/orders">
                    <FaChevronLeft className="text-main text-2xl absolute -left-7 font-semibold top-[50%] -translate-y-[50%]" />
                </Link>
                <span className="text-3xl text-white font-semibold">
                    Order <i className="text-main"> #{id} </i>
                </span>
            </div>

            <form className="flex flex-col text-white">
                <div className="flex  my-5 justify-between pe-5">
                    <span className="font-semibold text-xl"> Add Codes</span>
                </div>
                <table className="table-auto text-center">
                    <thead className="py-5">
                        <tr className="rounded-t-md bg-[#3D3D3D] ">
                            <td className="py-2 font-bold">Product</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Code</td>
                            <td>Total</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {orderProducts?.map((product: any, idx: any) => (
                            <OrderPartCode
                                key={idx}
                                setSendedCode={setSendedCode}
                                part={product}
                            />
                        ))}
                    </tbody>
                </table>

                <div className="w-full text-end flex justify-between items-center px-20">
                    <div className="flex flex-col items-start">
                        <span>Total : $ {price}</span>
                        <span>Discount : % {discount}</span>
                        <span className="mt-6">
                            <span className="text-main font-semibold">
                                TOTAL{' '}
                            </span>{' '}
                            : ${total}
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => setIsConfirmModalOpen(true)}
                            className="btn !rounded !w-[150px] !h-[50px] "
                        >
                            Confirm order
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsCancelModalOpen(true)}
                            className="bg-[red] !rounded !w-[150px] !h-[50px] "
                        >
                            Reject order
                        </button>
                    </div>
                </div>
                {order?.order?.invoice && (
                    <div className="flex flex-col mt-[20px] max-w-[500px] max-h-[500px]">
                        <p className="text-2xl mb-4">Invoice :</p>
                        <img
                            className=" mx-auto max-w-fit max-h-[100%] "
                            src={`${
                                import.meta.env.VITE_BASEURL
                            }/public/storage/${order?.order?.invoice}`}
                            alt="invoice"
                        />
                    </div>
                )}
            </form>
            <Modal
                isOpen={isConfirmModalOpen}
                onRequestClose={() => setIsConfirmModalOpen(false)}
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
                <h2 className="text-[20px] text-main">Confirm Order</h2>
                <p>Are you sure you want to confirm this order?</p>
                <div className="flex items-center gap-5 pt-5">
                    <button
                        onClick={confirmOrderCodes}
                        className="bg-[green] !rounded !w-[120px] !h-[35px]"
                    >
                        Yes, Confirm
                    </button>
                    <button
                        onClick={() => setIsConfirmModalOpen(false)}
                        className="bg-[#F0B90B] text-[black] !rounded !w-[120px] !h-[35px]"
                    >
                        No, Cancel
                    </button>
                </div>
            </Modal>

            <Modal
                isOpen={isCancelModalOpen}
                onRequestClose={() => setIsCancelModalOpen(false)}
                contentLabel="Cancel Order Modal"
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
                <h2 className="text-[20px] text-main">Reject Order</h2>
                <p>Are you sure you want to Reject this order?</p>
                <div className="flex items-center gap-5 pt-5">
                    <button
                        onClick={() => cancelOrder(id)}
                        className="bg-[red] !rounded !w-[120px] !h-[35px]"
                    >
                        Yes, Reject
                    </button>
                    <button
                        onClick={() => setIsCancelModalOpen(false)}
                        className="bg-[#F0B90B] text-[black] !rounded !w-[120px] !h-[35px]"
                    >
                        No, Go Back
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default OrderDetails;
