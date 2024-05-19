/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../../utils/Spinner";
import { useForm } from "react-hook-form";
import instance from "../../../axios";

function Codes() {
  const localstorage = JSON.parse((localStorage.getItem("adminData")) as string);
  const adminToken = localstorage?.adminToken
  const [loading, setLoading] = useState(false);
  const [safe, setSafe] = useState(false);
  const { partId } = useParams();
  const [password, setPassword] = useState('');
  const [newCode, setNewCode] = useState('');
  const [codes, setCodes] = useState<any[]>([]);

  const { register, handleSubmit } = useForm();

  const addNewCode = () => {
    setLoading(true)
    const data = {
      part_id: partId,
      code: newCode
    }

    instance.post('/api/admin/product/parts/codes/store', data, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      }
    })
    .then(d => {
      const status = d.data.status;
      if(status){
        setNewCode('');
        getAllCodes(password)
      }

      setLoading(false)
    })
  }


  const getAllCodes =  (data:any) => {
    axios
      .post(`${import.meta.env.VITE_BASEURL}/api/admin/product/parts/codes`,
        { ...data, part_id: partId },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          }
        },)
      .then((data) => {
        setCodes(data.data.data);
        if (data.data.status) {
          setSafe(true)
        } else {
          alert('password is not correct !!');
        }
        setLoading(false);
      });

  }
  const onSubmit = (data: any) => {
    getAllCodes(data)
    setLoading(true)
  }

  return (
    <div className="flex flex-col gap-4 w-full py-5 container">
      <div className="flex items-center justify-between w-full pt-10 pb-5 ">
        <span className="text-3xl text-white font-semibold">All Codes</span>
        <div className="flex">
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <div className="modal-action w-full">
                <form method="dialog" className=' w-full flex flex-col gap-y-3 '>
                  <button className="btn btn-sm btn-circle !bg-transparent btn-ghost absolute right-2 top-2">✕</button>
                  <input
                    type="text"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="rounded outline-none py-3 text-mainLightBlack border-gray-500 border-2 w-full px-4 "
                    placeholder="Code here"
                  />
                  <button
                    className="btn ms-auto"
                    onClick={addNewCode}
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
          </dialog>
          <button
            onClick={(e) => {
              e.preventDefault();
              (document.getElementById('my_modal_1') as HTMLDialogElement).showModal();
            }}
            className="p-2 btn"
          >
            + Add Code
          </button>
        </div>
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
            <input type="text" {...register('password')} onChange={(e) => setPassword(e.target.value)} className="bg-transparent w-full outline-none border px-5 py-3 border-gray-500 rounded-md " />
            <button type="submit" className="btn ms-auto w-20">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Codes;
