import { useEffect, useState } from 'react';
import instance from '../../../axios';
import { GoPencil } from 'react-icons/go';
import Spinner from '../../../utils/Spinner';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { LuTrash2 } from 'react-icons/lu';

export default function TopNavTable() {
    const [topNavData, setTopNavData] = useState([]);
    const [loading, setLoading] = useState(false);
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;
    const [del, setDel] = useState<any>(false);

    useEffect(() => {
        const fetchTopNav = async () => {
            try {
                setLoading(true);
                const response = await instance.get('/api/admin/advertismant', {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                });
                setTopNavData(response.data.data);
            } catch (error) {
                console.error('Failed to fetch topnav data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTopNav();
    }, [adminToken, del]);

    const deleteTovNav = async (id: any) => {
        try {
            const response = await instance.delete(
                `/api/admin/advertismant/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                }
            );
            console.log(response);
        } catch (error) {
            console.error('Failed to fetch topnav data:', error);
        } finally {
            setLoading(false);
            setDel(!del);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="flex flex-col container py-5 px-0 bg-[#1F1F1F]">
            <div className="flex items-center justify-between w-full pt-10 pb-5 px-2">
                <div className="flex items-center justify-between w-full pt-10 pb-5 px-2 ">
                    <span className="text-3xl text-white font-semibold border-s-2 ps-3 border-main">
                        Top Navigation
                    </span>
                    <Link
                        to="/admin/topnav-settings/add"
                        className="bg-main rounded-md flex justify-center items-center text-mainLightBlack size-11"
                    >
                        <FiPlus className="text-2xl" />
                    </Link>
                </div>
            </div>
            <div className="p-4">
                <table className="min-w-full">
                    <thead className="text-main">
                        <tr className="bg-[#4E4E4E] h-[62px] text-center">
                            <th>ID</th>
                            <th>Description</th>
                            <th>URL</th>
                            <th>background Color</th>
                            <th>Font Color</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topNavData.map((item: any) => (
                            <tr
                                key={item.id}
                                className="text-center h-[100px] text-main"
                            >
                                <td>{item.id}</td>
                                <td>{item.description.substring(0, 30)}...</td>
                                <td className="text-[#fff]">
                                    {item.url.substring(0, 30)}...
                                </td>
                                <td>
                                    <div
                                        className={` w-[25px] h-[25px] m-auto`}
                                        style={{ backgroundColor: item.color1 }}
                                    ></div>
                                </td>
                                <td>
                                    <div
                                        className={` w-[25px] h-[25px] m-auto`}
                                        style={{ backgroundColor: item.color2 }}
                                    ></div>
                                </td>
                                <td className="text-[22px] text-center text-[#fff]">
                                    <Link to={`edit/${item.id}`}>
                                        {/* <Link to={`edit/${slider.id}`}> */}
                                        <GoPencil className="m-auto text-[22px]" />
                                    </Link>
                                </td>
                                <td className="text-[22px] text-center text-[#fff]">
                                    <button
                                        onClick={() => deleteTovNav(item.id)}
                                        className="m-auto text-[22px]"
                                    >
                                        <LuTrash2 className="m-auto text-[22px]" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
