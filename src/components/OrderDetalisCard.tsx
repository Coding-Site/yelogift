/* eslint-disable @typescript-eslint/no-explicit-any */


function OrderDetalisCard({ order }: { order: any }) {

    return (
        <>
            <span className="text-2xl font-semibold mb-5">Order Details</span>
            <div className="flex flex-col gap-3">
                <div className="felx flex-col gap-1">
                    <span className="text-main sm:text-black">Email Address</span>
                    <p className="font-semibold">{order?.email} </p>
                </div>
                <div className="felx flex-col gap-1">
                    <span className="text-main sm:text-black">Payment method</span>
                    <p className="font-semibold">Binance Pay </p>
                </div>
                <div className="felx flex-col gap-1">
                    <span className="text-main sm:text-black">Invioce id</span>
                    <p className="font-semibold">
                        {order?.invioce?.id || 'no invioce id'}{' '}
                    </p>
                </div>
            </div>
            {/* <pre>{JSON.stringify(order, null, 2)}</pre> */}
            <div className="flex flex-col gap-3 mt-5 ">
             
                {order?.order_product.map((pro: any, idx: any) => (
                    <div
                        key={idx}
                        className="flex border-t border-gray-300 justify-start items-start gap-x-3 gap-y-3 py-4"
                    >
                        <img
                            src={`${
                                import.meta.env.VITE_BASEURL
                            }/storage/${pro.product?.image}`}
                            className="aspect-video w-20"
                            alt=" cart product"
                        />
                        <div className="flex flex-col gap-0">
                            <span className="text-gray-400 uppercase">
                                {pro.product?.price} SAR
                            </span>
                        </div>
                    </div>
                ))}
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
