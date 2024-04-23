import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useToken } from "../../../hooks/useToken";
import { FaTrashAlt } from "react-icons/fa";

type Inputs = {
  order_product_id: number;
  code: string;
};

function OrderDetails() {
  const { id } = useParams();
  const { token } = useToken();
  const [order, setOrder] = useState();
  const [orderProducts, setOrderProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    unregister,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    // api/admin/orders/delivery/code

    console.log(data);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/admin/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((d) => {
        const orders = d.data.data;
        orders.map((order) => {
          if (order.id == id) {
            setOrder(order);
            setOrderProducts(order.order_products);
          } else {
            setOrder(null);
            setOrderProducts([]);
          }
        });
      });
  }, [order]);

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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col text-white"
      >
        <div className="flex  my-5 justify-between pe-5">
          <span className="font-semibold text-xl"> Add Codes</span>
          <div className="flex gap-3 ">
            Auto
            <input
              type="checkbox"
              className="toggle toggle-primar checked:!bg-main  border-none"
            />
            Manual
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orderProducts.map((product) => (
              <tr className="h-[100px]">
                <td>{product.product.name}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <input
                    type="text"
                    className="font-normal text-sm ps-2 py-1 outline-none bg-transparent border border-gray-300 rounded"
                  />
                </td>
                <td>$ 50</td>
                <td>
                  <FaTrashAlt className="text-gray-700" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="w-full text-end flex justify-between">
          <div className="flex flex-col items-start">
            <span>Total : $64</span>
            <span>Discount : %10</span>
            <span className="mt-6">
              <span className="text-main font-semibold">TOTAL </span> : $55
            </span>
          </div>
          <button type="submit" className="btn !rounded !w-[150px] !h-[50px] ">
            {" "}
            Confirm order
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrderDetails;
