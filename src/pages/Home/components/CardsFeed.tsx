import { Link } from 'react-router-dom';
import { IProduct } from '../../../models/IProduct';

function CardsFeed(data: {
    title: string;
    link: string;
    products: IProduct[];
}) {
    const prodCat = data.title;
    return (
        <div className="flex flex-col w-full container py-5">
            <div className="w-full flex justify-between sm:border-b border-0  border-mainWhite border-opacity-65 pb-5">
                <span className="text-mainWhite font-medium">{data.title}</span>
                <Link to={data.link} className="text-main flex sm:gap-6 gap-3">
                    view more
                    <img
                        className="w-6"
                        src="/assets/slider/prev.png"
                        alt="view more"
                    />
                </Link>
            </div>
            <div className="hidden sm:flex overflow-x-auto scrollbar-none gap-x-5 mt-5 mb-8 sm:mb-0">
                {data.products
                    .slice(0, 6)
                    .map((product: IProduct, idx: any) => (
                        // <Link
                        //     to={`/product/${product.id}`}
                        //     key={idx}
                        //     className="min-w-[130px] sm:min-w-[200px]"
                        // >
                        //     <img
                        //         className="min-w-[200px] max-w-[200px] max-h-[134px] min-h-[134px] object-cover"
                        //         src={`${
                        //             import.meta.env.VITE_BASEURL
                        //         }/public/storage/${product.image}`}
                        //     />
                        // </Link>
                        <div
                            key={idx}
                            className="bg-white  flex flex-col justify-stretch items-center max-w-[225] rounded-2xl 	"
                        >
                            <div className="  flex bg-[#EEEEEE] flex-col justify-stretch items-center  py-4 px-3 w-full rounded-2xl">
                                <div className="relative w-1/3 rounded-full bg-black h-[15px]">
                                    <div className="size-5 rounded-full bg-black absolute -top-[50%] left-[50%] -translate-x-[50%]"></div>
                                </div>
                                <img
                                    className="min-w-[200px] max-w-[200px] max-h-[134px] min-h-[134px] object-cover mx-auto min-w-full mt-5  rounded-2xl"
                                    src={`${
                                        import.meta.env.VITE_BASEURL
                                    }/public/storage/${product.image}`}
                                />
                                <div className="flex flex-col text-gray-500 justify-center items-center mt-5">
                                    <span className="text-base	 font-bold text-black">
                                        {product?.name}
                                    </span>
                                    <span className="text-xs  mt-4">
                                        {prodCat}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="hidden sm:flex overflow-x-auto scrollbar-none gap-x-5 mt-5 mb-8 sm:mb-0">
                {data.products
                    .slice(7, data.products.length)
                    .map((product: IProduct, idx: any) => (
                        <div
                            key={idx}
                            className="bg-white  flex flex-col justify-stretch items-center max-w-[225] rounded-2xl 	"
                        >
                            <div className="  flex bg-[#EEEEEE] flex-col justify-stretch items-center  py-4 px-3 w-full rounded-2xl">
                                <div className="relative w-1/3 rounded-full bg-black h-[15px]">
                                    <div className="size-5 rounded-full bg-black absolute -top-[50%] left-[50%] -translate-x-[50%]"></div>
                                </div>
                                <img
                                    className="min-w-[200px] max-w-[200px] max-h-[134px] min-h-[134px] object-cover mx-auto min-w-full mt-5  rounded-2xl"
                                    src={`${
                                        import.meta.env.VITE_BASEURL
                                    }/public/storage/${product.image}`}
                                />
                                <div className="flex flex-col text-gray-500 justify-center items-center mt-5">
                                    <span className="text-base	 font-bold text-black">
                                        {product?.name}
                                    </span>
                                    <span className="text-xs  mt-4">
                                        {prodCat}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="flex sm:hidden justify-start overflow-x-scroll scrollbar-none sm:gap-12 gap-x-4 mt-3 sm:mt-10">
                {data.products.map((product: IProduct, idx) => (
                    <div
                        key={idx}
                        className="bg-white  flex flex-col justify-stretch items-center min-w-[150px] max-w-[150px] rounded-2xl 	"
                    >
                        <div className="  flex bg-[#EEEEEE] flex-col justify-stretch items-center  py-4 px-2 w-full rounded-2xl">
                            <div className="relative w-1/3 rounded-full bg-black h-[15px]">
                                <div className="size-5 rounded-full bg-black absolute -top-[50%] left-[50%] -translate-x-[50%]"></div>
                            </div>
                            <img
                                className="  mx-auto w-full	 mt-5  rounded-2xl max-h-[99px] min-h-[99px]"
                                src={`${
                                    import.meta.env.VITE_BASEURL
                                }/public/storage/${product.image}`}
                            />
                            <div className="flex flex-col text-gray-500 justify-center items-center mt-2">
                                <span className="text-xs font-bold text-black">
                                    {product?.name}
                                </span>
                                <span className="text-xs  mt-2">{prodCat}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CardsFeed;
