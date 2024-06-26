import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { GoPencil } from 'react-icons/go';
import instance from '../../axios';

type Props = {
    id: number;
    name: string;
};

function Notification() {
    const [pages, setPages] = useState<Props[]>([]);
    const { adminToken } = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const deletePage = (id: number) => {
        console.log(id);
    };
    const getPages = () => {
        instance
            .get(`/api/admin/notification`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then((d) => {
                setPages(d.data.data);
            });
    };

    useEffect(() => {
        getPages();
    }, []);

    return (
        <div className="w-full container py-5">
            <div className="flex flex-col container py-5 px-2 bg-[#1F1F1F]">
                <div className="flex justify-between mb-6">
                    <span className="ps-3 border-mainLightColor border-s-4 font-medium">
                        Pages
                    </span>
                    <Link
                        to="/admin/custom-page/add"
                        className="bg-main rounded-md flex justify-center items-center text-mainLightBlack size-11"
                    >
                        <FaPlus />
                    </Link>
                </div>

                <table className="w-full text-center">
                    <thead className="text-main">
                        <tr>
                            <th>Title</th>
                            <th>Message</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pages.map((not, idx) => (
                            <tr key={idx} className="text-center">
                                <td>title</td>
                                <td>message</td>

                                <td
                                    className="cursor-pointer flex justify-center gap-x-3"
                                    onClick={() => deletePage(not?.id)}
                                >
                                    <FaTrashAlt />
                                    <Link to={`notification`}>
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

export default Notification;
