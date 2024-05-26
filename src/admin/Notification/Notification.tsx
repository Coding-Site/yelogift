import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import instance from '../../axios';

type Props = {
    id: number;
    title: string;
    message: string;
    type: number;
};

function Notification() {
    const { adminToken } = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const [notifications, setNotifications] = useState<Props[]>([]);

    const deleteNotification = (id: number) => {
        instance
            .delete(`/api/admin/notification/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    'ngrok-skip-browser-warning': true,
                },
            })
            .then(() => {
                setNotifications(notifications.filter((not) => not.id !== id));
            })
            .catch((error) => {
                console.error('Failed to delete notification', error);
            });
    };

    const getNotifications = () => {
        instance
            .get(`/api/admin/notification`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${adminToken}`,
                    'ngrok-skip-browser-warning': true,
                },
            })
            .then((d) => {
                setNotifications(d.data.data);
            });
    };
    useEffect(() => {
        getNotifications();
    }, []);

    return (
        <div className="w-full container py-5">
            <div className="flex flex-col container py-5 px-2 bg-[#1F1F1F]">
                <div className="flex justify-between mb-6">
                    <span className="ps-3 border-mainLightColor border-s-4 font-medium">
                        Notifications
                    </span>
                    <Link
                        to="/admin/notification/add"
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
                        {notifications &&
                            notifications.map((not, idx) => (
                                <tr key={idx} className="text-center w-full">
                                    <td className={`break-all text-left`}>
                                        {not.title}
                                    </td>
                                    <td className={`break-all text-left`}>
                                        {not.message}
                                    </td>

                                    <td
                                        className="cursor-pointer flex justify-center gap-x-3"
                                        onClick={() =>
                                            deleteNotification(not?.id)
                                        }
                                    >
                                        <FaTrashAlt />
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
