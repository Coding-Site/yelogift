import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { ICategory } from "../../../models/ICategory";
import { useToken } from "../../../hooks/useToken";
import { FaRegCircleStop } from "react-icons/fa6";
import { PiArrowsCounterClockwise } from "react-icons/pi";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";
import { CiCircleInfo } from "react-icons/ci";

type Inputs = {
  name: string;
  icon: string;
  addToHome: boolean;
};

function AddCategory() {

  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useToken();
  const {
    register,
    handleSubmit,
    unregister,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);

    console.log(data);
  };

  return (
    <div className="flex flex-col gap-4 w-full py-10 container ps-12">
      <div className="flex items-center justify-start w-full relative ">
        <Link to="/admin/category">
          <FaChevronLeft className="text-main text-2xl absolute -left-7 font-semibold top-[50%] -translate-y-[50%]" />
        </Link>
        <span className="text-3xl text-white font-semibold">
          Add new category
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
        <div className="flex w-full gap-10">
          <div className="w-1/2 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-main font-semibold">
                {" "}
                Name
              </label>
              <input
                {...register("name")}
                type="text"
                className="border border-gray-400 rounded-md bg-transparent p-1"
              />
            </div>

            <div className="w-1/2 flex flex-col  gap-2 items-start">
              <label htmlFor="icon" className="text-main font-semibold">
                product icon
              </label>
              <input
                {...register("icon")}
                type="file"
                id="icon"
                className="hidden"
              />
            </div>
            <div className="flex justify-between items-end gap-3 border border-gray-600 rounded-md bg-transparent p-3 w-full">
              <label
                htmlFor="icon"
                className="flex flex-col justify-end aspect-square border rounded-md cursor-pointer  border-dashed  border-gray-400 h-[150px]"
              >
                <img
                  className="size-12 mx-auto"
                  src="/products/upload.png"
                  alt="upload icon"
                />
                <span className="text-xs px-5 text-center pb-4">
                  <span className="underline  text-[#8095FF]">
                    click to upload{" "}
                  </span>{" "}
                  or drag and drop
                </span>
              </label>
              <label
                htmlFor="icon"
                className="grow cursor-pointer flex items-center justify-center gap-2 border border-gray-600 p-1 h-10 rounded-lg"
              >
                <PiArrowsCounterClockwise /> replace
              </label>
              <button
                type="button"
                onClick={() => unregister("icon")}
                className="grow flex items-center justify-center gap-2 border border-gray-600 p-1 h-10 rounded-lg "
              >
                <FaRegTrashAlt /> remove
              </button>
            </div>

            <div className="flex gap-2 items-center">
              <input
                {...register("addToHome")}
                type="checkbox"
                id="addToHome"
                className="hidden"
              />
              <FaRegCircleStop
                className={
                  watch("addToHome") ? "text-mainLightColor" : "text-mainWhite"
                }
              />
              <label
                htmlFor="addToHome"
                className="text-mainWhite font-semibold"
              >
                Add to home
              </label>
            </div>

          </div>
        </div>

        <div className="w-full text-end">
          <button type="submit" className="btn !rounded !w-[150px] !h-[50px] ">
            {" "}
            Add category
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCategory;
