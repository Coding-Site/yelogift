/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../utils/Spinner";

type Inputs = {
  id: number,
  name: string,
  icon: string,
  url: string
};

function EditSocial() {

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const navigate = useNavigate();
  const localstorage = JSON.parse(localStorage.getItem("adminData") as string);
  const adminToken = localstorage?.adminToken;
  const [Social, setSocial] = useState<Inputs>()


  useEffect(() => {
    const defaultValues = {
      name: Social?.name,
      url: Social?.url,
      icon: Social?.icon
    };
  
    reset((defaultValues as any));

  }, [Social]);


  useEffect(() => {
    setLoading(true)

    axios.get(`${import.meta.env.VITE_BASEURL}/api/admin/social`, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    })
      .then((d) => {
        let social;
        d.data.data.map((i: any) => {
          if (i.id == id) {
            social = i
          }
        })

        setSocial(social)
        setLoading(false)
      })

  }, [])


  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios.post(`${import.meta.env.VITE_BASEURL}/api/admin/social/update`, { ...data, name: `fa ${data.name}` , social_id: id }, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    })
    .then(() => navigate('/admin/social'))

  };


  return (
    <div className="flex flex-col container py-5 px-2 bg-[#1F1F1F]">
      <div className="flex justify-between mb-6">
        <span className="ps-3 border-mainLightColor border-s-4 font-medium">
          Add Social
        </span>
      </div>
      {loading ? <Spinner /> : (

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
                  {...register("name")}
                  type="text"
                  className="border border-gray-400 rounded-md bg-transparent p-1"
                />
              </label>
              <label
                htmlFor="description"
                className="text-main font-semibold flex flex-col gap-y-2 w-full"
              >
                Link
                <input
                  {...register("url")}
                  type="text"
                  className="border border-gray-400 rounded-md bg-transparent p-1"
                />
              </label>
            </div>
            <div className="flex flex-col w-1/2 gap-y-4">
              <div className="flex flex-col grow gap-2 items-start">
                <label htmlFor="image" className="text-main font-semibold">
                  select icon
                </label>


                <div
                  className="flex flex-wrap w-full grow justify-evenly  border rounded-md cursor-pointer  border-dashed  border-gray-400 "
                >
                  <label htmlFor="facebook" className="flex items-center justify-center gap-x-2  w-1/2"><input type="radio" value="facebook"   {...register("icon")} id="facebook" /> <img className="size-7" src="/assets/social/facebook.png" alt="facebook" /></label>
                  <label htmlFor="twitter" className="flex items-center justify-center gap-x-2  w-1/2"><input type="radio" value="twitter"   {...register("icon")} id="twitter" /> <img src="/assets/social/twitter.png" alt="twitter" /></label>
                  <label htmlFor="youtube" className="flex items-center justify-center gap-x-2  w-1/2"><input type="radio" value="youtube"  {...register("icon")} id="youtube" /> <img src="/assets/social/youtube.png" alt="youtube" /></label>
                  <label htmlFor="linked" className="flex items-center justify-center gap-x-2  w-1/2"><input type="radio" value="linkedin"  {...register("icon")} id="linked" /> <img src="/assets/social/linkedin.png" alt="linkedin" /></label>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn mt-5 mx-auto my-3 !rounded px-5 "> Add</button>
        </form>
      )}
    </div>
  );
}

export default EditSocial;
