import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";

type Props = {
  id: number;
  title: string;
  message: string;
  type: number;
};

function Notification() {
  const [notifications, setNotifications] = useState<Props[]>([]);
  const { adminToken } = JSON.parse(localStorage.getItem("adminData") as string);
  const deleteNotification = (id: number) => {
    console.log(id);
  };
  const getNotifications = () => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/admin/notification`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
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
            {notifications.map((not, idx) => (
              <tr key={idx} className="text-center">
                <td>title</td>
                <td>message</td>

                <td
                  className="cursor-pointer flex justify-center gap-x-3"
                  onClick={() => deleteNotification(not?.id)}
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
