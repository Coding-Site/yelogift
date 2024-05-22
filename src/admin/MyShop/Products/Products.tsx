/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { PiEye } from "react-icons/pi";
import { Link } from "react-router-dom";
import { ICard } from "../../../models/ICard";
import { GoPencil } from "react-icons/go";
// import { FiSearch } from "react-icons/fi";
import { IProduct } from "../../../models/IProduct";
import Spinner from "../../../utils/Spinner";
import instance from "../../../axios";

function Products() {
  const localstorage = JSON.parse((localStorage.getItem("adminData")) as string);
  const adminToken = localstorage?.adminToken
  const [loading, setLoading] = useState(false);
  const [Allproducts, setAllProducts] = useState<IProduct[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [term, setTerm] = useState('');

  useEffect(() => {

    const filteredPRoducts = products.filter((pro) => (pro?.name.toLowerCase().startsWith(term)) || pro?.name.toLowerCase().includes(term)) 
    setProducts(() => term ? filteredPRoducts : Allproducts);
    setLoading(false)


  }, [term])



  useEffect(() => {
    setLoading(true)
    instance
      .get(`/api/admin/product`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then((data) => {
        setProducts(data.data.data);
        setAllProducts(data.data.data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full py-5 container">
      <div className="flex items-center justify-between w-full pt-10 pb-5 ">
        <span className="text-3xl text-white font-semibold">All Products</span>

        <Link to="/admin/products/add" className="btn !rounded-md !h-12">
          <AiOutlinePlus /> Add new product
        </Link>
      </div>

      <div className="flex flex-col gap-2 rounded-t-xl p-4  bg-white text-mainLightBlack">
        <div className="flex justify-between w-full py-5 ps-4">
          <p className="font-medium text-xl">You have {products.length} card in total </p>
          <div className="flex relative">
            <input
              type="text"
              className="rounded-full shadow-md border-2 border-gray-400 p-1 ps-7"
              placeholder="Search product"
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (<Spinner />) : (

          <table className="text-center table-auto border-collapse">
            <thead>
              <tr className="border-b-[30px] border- border-transparent font-medium">
                <td>ID</td>
                <td>Name</td>
                <td>Category</td>
                <td>Pic</td>
                <td>Description</td>
                <td>Price</td>
                <td>Discount</td>
                <td>Parts</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {products.map((pro: ICard, idx) => (
                <tr key={idx} className="table-row border-b-2 border-transparent font-medium">
                  <td className="font-bold">#{pro.id}</td>
                  <td className="w-36">{pro.name}</td>
                  <td>{pro?.category?.name}</td>
                  <td>
                    <img
                      className="size-12 mx-auto"
                      src={`${import.meta.env.VITE_BASEURL}/storage/${pro.image}`}
                      alt=""
                    />
                  </td>
                  <td className="text-xs text-wrap max-w-44 w-44">{pro.description.slice(0, 10)} </td>
                  <td className="text-green-600">${pro.price}</td>
                  <td className="text-red-600">{pro.discount}%</td>
                  <td>
                    <Link to={`/admin/products/${pro.id}/parts/`}>
                      <PiEye className="mx-auto text-3xl" />
                    </Link>
                  </td>
                  <td> <Link to={`/admin/products/edit/${pro.id}`}><GoPencil /></Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Products;
