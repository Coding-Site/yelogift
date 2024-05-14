/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../utils/Spinner";

function OrdersHistory() {
  const [orders, setOrders] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const localstorage = JSON.parse(localStorage.getItem('userData') as string);
    const userToken = localstorage?.userToken;

    axios.get(`${import.meta.env.VITE_BASEURL}/api/user/order`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
      .then((d) => {
        console.log(d.data.data)
        setOrders(d.data.data)
        setLoading(false);
      })
  }, [])

  return (
    <div className="flex py-10 w-full container ">
      <div className="flex flex-col justify-between w-full gap-y-5">
        <div>Orders History</div>


        {loading ? (<Spinner />) : (

          <div className="flex flex-col gap-y-3 w-full bg-mainLightBlack p-5">
            <div className="flex gap-x-2 justify-start items-center">
              <span className="size-2 bg-mainWhite rounded-full"></span>
              <p>Delivered in 23 june</p>
            </div>
          
            {orders.map((order: any, idx: any) => (

              <div className="flex w-full justify-between" key={idx}>
                <div className="flex flex-col bg-white p-10 w-1/2 rounded">
                  {order?.order_product?.map((order: any, idxx: any) => (
                    <div className="flex py-2 gap-x-2  last:border-b-0 border-b-2 border-gray-500 " key={idxx}>
                      <img className="w-14" src={import.meta.env.VITE_BASEURL + '/storage/' + order.product.image} alt="order" />
                      <div className="flex flex-col gap-y-2">
                        <p className="text-zinc-900 font-semibold">{order.product.name}</p>
                        <div className="text-sm text-gray-500">
                          {order.quantity} x {order.price} SAR value
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-center items-center gap-y-2 w-1/2">
                  <button type="button" className="bg-transparent border-2 border-white w-52 py-3 flex justify-center items-center text-white">
                    { }Pay Now
                  </button>
                  <span className="text-lg font-semibold">

                    {
                      order.status == 0 ?
                        <span className="text-gray-600" >Pending</span> :
                        order.status == 1 ?
                          <span className="text-green-700"> Delivered </span> :
                          <span> Canceled</span>
                    }
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
