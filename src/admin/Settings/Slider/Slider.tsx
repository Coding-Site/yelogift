import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";

type Props = {
  title: string;
  description: string;
  image: string;
  id: number;
};

function Slider() {
  const [sliders, setSliders] = useState<Props[]>([]);
  const { adminToken } = JSON.parse(localStorage.getItem("userData") as string);

  const deleteSlider = (id: number) => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/admin/slider/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then((d) => {
        setSliders(d.data.data);
      });
  };

  const getSldiers = () => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/admin/slider`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then((d) => {
        setSliders(d.data.data);
      });
  };

  useEffect(() => {
    getSldiers();
  }, [deleteSlider]);

  return (
    <div className="flex flex-col container py-5 px-2 bg-[#1F1F1F]">
      <div className="flex justify-between mb-6">
        <span className="ps-3 border-mainLightColor border-s-4 font-medium">
          Slider
        </span>
        <Link
          to="/admin/slider/add"
          className="bg-main rounded-md flex justify-center items-center text-mainLightBlack size-11"
        >
          <FaPlus />
        </Link>
      </div>

      <table className="w-full text-center">
        <thead className="text-main">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Slider Image</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sliders.map((slider, idx) => (
            <tr key={idx} className="text-center">
              <td>{slider.title}</td>
              <td>{slider.description.slice(0, 20)}</td>
              <td>
                {" "}
                <img
                  className="h-[50px] mx-auto"
                  src={`https://yelogift.coding-site.com/public/storage/${slider.image}`}
                  alt="img"
                />
              </td>
              <td className="cursor-pointer" onClick={() => deleteSlider(slider.id)}>
                <FaTrashAlt />
              </td>
              <td>
                <Link to={`edit/${slider.id}`}>
                  <GoPencil />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Slider;
