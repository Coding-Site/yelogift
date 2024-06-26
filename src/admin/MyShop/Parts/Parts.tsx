/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
// import { GoPencil } from "react-icons/go";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa6';
import { PiEye } from 'react-icons/pi';
import instance from '../../../axios';
import { GoPencil } from 'react-icons/go';

function Parts() {
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;
    const { productId } = useParams();
    const navigate = useNavigate();
    const [parts, setParts] = useState([]);

    const DeletePart = (id: any) => {
        instance
            .get(`/api/admin/product/parts/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then(() => navigate(0))
            .catch((e) => console.error(e));
    };
    useEffect(() => {
        instance
            .get(`/api/admin/product/parts/get/${productId}`, {
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
            <div className="flex items-center justify-between w-full pt-10 pb-5 ">
                <span className="text-3xl text-white font-semibold">
                    All Parts
                </span>

                <Link
                    to={`/admin/products/${productId}/parts/add`}
                    className="btn !rounded-md !h-12"
                >
                    <AiOutlinePlus /> Add Part
                </Link>
            </div>

            <div className="flex flex-col gap-2 rounded-t-xl p-4  bg-white text-mainLightBlack">
                <table className="text-center table-auto">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Selling Type</th>
                            <th>Codes</th>
                            <th>Delete</th>
                            {/* <th>Edit</th> */}
                        </tr>
                    </thead>
                    <tbody className="border-t-[20px] border-transparent">
                        {parts.map((part: any, idx: any) => (
                            <tr
                                key={idx}
                                className="table-row py-5 border-t-8 border-transparent"
                            >
                                <td className="font-semibold">{part.id}</td>
                                <td>{part.title}</td>
                                <td>{part.price}</td>
                                <td>{part.selling_type}</td>
                                <td>
                                    <Link
                                        to={`/admin/products/${productId}/parts/${part.id}/codes`}
                                    >
                                        <PiEye className="mx-auto text-3xl" />
                                    </Link>
                                </td>
                                <td className="flex justify-center">
                                    {' '}
                                    <FaTrash
                                        className=" cursor-pointer"
                                        onClick={() => DeletePart(part.id)}
                                    />
                                </td>
                                <td>
                                    {' '}
                                    <Link
                                        to={`/admin/products/${productId}/parts/${part.id}/edit`}
                                    >
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

export default Parts;
