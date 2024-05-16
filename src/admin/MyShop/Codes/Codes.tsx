/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../../utils/Spinner";
import { useForm } from "react-hook-form";

function Codes() {
  const localstorage = JSON.parse((localStorage.getItem("adminData")) as string);
  const adminToken = localstorage?.adminToken
  const [loading, setLoading] = useState(false);
  const [safe, setSafe] = useState(false);
  const [codes, setCodes] = useState<any[]>([]);

  const { partId } = useParams();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    setLoading(true)
    axios
      .post(`${import.meta.env.VITE_BASEURL}/api/admin/product/parts/codes/`,
        { ...data, part_id: partId },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          }
        },)
      .then((data) => {
        setCodes(data.data.data);
        if(data.data.status){
          setSafe(true)
        }else{
          alert('password is not correct !!');
        }
        setLoading(false);
      });
  }

  return (
    <div className="flex flex-col gap-4 w-full py-5 container">
      <div className="flex items-center justify-between w-full pt-10 pb-5 ">
        <span className="text-3xl text-white font-semibold">All Codes</span>

        <Link to="/admin/products/add" className="btn !rounded-md !h-12">
          <AiOutlinePlus /> Add new product
        </Link>
      </div>

      
      <div className="flex flex-col gap-2 rounded-t-xl p-4  bg-white text-mainLightBlack">
        {loading ? (<Spinner />) : safe ? (
          <table className="text-center table-auto border-collapse">
            <thead>
              <tr className="border-b-[30px] border- border-transparent font-medium">
                <td>ID</td>
                <td>Code</td>
                <td>Part ID</td>
                <td>Product ID</td>
                <td>Status</td>
              </tr>
            </thead>


            <tbody>
               {codes.map((code: any, idx: any) => (
                <tr key={idx} className="table-row border-b-2 border-transparent font-medium">
                  <td className="font-bold">#{code.id}</td>
                  <td className="w-36">{code.code}</td>
                  <td>{code?.part_id}</td>
                  <td>{code?.product_id}</td>
                  <td>{code?.status}</td>
                </tr>
              ))} 

            </tbody>
          </table>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-y-2 justify-center p-3 px-5 rounded-md">

            <span>Enter Code Password</span>
            <input type="text" {...register('password')} className="bg-transparent w-full outline-none border px-5 py-3 border-gray-500 rounded-md " />
            <button type="submit" className="btn ms-auto w-20">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Codes;
