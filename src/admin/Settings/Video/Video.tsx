import axios from "axios";
import  { useEffect } from "react";

function Video() {
  const  localstorage  = JSON.parse((localStorage.getItem("adminData")) as string);
  const adminToken = localstorage?.adminToken

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASEURL}/api/admin/slider`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });
  }, []);

  return (
    <div className="flex flex-col container py-5 px-2 bg-[#1F1F1F]">
      <div className="flex justify-between mb-6">
        <span className="ps-3 border-mainLightColor border-s-4 font-medium">
          Video
        </span>
      </div>

      <div className="flex items-end justify-between gap-3 w-full">
          <label
            htmlFor="image"
            className="flex grow bg-mainLightBlack flex-col justify-center aspect-square border rounded-md cursor-pointer items-center border-dashed  border-gray-400 h-[150px]"
          >
            <img
              className="size-12 mx-auto"
              src="/assets/settings/video.png"
              alt="upload image"
            />
            <span className="text-xs px-5 text-center pb-4">
              <span className="underline  text-[#8095FF]">
                click to upload{" "}
              </span>{" "}
              or drag and drop
            </span>

          </label>
    
        <button className="btn py-2  !rounded-md px-5">upload</button>
      </div>
    </div>
  );
}

export default Video;
