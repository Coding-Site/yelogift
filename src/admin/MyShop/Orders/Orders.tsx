/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IOrder } from '../../../models/IOrder';
import Status from './Status';
import { Link } from 'react-router-dom';
import { GoPencil } from 'react-icons/go';
import Spinner from '../../../utils/Spinner';
import instance from '../../../axios';



function Orders() {
    const [loading, setLoading] = useState(false);
    const [allOrdersLength, setallOrdersLength] = useState<number>();
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [pendingOrders, setPendingOrders] = useState<IOrder[]>([]);
    const [confirmedOrders, setConfirmedOrders] = useState<IOrder[]>([]);
    const [cancelledOrders, setCancelledOrders] = useState<IOrder[]>([]);
    const [filterTap, setFilterTap] = useState('all');
    const localstorage = JSON.parse(localStorage.getItem('adminData') as string);
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
                setallOrdersLength(orders.length)

                orders.map((order: any) => {
                    if (order.status == '0') {
                        setPendingOrders((old) => [...old, order]);
                    } else if (order.status == '1') {
                        setConfirmedOrders((old) => [...old, order]);
                    } else {
                        setCancelledOrders((old) => [...old, order]);
                    }
                });

                setFilterTap('all');
                setOrders(orders);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setLoading(true);
        setOrders(() => {
            if (filterTap == 'all') {
                setLoading(false);
                return orders;
            } else if (filterTap == 'pending') {
                setLoading(false);
                return pendingOrders;
            } else if (filterTap == 'confirmed') {
                setLoading(false);
                return confirmedOrders;
            } else {
                setLoading(false);
                return cancelledOrders;
            }
        });
    }, [filterTap]);

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
                    <span>Pending Orders</span>
                    <span className="text-center text-3xl text-[#C19712]">
                        {pendingOrders.length}
                    </span>
                </div>
                <div className="flex bg-[#FFD2C4] h-full rounded px-4 py-3 flex-col justify-between grow">
                    <span>Delievered Orders</span>
                    <span className="text-center text-3xl text-[#D64E23]">
                        {confirmedOrders.length}
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-2 rounded-t-3xl p-4  bg-white text-mainLightBlack">
                <div className="flex justify-between w-full text-center border-b font-bold py-3">
                    <span
                        className={`cursor-pointer grow ${filterTap == 'all' ? 'text-main' : ''
                            }`}
                        onClick={() => setFilterTap('all')}
                    >
                        All Orders
                    </span>
                    <span
                        className={`cursor-pointer grow ${filterTap == 'pending' ? 'text-main' : ''
                            }`}
                        onClick={() => setFilterTap('pending')}
                    >
                        Pending orders
                    </span>
                    <span
                        className={`cursor-pointer grow ${filterTap == 'confirmed' ? 'text-main' : ''
                            }`}
                        onClick={() => setFilterTap('confirmed')}
                    >
                        Delivered orders
                    </span>
                    <span
                        className={`cursor-pointer grow ${filterTap == 'cancelled' ? 'text-main' : ''
                            }`}
                        onClick={() => setFilterTap('cancelled')}
                    >
                        Cancelled orders
                    </span>
                </div>

                {loading ? (<Spinner />) : (

                    <table className="text-center table-auto border-collapse">
                        <thead className="">
                            <tr className='border-b-[30px] border-transparent text-gray-400'>
                                <td>Order ID</td>
                                <td>Order Date</td>
                                <td>Product Name</td>
                                <td>Product Price</td>
                                {/* <td>Selling type</td> */}
                                <td>Status</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, idx) => {
                                // return order.payment_status == 0  ?  null :
                                return <tr key={idx} className='border-b-[20px] border-transparent  even:bg-gray-50'>
                                        <td className="font-semibold">#{order.id}</td>
                                        <td>
                                            {' '}
                                            {order.created_at.slice(0, order.created_at.indexOf('T')).replace(/-/g, '/')}
                                        </td>
                                        <td> {order?.order_product[0]?.product?.name}</td>

                                        <td className="text-green-600 font-semibold">
                                            {' '}
                                            ${order.price}
                                        </td>
                                        {/* <td className="text-green-600 font-semibold">
                                           {' '}
                                           {JSON.stringify(order, null, 2)}
                                       </td> */}
                                        <td className='text-xs'>
                                            'ps' = {order.payment_status}
                                            's' = {order.status}
                                            <Status
                                                paymentstatus={order.payment_status.toString()}
                                                status={order.status.toString()}
                                            />{' '}

                                        </td>

                                        <td>
                                            {' '}
                                            <Link to={`/admin/orders/${order.id}`}>
                                                <GoPencil />
                                            </Link>
                                        </td>
                                    </tr>
                                
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Orders;
