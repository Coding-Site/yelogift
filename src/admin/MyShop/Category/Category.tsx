/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { ICategory } from "../../../models/ICategory";
import { FaRegTrashAlt } from "react-icons/fa";
import Spinner from "../../../utils/Spinner";
import instance from "../../../axios";

function Category() {
  const [loading, setLoading] = useState(false);
  const localstorage = JSON.parse(localStorage.getItem("adminData") as string);
  const adminToken = localstorage?.adminToken;
  const navigate = useNavigate()
  const [categories, setCategories] = useState([]);

  const handleDelete = (id: any) => {
    setLoading(true)
    axios.get(`${import.meta.env.VITE_BASEURL}/api/admin/category/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    })
      .then(() => { setLoading(false); navigate(0) })
  }
  useEffect(() => {
    setLoading(true);
    instance
      .get(`/api/admin/category`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then((data) => {
        setCategories(data.data.data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full py-5 container">
      <div className="flex items-center justify-between w-full pt-10 pb-5 ">
        <span className="text-3xl text-white font-semibold">All Categories</span>

        <Link to="/admin/category/add" className="btn !rounded-md !h-12">
          <AiOutlinePlus /> Add new category
        </Link>
      </div>

      {loading ? (<Spinner />) : (
        <div className="flex flex-col gap-2 rounded-t-xl p-4  bg-white text-mainLightBlack">
          <table className="text-center table-auto">
            <thead>
              <tr className="border-y-4 border-transparent">
                <th>ID</th>
                <th>Name</th>
                <th>Icon</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat: ICategory, idx) => (
                <tr key={idx}>
                  <td className="font-semibold">{cat.id}</td>
                  <td>{cat.name}</td>
                  <td>
                    <img
                      className="size-10 mx-auto"
                      src={`${import.meta.env.VITE_BASEURL}/storage/${cat.icon}`}
                      alt=""
                    />
                  </td>

                  <td>

                    <FaRegTrashAlt className="mx-auto text-3xl cursor-pointer" onClick={() => handleDelete(cat.id)} />

                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Category;
