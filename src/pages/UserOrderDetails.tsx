import OrderDetalisCard from "../components/OrderDetalisCard";


function UserOrderDetails() {
  return (
    <div className="flex py-10 w-full container text-mainLightBlack">
      <div className="flex justify-between w-full gap-3">
        <div className="flex justify-start flex-col px-10 py-10 bg-white grow w-1/2">
          
          <OrderDetalisCard />
        
        </div>
        <div className="flex justify-start flex-col px-10 py-10 bg-white grow w-1/2">
         amazon card here !!
        </div>
      </div>
    </div>
  )
}

export default UserOrderDetails