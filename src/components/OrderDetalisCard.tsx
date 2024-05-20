/* eslint-disable @typescript-eslint/no-explicit-any */


function OrderDetalisCard({ orderDetails , order}: { orderDetails: any , order: any}) {

    return (
        <>
            <span className="text-2xl font-semibold mb-5">Order Details</span>
            <div className="flex flex-col gap-3">
                <div className="felx flex-col gap-1">
                    <span className="text-main sm:text-black">Email Address</span>
                    <p className="font-semibold">{orderDetails?.email} </p>
                </div>
                <div className="felx flex-col gap-1">
                    <span className="text-main sm:text-black">Payment method</span>
                    <p className="font-semibold">Binance Pay </p>
                </div>
                <div className="felx flex-col gap-1">
                    <span className="text-main sm:text-black">Invioce id</span>
                    <p className="font-semibold">
                        {orderDetails?.prepayId || 'no invioce id'}{' '}
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-3 mt-5 ">
                <hr className="bg-gray-400" />
                <div className="flex w-full justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold">{order?.price}</span>
                </div>
            </div>
        </>
    );
}

export default OrderDetalisCard;
