import { MdOutlineFileUpload } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { useEffect } from "react";
import axios from "axios";
import { useToken } from "../../../hooks/useToken";

function SiteSetting() {
  const {token} = useToken();


  useEffect(() => {
    console.log(token)
    axios.get(`${import.meta.env.VITE_BASEURL}/api/admin/setting`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((d) => {
      console.log(d.data.data)
    })
  }, [])
  return (
    <div className="flex flex-col gap-5 w-full [&>*]:rounded-md">
      <div className="flex flex-col py-4 px-4 bg-[#1F1F1F]">
        <div className="flex justify-between mb-6">
          <span className="ps-3 border-mainLightColor border-s-4 font-medium">
            Logo
          </span>
        </div>
        <div className="flex gap-2">
          <div className="bg-white rounded-2xl p-4 ">
            <div className="flex items-center flex-col gap-4 text-mainLightBlack ">
              <span>Defauly Logo</span>
              <img src="/logo.png" alt="default logo" />
              <label
                htmlFor="defaultlogo"
                className="bg-mainLightColor cursor-pointer text-xs p-3 rounded-md flex justify-between items-center gap-3"
              >
                <MdOutlineFileUpload className="text-2xl" />
                upload new logo
                <input id="defaultlogo" type="file" className="hidden" />
              </label>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 ">
            <div className="flex items-center flex-col gap-4 text-mainLightBlack ">
              <span>Defauly Logo</span>
              <img src="/logo.png" alt="default logo" />
              <label
                htmlFor="darklogo"
                className="bg-mainLightColor cursor-pointer text-xs p-3  rounded-md flex justify-between items-center gap-3"
              >
                <MdOutlineFileUpload className="text-2xl" />
                upload new logo
                <input id="darklogo" type="file" className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col py-4 px-4 bg-[#1F1F1F]">
        <div className="flex justify-between mb-6">
          <span className="ps-3 border-mainLightColor border-s-4 font-medium">
            Site name
          </span>
        </div>
        <div className="flex items-center justify-between  gap-5">
          <input
            type="text"
            className="border grow rounded-md px-3 bg-transparent py-2 border-mainWhite"
          />
          <GoPencil className="text-3xl" />
        </div>
      </div>

      <div className="flex flex-col py-4 px-4 bg-[#1F1F1F]">
        <div className="flex justify-between mb-6">
          <span className="ps-3 border-mainLightColor border-s-4 font-medium">
            Deals
          </span>
        </div>
        <div className="flex items-center justify-between  gap-5">
          <input
            type="text"
            className="border grow rounded-md px-3 bg-transparent py-2 border-mainWhite"
          />
          <GoPencil className="text-3xl" />
        </div>
      </div>

      <div className="flex flex-col py-4 px-4 bg-white text-mainLightBlack">
        <div className="flex justify-between mb-6">
          <span className="ps-3 border-mainLightColor text-mainLightBlack border-s-4 font-medium">
            Theme Customizer
          </span>
        </div>
        <div className="flex flex-col  gap-5">
          <div className="flex flex-col gap-2 ">
            <b>Color settings</b>
            
            <div className="flex flex-wrap  justify-between items-start w-[300px]">
              <span className="w-1/2 text-sm">Primary color </span>
              <label className="w-1/2" htmlFor="color">
                <input type="color"  id="color" />
              </label>
              <div className="flex gap-2">
                <span className="size-10 rounded bg-main"></span>
                <span className="size-10 rounded bg-mainLightColor"></span>
              </div>
            </div>
            
            <div className="flex flex-wrap  justify-between items-start w-[300px]">
              <span className="w-1/2 text-sm">Secondary color </span>
              <label className="w-1/2" htmlFor="color">
                <input type="color"  id="color" />
              </label>
              <div className="flex gap-2">
                <span className="size-10 rounded bg-main"></span>
                <span className="size-10 rounded bg-mainLightColor"></span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default SiteSetting;
