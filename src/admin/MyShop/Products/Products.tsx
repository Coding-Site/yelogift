import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { PiEye } from "react-icons/pi";
import { Link } from "react-router-dom";
import { ICard } from "../../../models/ICard";
import { GoPencil } from "react-icons/go";

function Products() {
  const  localstorage  = JSON.parse((localStorage.getItem("adminData")) as string);
  const adminToken = localstorage?.adminToken

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/admin/product`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then((data) => {
        setProducts(data.data.data);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full py-5 container">
      <div className="flex items-center justify-between w-full ">
        <span className="text-3xl text-white font-semibold">All Products</span>

        <Link to="/admin/products/add" className="btn !rounded-md !h-14">
          <AiOutlinePlus /> Add new product
        </Link>
      </div>

      <div className="flex flex-col gap-2 rounded-t-xl p-4  bg-white text-mainLightBlack">
        <div className="flex justify-between w-full py-5">
          <p className="font-medium text-xl">you have 325 card in total </p>
          <div className="flex relative">
            {/* <input
              type="text"
              className="rounded-full shadow-md border-2 border-gray-400 p-1 ps-7"
              placeholder="Search product"
            />
            <FiSearch className="absolute left-2 text-lg text-gray-400 top-[50%] -translate-y-[50%]" /> */}
            {/* <button className="bg-white px-4 py-2 rounded-md shadow-md">
              Filter
            </button> */}
          </div>
        </div>

        <table className="text-center table-auto border-separate">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Pic</th>
              <th>Description</th>
              <th>Price</th>
              <th>Descount</th>
              <th>Codes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((pro: ICard, idx) => (
              <tr key={idx} className="table-row py-5">
                <td className="font-semibold">{pro.id}</td>
                <td>{pro.name}</td>
                <td>{pro.name}</td>
                <td>
                  <img
                    className="size-10 mx-auto"
                    src={`${import.meta.env.VITE_BASEURL}/public/storage/${pro.image}`}
                    alt=""
                  />
                </td>
                <td>{pro.description}</td>
                <td className="text-green-600">{pro.price}</td>
                <td className="text-red-600">{pro.discount}</td>
                <td>
                  <Link   to="/">
                    <PiEye className="mx-auto text-3xl" />
                  </Link>
                </td>
                <td> <Link to={`/admin/products/edit/${pro.id}`}><GoPencil /></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
