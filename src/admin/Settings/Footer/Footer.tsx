/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";

function Footer() {
  
  const {handleSubmit, register} = useForm();
  const onSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <div className="flex flex-col container py-5 px-2 bg-[#1F1F1F]">
      <div className="flex justify-between mb-6">
        <span className="ps-3 border-mainLightColor border-s-4 font-medium">
          Footer
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex items-end gap-3 w-full">
        <div className="flex flex-col grow">
          <label htmlFor="description " className="text-main mb-4">Description</label>
          <textarea {...register('description')}  name="description" className="bg-transparent p-2 border border-gray-400 rounded-md outline-none grow" 
          id="description" cols={30} rows={10}></textarea>
        </div>
        <button className="btn py-2  !rounded-md px-5">Save changes</button>
      </form>
    </div>
  );
}

export default Footer;
