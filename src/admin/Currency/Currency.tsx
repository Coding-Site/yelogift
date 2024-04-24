import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICurrency } from "../../models/ICurrency";
import { useToken } from "../../hooks/useToken";
import axios from "axios";
import { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";


function Currency() {
  const { token } = useToken();
  const targetDialoug: HTMLDialogElement = document.getElementById(
    "my_modal_2"
  ) as HTMLDialogElement;
  // const editDialoug: HTMLDialogElement = document.getElementById('my_modal_3') as HTMLDialogElement;
  const [currenceies] = useState<ICurrency[]>([]);
  const { register, handleSubmit, reset } = useForm<ICurrency>();

  const onSubmit: SubmitHandler<ICurrency> = (data: ICurrency) => {
    axios
      .post(`${import.meta.env.VITE_BASEURL}/api/admin/currency/store`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        reset();
        targetDialoug.close();
      });
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/admin/currency/`, {
        headers: {
          Authorization: `Bearer ${token}}`,
        },
      })
      .then(() => {

          console.log(currenceies)
      });
  }, [handleSubmit]);

  return (
    <div className="flex flex-col gap-4 w-full py-5 container">
      <div className="flex items-center justify-between w-full ">
        <span className="text-3xl text-white font-semibold">Currency</span>

        <Link to="/admin/category/add" className="btn !rounded-md !h-14">
          <AiOutlinePlus /> Add Category
        </Link>
      </div>

      <div className="flex justify-center items-center py-12">
        <button
          className="btn !rounded-md "
          onClick={() => targetDialoug.showModal()}
        >
          Add
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5 text-mainLightBlack  modal-backdrop"
              method="dialog"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Currency Name</label>
                <input
                  type="text"
                  {...register("name")}
                  className="rounded border border-mainLightBlack px-2 py-1 outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Symbol</label>
                <input
                  {...register("symbol")}
                  type="text"
                  className="rounded border border-mainLightBlack px-2 py-1 outline-none"
                />
              </div>

              <div className="flex flex-col gap-4">
                <span>Charges</span>
                <div className="flex justify-between w-full">
                  <div className="flex flex-col gap-2  w-auto">
                    <label htmlFor="name">Fixed Charge</label>
                    <div className=" flex justify-between">
                      <input
                        type="number"
                        min={0}
                        {...register("charge_rate")}
                        className="rounded-s max-w-[150px] border border-mainLightBlack px-2 py-1 outline-none"
                      />
                      <span className="rounded-e bg-mainLightBlack text-mainWhite  p-2 flex justify-center items-center">
                        USD
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2  w-auto">
                    <label htmlFor="name">Fixed Charge</label>
                    <div className=" flex justify-between">
                      <input
                        type="number"
                        min={0}
                        {...register("charge_percent")}
                        className="rounded-s max-w-[150px] border border-mainLightBlack px-2 py-1 outline-none"
                      />
                      <span className="rounded-e bg-mainLightBlack text-mainWhite  p-2 flex justify-center items-center">
                        USD
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn mt-5 !rounded-md px-14 mx-auto"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Charge Rate</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currenceies.map((cur: ICurrency) => (
            <tr>
              <td>{cur.name}</td>
              <td>{cur.symbol}</td>
              <td>{cur.charge_rate}</td>
              <td><GoPencil /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Currency;
