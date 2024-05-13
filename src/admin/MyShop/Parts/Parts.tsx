/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
// import { PiEye } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
// import { ICard } from "../../../models/ICard";
// import { GoPencil } from "react-icons/go";

function Parts() {
    const localstorage = JSON.parse((localStorage.getItem("adminData")) as string);
    const adminToken = localstorage?.adminToken
    const { productId } = useParams();
    const [parts, setParts] = useState([]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BASEURL}/api/admin/product/parts/get/${productId}`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then((data) => {
                setParts(data.data.data);
            });
    }, []);

    return (
        <div className="flex flex-col gap-4 w-full py-5 container">
            <div className="flex items-center justify-between w-full ">
                <span className="text-3xl text-white font-semibold">Parts of product with id {productId}</span>

                <Link to={`/admin/products/${productId}/parts/add`} className="btn !rounded-md !h-14">
                    <AiOutlinePlus />   Add Part
                </Link>
            </div>

            <div className="flex flex-col gap-2 rounded-t-xl p-4  bg-white text-mainLightBlack">
                

                <table className="text-center table-auto border-separate">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Product Id</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parts.map((part: any, idx: any) => (
                            <tr key={idx} className="table-row py-5">
                                <td className="font-semibold">{part.id}</td>
                                <td>{part.title}</td>
                                <td>{part.price}</td>
                                <td>{part.product_id}</td>
                                <td> <Link to={`/admin/products/${productId}/parts/${part.id}/edit`}><GoPencil /></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Parts;
