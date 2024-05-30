/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { IOrder } from '../../../models/IOrder';
import Status from './Status';
import { Link } from 'react-router-dom';
import { GoPencil } from 'react-icons/go';
import Spinner from '../../../utils/Spinner';
import instance from '../../../axios';

function Orders() {
    const [loading, setLoading] = useState(false);
    const [allOrdersLength, setAllOrdersLength] = useState<number>(0);
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
    const [filterTap, setFilterTap] = useState('all');
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;

    useEffect(() => {
        setLoading(true);
        instance
            .get(`/api/admin/orders`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then((d) => {
                const orders: IOrder[] = d.data.data;
                const filteredOrders = orders.filter(
                    (order: any) => order.payment_status !== '0'
                );
                setAllOrdersLength(filteredOrders.length);

                setOrders(filteredOrders);
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        setLoading(true);
        const updatedOrders = orders.filter((order) => {
            if (filterTap === 'all') {
                return true;
            } else if (filterTap === 'pending') {
                return order.status === '0';
            } else if (filterTap === 'confirmed') {
                return order.status === '1';
            }
            return false;
        });

        setFilteredOrders(updatedOrders);
        setLoading(false);
    }, [filterTap, orders]);

    return (
        <div className="flex flex-col gap-8 w-full py-10 container">
            <div className="flex items-center justify-between w-full ">
                <span className="text-3xl text-white font-semibold">
                    Orders
                </span>
            </div>

            <div className="flex w-full text-mainLightBlack h-[130px] gap-5 font-semibold text-2xl">
                <div className="flex bg-[#E2F1FF] h-full rounded px-4 py-3 flex-col justify-between grow">
                    <span>All Orders</span>
                    <span className="text-center text-3xl text-[#234168]">
                        {allOrdersLength}
                    </span>
                </div>
                <div className="flex bg-[#FFF3BA] h-full rounded px-4 py-3 flex-col justify-between grow">
                    <span>In Progress Orders</span>
                    <span className="text-center text-3xl text-[#C19712]">
                        {orders.filter((order) => order.status === '0').length}
                    </span>
                </div>
                <div className="flex bg-[#FFD2C4] h-full rounded px-4 py-3 flex-col justify-between grow">
                    <span>Delivered Orders</span>
                    <span className="text-center text-3xl text-[#D64E23]">
                        {orders.filter((order) => order.status === '1').length}
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-2 rounded-t-3xl p-4 bg-white text-mainLightBlack">
                <div className="flex justify-between w-full text-center border-b font-bold py-3">
                    <span
                        className={`cursor-pointer grow ${
                            filterTap === 'all' ? 'text-main' : ''
                        }`}
                        onClick={() => setFilterTap('all')}
                    >
                        All Orders
                    </span>
                    <span
                        className={`cursor-pointer grow ${
                            filterTap === 'pending' ? 'text-main' : ''
                        }`}
                        onClick={() => setFilterTap('pending')}
                    >
                        In Progress orders
                    </span>
                    <span
                        className={`cursor-pointer grow ${
                            filterTap === 'confirmed' ? 'text-main' : ''
                        }`}
                        onClick={() => setFilterTap('confirmed')}
                    >
                        Delivered orders
                    </span>
                </div>

                {loading ? (
                    <Spinner />
                ) : (
                    <table className="text-center table-auto border-collapse">
                        <thead>
                            <tr className="border-b-[30px] border-transparent text-gray-400">
                                <td>Order ID</td>
                                <td>Order Date</td>
                                <td>Product Name</td>
                                <td>Product Price</td>
                                <td>Status</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order: any, idx: any) => (
                                <tr
                                    key={idx}
                                    className="border-b-[20px] border-transparent even:bg-gray-50"
                                >
                                    <td className="font-semibold">
                                        #{order.id}
                                    </td>
                                    <td>
                                        {order.created_at
                                            .slice(
                                                0,
                                                order.created_at.indexOf('T')
                                            )
                                            .replace(/-/g, '/')}
                                    </td>
                                    <td>
                                        {order?.order_product[0]?.product?.name}
                                    </td>
                                    <td className="text-green-600 font-semibold">
                                        ${order.price}
                                    </td>
                                    <td className="text-xs">
                                        <Status
                                            paymentstatus={order.payment_status.toString()}
                                            status={order.status.toString()}
                                        />
                                    </td>
                                    <td>
                                        {order.status !== '1' && (
                                            <Link
                                                to={`/admin/orders/${order.id}`}
                                            >
                                                <GoPencil />
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Orders;
