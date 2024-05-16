/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdContentCopy } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PaymentManual() {
  const localstorage = JSON.parse(localStorage.getItem('userData') as string);
  const [invoice, setInvoice] = useState<any>(null);
  const userToken = localstorage?.userToken;
  const [cryptoPayData, setCryptoPayData] = useState<any>({})


  useEffect(() => {
    const orderId = JSON.parse(localStorage.getItem('orderId') as string);
    const currencyId = JSON.parse(localStorage.getItem('currencyId') as string);
    axios
      .post(
        `${import.meta.env.VITE_BASEURL}/api/user/order/pay/currancy`,
        {
          order_id: orderId,
          currency_id: currencyId,
          invoice: invoice
        },
        {
          headers: {
            Authorization: `Bearer  ${userToken}`,
          },
        }
      )
      .then((d) => {
        const data = d.data.data;
        setCryptoPayData(data)
        console.log(cryptoPayData)
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <div className="flex flex-col py-10 w-full container bg-black sm:bg-transparent text-mainLightBlack">
      <div className="flex justify-between sm:flex-row flex-col w-full gap-x-12 gap-y-4">

        <div className="flex justify-start flex-col px-10 py-10 sm:bg-white bg-[#000000] text-white sm:text-black grow w-full h-[480px] sm:h-[600px]">
          <div className="flex flex-col gap-y-5">
            <span className="text-2xl font-semibold mb-5">Wallet Connect</span>
            <p>Send the indicated amount to the address below:</p>
            <span className="bg-[#222222] sm:bg-gray-300  text-white sm:text-gray-700 rounded-md text-sm mb-5 p-2 ">
              You need to add network fee into transfer transaction
            </span>
            <div className="flex flex-col gap-y-1">
              <span className="text-2xl">USDT Amount</span>
              <div className="flex justify-between w-full">
                <input
                  type="text"
                  value={14.79}
                  className="py-2 px-3 rounded-s-md bg-[#222222] sm:bg-gray-300 grow  text-white sm:text-gray-700"
                  disabled
                />
                <span className="bg-main rounded-e-md w-[50px] flex justify-center items-center">
                  <MdContentCopy className="text-3xl p-1" />
                </span>
              </div>
              <p className="text-xs">
                Your total transfer - network fee = 14.79
              </p>
            </div>
            <span className="text-2xl">Wallet address</span>
            <div className="flex justify-between w-full">
              <input
                type="text"
                value="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                className="py-2 px-3 rounded-s-md bg-[#222222] sm:bg-gray-300 grow text-white sm:text-gray-700"
                disabled
              />
              <span className="bg-main rounded-e-md w-[50px] flex justify-center items-center">
                <MdContentCopy className="text-3xl p-1" />
              </span>
            </div>
            <div className="flex-col hidden sm:flex">

              <span className="text-2xl">Upload photo</span>
              <label
                htmlFor="file"
                className="w-full py-3 px-4 bg-[#222222] sm:bg-[#CBD3FF] rounded-md border-dashed border-gray-400 text-center text-gray-700 "
              >
                Drop your PDF or PNG file here or  <span className="font-bold">choose file</span>
                <input type="file" id="file" onChange={(e) => setInvoice((e?.target && e?.target?.files && e?.target?.files[0] as any))} className="hidden" />
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-start flex-col px-10 py-10 sm:bg-white bg-[#000000] text-white sm:text-black grow w-full h-[600px]">
          <span className="text-2xl font-semibold mb-5">
            {' '}
            Payment{' '}
          </span>

          <div className="flex flex-col gap-y-7 items-center ">
            <p>Scan this QR code in the Binance app</p>
            <img src="assets/payment/qrcode.png" alt="QR code" />
            <span className="text-red-600 ">back end error</span>
          </div>

          <div className="flex-col flex sm:hidden">
            <span className="text-2xl">Upload photo</span>
            <label
              htmlFor="file"
              className="w-full py-3 px-4 bg-[#CBD3FF] rounded-md border-dashed border-gray-400 text-center text-gray-700 "
            >
              Drop your PDF or PNG file here or  <span className="font-bold">choose file</span>
              <input type="file" id="file" onChange={(e) => setInvoice((e?.target && e?.target?.files && e?.target?.files[0] as any))} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-5  items-center py-14">
        <button className="btn !rounded-md !w-56" >
          {' '}
          Submit
        </button>
        <Link to="/" className="text-white">
          {' '}
          Cancel
        </Link>
      </div>
    </div>
  );
}

export default PaymentManual;
