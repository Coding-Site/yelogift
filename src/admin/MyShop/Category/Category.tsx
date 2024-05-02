/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ICategory } from "../../../models/ICategory";
import { PiEye } from "react-icons/pi";
import { GoPencil } from "react-icons/go";

function Category() {
  const localstorage = JSON.parse(localStorage.getItem("adminData") as string);
  const adminToken = localstorage?.adminToken;

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/admin/category`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then((data) => {
        setCategories(data.data.data);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full py-5 container">
      <div className="flex items-center justify-between w-full ">
        <span className="text-3xl text-white font-semibold">
          All Categories
        </span>

        <Link to="/admin/category/add" className="btn !rounded-md !h-14">
          <AiOutlinePlus /> Add Category
        </Link>
      </div>

      <div className="flex flex-col gap-2 rounded-t-xl p-4  bg-white text-mainLightBlack">
        <table className="text-center table-auto">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Icon</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((pro: ICategory, idx) => (
              <tr key={idx}>
                <td className="font-semibold">{pro.id}</td>
                <td>{pro.name}</td>
                <td>
                  <img
                    className="size-10 mx-auto"
                    src={`https://yelogift.coding-site.com/public/storage/${pro.icon}`}
                    alt=""
                  />
                </td>
               
                <td>
                  <Link to="/">
                    <PiEye className="mx-auto text-3xl" />
                  </Link>
                </td>
                <td>
                  <Link to="/">
                    <GoPencil />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Category;
