import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { ICategory } from "../../../models/ICategory";
import { useToken } from "../../../hooks/useToken";
import { FaRegCircleStop } from "react-icons/fa6";
import { PiArrowsCounterClockwise } from "react-icons/pi";
import { FaRegTrashAlt } from "react-icons/fa";

type Inputs = {
  name: string;
  description: string;
  category: string;
  addToHome: boolean;
  image: string;
  price: number;
  discount: number;
  lang: string;
  selling: string
};

function AddProduct() {
  const [, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { token } = useToken();
  const {
    register,
    handleSubmit,
    unregister,    
    watch,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);

    console.log(data);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/admin/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => setCategories(data.data.data));
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full py-5 container ps-12">
      <div className="flex items-center justify-start w-full relative ">
        <Link to="/admin/products">
          <FaChevronLeft className="text-main text-2xl absolute -left-7 font-semibold top-[50%] -translate-y-[50%]" />
        </Link>
        <span className="text-3xl text-white font-semibold">
          Add new product
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
        <div className="flex  w-full gap-10">
          <div className="w-full sm:w-1/2 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-main font-semibold">
                Name
              </label>
              <input
                {...register("name")}
                type="text"
                className="border border-gray-400 rounded-md bg-transparent p-1"
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="description" className="text-main font-semibold">
                Description
              </label>
              <textarea
                className="border border-gray-400 rounded-md bg-transparent p-1"
                rows={10}
                {...register("description")}
              ></textarea>
              <span className="absolute bottom-2 left-[50%] -translate-x-[50%] bg-gray-600 p-4 py-2 rounded-md">
                Tiny editor
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="text-main font-semibold">
                Category
              </label>
              <select
                {...register("category")}
                id="category"
                className="border  border-gray-400 rounded-md bg-transparent p-1"
              >
                {categories.map((cat, idx) => (
                  <option
                    className="bg-mainLightBlack text-mainWhite"
                    key={idx}
                    value={cat.id}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
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

          <div className="w-full sm:w-1/2 flex flex-col gap-5">
            <div
              className="flex gap-2 items-center 
            w-full 
            justify-end
            [&>*]:w-[120px] 
            [&>*]:h-[50px] 
            [&>*]:rounded-md  
            [&>*]:px-3 
            [&>*]:py-2 
            [&>*]:border 
            [&>*]:flex 
            [&>*]:cursor-pointer 
            [&>*]:justify-center 
            [&>*]:items-center 
            [&>*]:border-gray-400 
            "
            >
              <label
                htmlFor="arabic"
                className={
                  watch("lang") === "english"
                    ? "bg-main text-mainLightBlack"
                    : ""
                }
              >
                Arabic
                <input
                  {...register("lang")}
                  type="radio"
                  value="english"
                  id="arabic"
                  className="hidden"
                />
              </label>
              <label
                htmlFor="english"
                className={
                  watch("lang") === "arabic"
                    ? "bg-main text-mainLightBlack"
                    : ""
                }
              >
                English
                <input
                  {...register("lang")}
                  type="radio"
                  id="english"
                  value="arabic"
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex flex-col  gap-2 items-start">
              <label htmlFor="image" className="text-main font-semibold">
                product image
              </label>
              <input
                {...register("image")}
                type="file"
                id="image"
                className="hidden"
              />

              <div className="flex justify-between items-end gap-3 border border-gray-600 rounded-md bg-transparent p-3 w-full">
                <label
                  htmlFor="image"
                  className="flex flex-col justify-end aspect-square border rounded-md cursor-pointer  border-dashed  border-gray-400 h-[150px]"
                >
                  <img
                    className="size-12 mx-auto"
                    src="/products/upload.png"
                    alt="upload image"
                  />
                  <span className="text-xs px-5 text-center pb-4">
                    <span className="underline  text-[#8095FF]">
                      click to upload{" "}
                    </span>{" "}
                    or drag and drop
                  </span>
                </label>
                <label
                  htmlFor="image"
                  className="grow cursor-pointer flex items-center justify-center gap-2 border border-gray-600 p-1 h-10 rounded-lg"
                >
                  <PiArrowsCounterClockwise /> replace
                </label>
                <button
                  type="button"
                  onClick={() => unregister("image")}
                  className="grow flex items-center justify-center gap-2 border border-gray-600 p-1 h-10 rounded-lg "
                >
                  <FaRegTrashAlt /> remove
                </button>
              </div>
            </div>

            {/* <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-main font-semibold">
              Pricing
            </label>
            <div className="flex flex-wrap justify-between items-end gap-3 border border-gray-600 rounded-md bg-transparent p-3 w-full">
              <div className="flex flex-col w-full gap-2">
                <span>Price</span>
                <div className="flex gap-2 border border-gray-400 rounded-md bg-transparent p-1">
                  <span className=" bg-gray-600 size-8 aspect-square rounded-md flex justify-center items-center">
                    <BiDollar className=" text-main" />
                  </span>
                  <input
                    {...register("price")}
                    type="text"
                    className="bg-transparent outline-none border-none"
                  />
                </div>
              </div>
              <div className="flex flex-col w-[48%] gap-2">
                <span className="inline-flex items-center gap-1" >Compare at price <CiCircleInfo /></span>
                <div className="flex gap-2 border border-gray-400 rounded-md bg-transparent p-1">
                  <span className=" bg-gray-600 size-8 aspect-square rounded-md flex justify-center items-center">
                    <BiDollar className=" text-main" />
                  </span>
                  <input type="text" className="bg-transparent outline-none border-none" />
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <span>Discount</span>
                <div className="flex gap-2 border border-gray-400 rounded-md bg-transparent p-1">
                  <span className=" bg-gray-600 size-8 aspect-square rounded-md flex justify-center items-center">
                    <BiDollar className=" text-main" />
                  </span>
                  <input
                    {...register("discount")}
                    type="text"
                    className="bg-transparent outline-none border-none"
                  />
                </div>
              </div>
            </div>
          </div> */}

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-main font-semibold">
                Selling Type
              </label>
              <div className="flex flex-wrap justify-between items-end gap-3 border border-gray-600 rounded-md bg-transparent p-3 w-full">
                <div className="flex w-full gap-2">
                  <input
                    {...register("selling")}
                    type="radio"
                    value="auto"
                    className="bg-transparent outline-none border-none"
                  />
                  <span>Auto (Email-insite)</span>
                </div>
                <div className="flex w-full gap-2">
                  <input
                    {...register("selling")}
                    type="radio"
                    value="manual"
                    className="bg-transparent  bg-main outline-none border-none"
                  />
                  <span>Manual (Email-insite)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full text-end">
          <button type="submit" className="btn !rounded !w-[150px] !h-[50px] ">
            {" "}
            Add product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
