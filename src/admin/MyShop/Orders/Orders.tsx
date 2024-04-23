import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useToken } from "../../../hooks/useToken";
import { Link } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import DateFormat from "../../../utils/Date";
import Status from "./Status";



function Orders() {
  const { token } = useToken()
  const [orders, setOrders] = useState([])
  const [pendingOrders, setPendingOrders] = useState([])
  const [confirmedOrders, setConfirmedOrders] = useState([])
  const [cancelledOrders, setCancelledOrders] = useState([])
  const [filterTap, setFilterTap] = useState('all');

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/admin/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        const orders = data.data.data;
        orders.map((order) => {
         if( order.status == "0") setPendingOrders(old => [...old, order])
         if( order.status == "1") setConfirmedOrders(old => [...old, order])
         if( order.status == "-1") setCancelledOrders(old => [...old, order])
        })
        setOrders(orders);
        console.log(orders)
        console.log(orders)
        console.log(orders)
      });
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full py-10 container">
      <div className="flex items-center justify-between w-full ">
        <span className="text-3xl text-white font-semibold">
           Orders
        </span>
      </div>

      <div className="flex w-full text-mainLightBlack h-[130px] gap-5 font-semibold text-2xl">
        <div className="flex bg-[#E2F1FF] h-full rounded px-4 py-3 flex-col justify-between grow">
          <span>New Orders</span>
          <span className="text-center text-3xl text-[#234168]">264</span>
        </div>
        <div className="flex bg-[#FFF3BA] h-full rounded px-4 py-3 flex-col justify-between grow">
          <span>New Orders</span>
          <span className="text-center text-3xl text-[#C19712]">264</span>
        </div>
        <div className="flex bg-[#FFD2C4] h-full rounded px-4 py-3 flex-col justify-between grow">
          <span>New Orders</span>
          <span className="text-center text-3xl text-[#D64E23]">264</span>
        </div>
      </div>



      <div className="flex flex-col gap-2 rounded-t-3xl p-4  bg-white text-mainLightBlack">
        <div className="flex justify-between w-full text-center border-b  py-3">
          <span className={`cursor-pointer grow ${filterTap == 'all' ? 'text-main': ''}`} onClick={() => setFilterTap('all')}>All Orders</span>
          <span className={`cursor-pointer grow ${filterTap == 'pending' ? 'text-main': ''}`} onClick={() => setFilterTap('pending')}>Pending orders</span>
          <span className={`cursor-pointer grow ${filterTap == 'delievered' ? 'text-main': ''}`} onClick={() => setFilterTap('delievered')}>Delivered orders</span>
          <span className={`cursor-pointer grow ${filterTap == 'cancelled' ? 'text-main': ''}`} onClick={() => setFilterTap('cancelled')}>Cancelled orders</span>
        </div>
        <table className="text-center table-auto">
          <thead className=" !font-normal">
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Buyer Name</th>
              <th>Price</th>
              <th>Selling type</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any, idx) => (
              <tr key={idx}>
                <td className="font-semibold">{order.id}</td>
                <td>  <DateFormat date={order.created_at} /></td>
                <td>  {order.name}</td>
                
                <td className="text-green-600 font-semibold"> $ {order.price}</td>
                <td className="text-green-600 font-semibold"> slling type</td>
                <td > <Status status={order.status} /></td>
                
                <td> <Link to={`/orders/${order.id}`}><GoPencil  /></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
