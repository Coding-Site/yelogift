import axios from "axios";
import  { useEffect } from "react";
import { useToken } from "../../../hooks/useToken";
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";

function Social() {
  // const [sliders, setSliders] = useState([]);
  const { token } = useToken();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/admin/slider`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  }, []);

  return (
    <div className="flex flex-col container py-5 px-2 bg-[#1F1F1F]">
      <div className="flex justify-between mb-6">
        <span className="ps-3 border-mainLightColor border-s-4 font-medium">
          Social Media
        </span>
      </div>

      <table className="w-full text-center">
        <thead className="text-main">
          <tr>
            <th>Title</th>
            <th>Link</th>
            <th>Select Icon</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ttile 1</td>
            <td>descripton 1</td>
            <td>img 1</td>
            <td><FaTrashAlt  /></td>
            <td><GoPencil /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Social;
