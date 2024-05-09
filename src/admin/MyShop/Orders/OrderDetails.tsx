/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {  useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';
import axios from 'axios';

type Code = {
    order_product_id: number;
    code: string;
};
function OrderDetails() {
    const { id } = useParams();
    const [ setOrder] = useState<any>();
    const [orderProducts, setOrderProducts] = useState<any[]>([]);
    const [orderCodes, setOrderCodes] = useState<Code[]>([]);
    const [code, setCode] = useState('');
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;

    const addNewCode = (prodId: any, code: any) => {
        setOrderCodes((old: Code[]) => [
            ...old,
            { order_product_id: prodId, code },
        ]);

        setCode('');
    };

    const confirmOrderCodes = () => {
        axios.post(
                `${
                    import.meta.env.VITE_BASEURL
                }/api/admin/orders/delivery/code`,
                {
                    order_id: id,
                    order_codes: orderCodes,
                },{
                  headers: {
                    Authorization: `Bearer ${adminToken}`
                  }
                }
            )
            .then((d) => console.log(d))
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BASEURL}/api/admin/orders`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then((d) => {
                const orders = d.data.data;
                orders.forEach((or: any) => {
                    if (or.id == id) {
                        setOrder(or);
                        setOrderProducts(or.order_product);
                    }
                });
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

            {/* <pre>{JSON.stringify(order, null, 2)}</pre> */}

            <form className="flex flex-col text-white">
                <div className="flex  my-5 justify-between pe-5">
                    <span className="font-semibold text-xl"> Add Codes</span>
                    <div className="flex gap-3 ">
                        {/* Auto
                        <input
                            type="checkbox"
                            className="toggle toggle-primar checked:!bg-main  border-none"
                        />
                        Manual */}
                    </div>
                </div>

                <table className="table-auto text-center">
                    <thead className="py-5">
                        <tr className="rounded-t-md bg-[#3D3D3D] ">
                            <th className="py-2">Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Code</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderProducts?.map((product) => (
                            <tr className="h-[100px]">
                                <td>{product?.product?.name}</td>
                                <td>${product.price}</td>
                                <td>{product?.quantity}</td>
                                <td>
                                    {orderCodes.map((ordercode) => {
                                        if (
                                            ordercode.order_product_id ==
                                            product?.product?.id
                                        )
                                            return (
                                                <div className="flex flex-col gap-y-1">
                                                    <span>
                                                        {ordercode.code}
                                                    </span>
                                                </div>
                                            );
                                    })}

                                    <dialog id="my_modal_1" className="modal">
                                        <div className="modal-box">
                                            <input
                                                type="text"
                                                onChange={(e) =>
                                                    setCode(e.target.value)
                                                }
                                                value={code}
                                                className="rounded outline-none py-3 text-mainLightBlack border-gray-500 border-2 w-full px-4 "
                                                placeholder="Code here"
                                            />
                                            <div className="modal-action">
                                                <form method="dialog">
                                                    <button
                                                        className="btn"
                                                        onClick={() =>
                                                            addNewCode(
                                                                product.product
                                                                    .id,
                                                                code
                                                            )
                                                        }
                                                    >
                                                        Add
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            (document.getElementById('my_modal_1') as HTMLDialogElement).showModal();
                                        }}
                                        className="p-2 "
                                    >
                                        + Add Code
                                    </button>
                                </td>
                                <td>$ 50</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="w-full text-end flex justify-between">
                    <div className="flex flex-col items-start">
                        <span>Total : $64</span>
                        <span>Discount : %10</span>
                        <span className="mt-6">
                            <span className="text-main font-semibold">
                                TOTAL{' '}
                            </span>{' '}
                            : $55
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
