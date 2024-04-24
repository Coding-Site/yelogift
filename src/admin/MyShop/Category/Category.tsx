/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useToken } from "../../../hooks/useToken";
import { Link } from "react-router-dom";

function Category() {
  const { token } = useToken();

  const [, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/admin/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
        {/* <table className="text-center table-auto">
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
            {codes.map((pro: ICard, idx) => (
              <tr key={idx}>
                <td className="font-semibold">{pro.id}</td>
                <td>{pro.name}</td>
                <td>{pro.name}</td>
                <td>
                  <img
                    className="size-10 mx-auto"
                    src={`https://yelogift.coding-site.com/public/storage/${pro.image}`}
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
                <td> <Link to="/"><GoPencil /></Link></td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>
  );
}

export default Category;
