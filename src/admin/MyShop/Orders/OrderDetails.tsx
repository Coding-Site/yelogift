/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';
import instance from '../../../axios';
import OrderPartCode from './OrderPartCode';

function OrderDetails() {
    const { id } = useParams();
    const [, setOrder] = useState<any>();
    const [orderProducts, setOrderProducts] = useState<any[]>([]);
    const [sendedCode, setSendedCode] = useState([]);
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;
    const [total, setTotal] = useState();
    const [price, setPrice] = useState();
    const [discount, setDiscount] = useState();
    const confirmOrderCodes = () => {
        console.log(id, sendedCode);
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
            .then((d) => console.log(d))
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
                    {/* <div className="flex gap-3 ">
                        Auto
                        <input
                            type="checkbox"
                            className="toggle toggle-primar checked:!bg-main  border-none"
                        />
                        Manual
                    </div> */}
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
                        {orderProducts?.map((product) => (
                            <OrderPartCode
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
                    <button
                        type="button"
                        onClick={() => confirmOrderCodes()}
                        className="btn !rounded !w-[150px] !h-[50px] "
                    >
                        {' '}
                        Confirm order
                    </button>
                </div>
            </form>
        </div>
    );
}

export default OrderDetails;
