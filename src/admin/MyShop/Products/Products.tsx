import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

function Products() {
    const { getItem  } = useLocalStorage();

    const [products, setProducts] = useState([]);


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASEURL}/api/admin/products`, {
            headers: {
                'Authorization': getItem('user')
            }
        })
        .then((data) => { console.log(data.data); setProducts(data.data.data)});
    }, [])

  return (
    <div className="flex flex-col gap-4 w-full py-5 container">
      <div className="flex items-center justify-between w-full ">
        <span className="text-3xl text-white font-semibold">All Products</span>

        <button className="btn !rounded-md !h-14">
          <AiOutlinePlus /> Add new product
        </button>
      </div>

      <div className="flex rounded-t-xl p-4  bg-white text-mainLightBlack">
        <div className="flex justify-between w-full">
          <p className="font-medium">you have 325 card in total </p>
          <div className="flex relative">
            <input
              type="text"
              className="rounded-full shadow-md border-2 border-gray-400 p-1 ps-7"
              placeholder="Search product"
            />
            <FiSearch className="absolute left-2 text-lg text-gray-400 top-[50%] -translate-y-[50%]" />
            <button className="bg-white px-4 py-2 rounded-md shadow-md">Filter</button>
          </div>
        </div>

        <pre>
            {JSON.stringify(products, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default Products;
