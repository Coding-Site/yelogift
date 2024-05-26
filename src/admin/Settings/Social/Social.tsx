/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { GoPencil } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import instance from '../../../axios';
type Social = {
    id: number;
    name: string;
    link: string;
    icon: string;
};

function Social() {
    const [socials, setSocials] = useState<Social[]>([]);
    const { adminToken } = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const navigate = useNavigate();

    const iconObj: any = {
        facebook: '/assets/social/facebook.png',
        twitter: '/assets/social/twitter.png',
        linkedin: '/assets/social/linkedin.png',
        youtube: '/assets/social/youtube.png',
    };

    const deleteSocial = (id: number) => {
        instance
            .get(`/api/admin/social/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then(() => navigate(0));
    };

    useEffect(() => {
        instance
            .get(`/api/admin/social`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then((d) => {
                setSocials(d.data.data);
            });
    }, []);

    return (
        <div className="flex flex-col container py-5 px-2 bg-[#1F1F1F]">
            <div className="flex justify-between mb-6">
                <span className="ps-3 border-mainLightColor border-s-4 font-medium">
                    Social Media
                </span>
                <Link
                    to="/admin/social/add"
                    className="bg-main rounded-md flex justify-center items-center text-mainLightBlack size-11"
                >
                    <FaPlus />
                </Link>
            </div>

            <table className="w-full text-center">
                <thead className="text-main">
                    <tr>
                        <th>Title</th>
                        <th> Image</th>
                        <th>delete</th>
                        <th>update</th>
                    </tr>
                </thead>
                <tbody>
                    {socials.map((social, idx) => (
                        <tr key={idx} className="border-b-4 border-transparent">
                            <td>{social?.icon}</td>
                            <td>
                                {' '}
                                <img
                                    className="mx-auto"
                                    src={iconObj[social.icon]}
                                    alt="icon"
                                />
                            </td>
                            <td>
                                <FaTrashAlt
                                    onClick={() => deleteSocial(social.id)}
                                    className="mx-auto cursor-pointer"
                                />
                            </td>
                            <td>
                                <GoPencil
                                    onClick={() =>
                                        navigate(
                                            `/admin/social/update/${social.id}`
                                        )
                                    }
                                    className="mx-auto cursor-pointer"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Social;
