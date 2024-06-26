import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import instance from "../../../axios";

type Inputs = {
    id:number,
    name:string,
    icon:string,
    url:string
};

function AddSocial() {
  const { register, handleSubmit } = useForm<Inputs>();
  const localstorage = JSON.parse(localStorage.getItem("adminData") as string);
  const adminToken = localstorage?.adminToken;
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    instance.post(`/api/admin/social/store`, {...data, name: `fa ${data.name}`} , {
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
                <label htmlFor="facebook" className="flex items-center justify-center gap-x-2  w-1/2"><input type="radio" value="facebook"   {...register("icon")} id="facebook" /> <img src="/assets/social/facebook.png" alt="facebook" /></label>
                <label htmlFor="twitter" className="flex items-center justify-center gap-x-2  w-1/2"><input type="radio" value="twitter"   {...register("icon")} id="twitter" /> <img src="/assets/social/twitter.png" alt="twitter" /></label>
                <label htmlFor="youtube" className="flex items-center justify-center gap-x-2  w-1/2"><input type="radio" value="youtube"  {...register("icon")} id="youtube" /> <img src="/assets/social/youtube.png" alt="facebook" /></label>
                <label htmlFor="linked" className="flex items-center justify-center gap-x-2  w-1/2"><input type="radio" value="linkedin"  {...register("icon")} id="linked" /> <img src="/assets/social/linkedin.png" alt="facebook" /></label>
              </div>
            </div>
          </div>
        </div>
          <button type="submit" className="btn mt-5 mx-auto my-3 !rounded px-5 "> Add</button>
      </form>
    </div>
  );
}

export default AddSocial;
