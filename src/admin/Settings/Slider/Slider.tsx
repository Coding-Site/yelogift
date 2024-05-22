import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";

import { GoPencil } from "react-icons/go";
import Spinner from "../../../utils/Spinner";
import instance from "../../../axios";

type Props = {
  title: string;
  description: string;
  image: string;
  id: number;
};

function Slider() {
  const [sliders, setSliders] = useState<Props[]>([]);
  const { adminToken } = JSON.parse(localStorage.getItem("adminData") as string);
  const [loading, setLoading] = useState(false);

  const deleteSlider = (id: number) => {
    setLoading(true);
    instance
      .get(`/api/admin/slider/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then(() => {
        setLoading(false);
        getSldiers()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSldiers = () => {
    setLoading(true);
    instance
      .get(`/api/admin/slider`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then((d) => {
        setLoading(false);
        setSliders(d.data.data);
      });
  };

  useEffect(() => {
    getSldiers();
  }, []);

  return (
    <div className="flex flex-col container py-5 px-0 bg-[#1F1F1F]">
      <div className="flex items-center justify-between w-full pt-10 pb-5 px-2 ">
        <span className="text-3xl text-white font-semibold border-s-2 ps-3 border-main">Silder</span>

        <Link to="/admin/slider/add" className="bg-main rounded-md flex justify-center items-center text-mainLightBlack size-11" >
          <FiPlus className="text-2xl" />
        </Link>
      </div>


      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full text-center">
          <thead className="text-main">
            <tr className="bg-[#4E4E4E] h-[62px]">
              <th>Title</th>
              <th>Description</th>
              <th>Product Image</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sliders &&
              sliders.map((slider, idx) => (
                <tr key={idx} className="text-center h-[100px]">
                  <td className="text-main">{slider.title}</td>
                  <td>{slider.description.slice(0, 20)}</td>
                  <td>
                    {" "}
                    <img
                      className="h-[50px] mx-auto"
                      src={`${import.meta.env.VITE_BASEURL}/storage/${slider.image}`}
                      alt="img"
                    />
                  </td>
                  <td className="text-3xl">
                    <Link to={`edit/${slider.id}`}>
                      <GoPencil />
                    </Link>
                  </td>
                  <td
                    className="cursor-pointer text-3xl"
                    onClick={() => deleteSlider(slider.id)}
                  >
                    <LuTrash2 />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Slider;
