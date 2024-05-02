/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { ICategory } from "../../../models/ICategory";
import { PiArrowsCounterClockwise } from "react-icons/pi";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";
import { IProduct } from "../../../models/IProduct";

type Inputs = {
  product_id: string;
  name: string;
  description: string;
  category_id: string;
  image: string;
  price: number;
  discount: number;
};

function EditProduct() {
  const [product, setProduct] = useState<IProduct>();
  const { id } = useParams();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const localstorage = JSON.parse(localStorage.getItem("adminData") as string);
  const adminToken = localstorage?.adminToken;
  const { register, handleSubmit, unregister, reset } = useForm<Inputs>();
  const navigate = useNavigate();
  useEffect(() => {
    const defaultValues = {
      product_id: product?.id.toString(),
      name: product?.name,
      description: product?.description,
      category_id: product?.category_id,
      image: product?.image,
      price: product?.price,
      discount: product?.discount,
    };
    reset((defaultValues as any));
  }, [product]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/admin/category`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then((data) => setCategories(data.data.data));
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/admin/product`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then((data) => {
        const products: IProduct[] = data.data.data;
        products.forEach((pr) => {
          if (pr.id.toString() == id) {
            setProduct(pr);
            console.log(pr);
          }
        });
      });
  }, []);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const fd = new FormData();

    console.log(data.image)
    // fd.append("image", );

    for (const i in data) {
        fd.append(i, (i != "image") ?  data[i] : data.image[0]);
      }

    axios
      .post(`${import.meta.env.VITE_BASEURL}/api/admin/product/update`, fd, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then(() => navigate("/admin/products"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col gap-4 w-full py-5 container ps-12">
      <div className="flex items-center justify-start w-full relative ">
        <Link to="/admin/products">
          <FaChevronLeft className="text-main text-2xl absolute -left-7 font-semibold top-[50%] -translate-y-[50%]" />
        </Link>
        <span className="text-3xl text-white font-semibold">
          Edit new product
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
                {...register("category_id")}
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

            {/* <div className="flex gap-2 items-center">
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
            </div> */}
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
              {/* <label
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
              </label> */}
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
                    src="/assets/products/upload.png"
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

            <div className="flex flex-col gap-2">
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
                {/* <div className="flex flex-col w-[48%] gap-2">
                <span className="inline-flex items-center gap-1" >Compare at price <CiCircleInfo /></span>
                <div className="flex gap-2 border border-gray-400 rounded-md bg-transparent p-1">
                  <span className=" bg-gray-600 size-8 aspect-square rounded-md flex justify-center items-center">
                    <BiDollar className=" text-main" />
                  </span>
                  <input type="text" className="bg-transparent outline-none border-none" />
                </div>
              </div> */}
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
            </div>

            {/* <div className="flex flex-col gap-2">
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
            </div> */}
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

export default EditProduct;
