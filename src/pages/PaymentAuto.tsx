import { useEffect } from "react";
import OrderDetalisCard from "../components/OrderDetalisCard";
import { RiShareBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function PaymentAuto() {
  const binancePayData = JSON.parse(localStorage.getItem('binancePayData') as string)

  useEffect(() => {
    console.log(binancePayData)
  }, [])
  return (
    <div className="flex py-10 w-full container text-mainLightBlack">
      <div className="flex justify-between w-full gap-3">
        <div className="flex justify-start flex-col px-10 py-10 bg-white grow w-1/2">
          <OrderDetalisCard order={binancePayData.order} />
        </div>
        <div className="flex justify-start flex-col px-10 py-10 bg-white grow w-1/2">
          <span className="text-2xl font-semibold mb-5"> Payment </span>

          <div className="flex flex-col gap-y-2 items-center ">
            <p>Scan this QR code in the Binance app</p>
            <img className="w-60" src={binancePayData.pay_data.qrcodeLink} alt="QR code" />
            <Link to={binancePayData.pay_data.checkoutUrl} className="btn -mb-[200px] flex gap-x-2 items-center !rounded-full py-5 !h-auto !bg-mainLightColor">
              <RiShareBoxLine />
              Pay on binance.com
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentAuto;
