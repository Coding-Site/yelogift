import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISlide } from "../../../models/ISlide";
import axios from "axios";

type Inputs = {
  title: string;
  description: string;
  image: string;
};

function EditSlider() {
  const [slider, setSlider] = useState<ISlide>();
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {

    }
  });
  const { adminToken } = JSON.parse(localStorage.getItem("userData") as string);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  const getSldier = () => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/admin/slider`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then((d) => {
        setSlider(d.data.data);
      });
  };

  useEffect(() => {
    getSldier();
  }, []);
  return (
    <div className="flex flex-col container py-5 px-2 bg-[#1F1F1F]">
      <div className="flex justify-between mb-6">
        <span className="ps-3 border-mainLightColor border-s-4 font-medium">
          Edit Slider
        </span>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex w-full flex-col justify-between gap-x-6"
      >
        <div className="flex w-full justify-between gap-x-6">
          <div className="flex flex-col w-1/2 gap-y-4">
            <label
              htmlFor="name"
              className="text-main flex flex-col font-semibold gap-y-2 w-full"
            >
              Title
              <input
                {...register("title")}
                type="text"
                className="border border-gray-400 rounded-md bg-transparent p-1"
              />
            </label>
            <label
              htmlFor="description"
              className="text-main font-semibold flex flex-col gap-y-2 w-full"
            >
              Description
              <textarea
                {...register("description")}
                rows={10}
                className="border border-gray-400 w-full rounded-md bg-transparent p-1"
              ></textarea>
            </label>
          </div>
          <div className="flex flex-col w-1/2 gap-y-4">
            <div className="flex flex-col grow gap-2 items-start">
              <label htmlFor="image" className="text-main font-semibold">
                product image
              </label>
              <input
                {...register("image")}
                type="file"
                id="image"
                className="hidden"
              />

              <label
                htmlFor="image"
                className="flex flex-col w-full grow justify-center  border rounded-md cursor-pointer  border-dashed  border-gray-400 "
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
            </div>
          </div>
        </div>
        <button type="submit" className="btn mt-5 mx-auto my-3 !rounded px-5 ">
          {" "}
          Add
        </button>
      </form>
    </div>
  );
}

export default EditSlider;
