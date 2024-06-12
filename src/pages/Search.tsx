import { Link, useParams } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { IProduct } from '../models/IProduct';
import Spinner from '../utils/Spinner';
import instance from '../axios';

function Search() {
    const [loading, setLoading] = useState<boolean>(false);
    const [Products, setProducts] = useState([]);
    const { keyword } = useParams();

    const getSearchedProducts = () => {
        setLoading(true);
        instance
            .get(`/api/home/products/search?query=${keyword}`)
            .then((d: any) => {
                setProducts(d.data);
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);

        getSearchedProducts();
    }, [keyword]);

    return (
        <div className="flex flex-col gap-4 w-full py-5 container ps-12">
            <div className="flex items-center justify-start w-full relative ">
                <Link to="/">
                    <FaChevronLeft className="text-main text-2xl absolute -left-7 font-semibold top-[50%] -translate-y-[50%]" />
                </Link>
                <span className="text-3xl text-white font-semibold">
                    Search
                </span>
            </div>
            <div className="flex flex-wrap  justify-between sm:justify-start min-h-screen">
                {loading ? (
                    <Spinner />
                ) : (
                    Products.map((pro: IProduct, idx) => (
                        <Link
                            key={idx}
                            to={`/product/${pro.id}`}
                            className="flex flex-col items-center sm:px-4 py-5 w-[45%] lg:w-1/4 "
                        >
                            <Cart product={pro} />
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

export default Search;

const Cart = ({ product }: { product: IProduct }) => {
    return (
        <>
            <div className="bg-white rounded-md p-1 pt-4  sm:p-3 sm:pt-6  flex flex-col items-center w-full ">
                <div className="relative w-[55%] sm:w-1/3 rounded-full bg-black h-[15px] sm:h-[20px] mb-3">
                    <div className="size-4 sm:size-7 rounded-full bg-black absolute -top-[50%] left-[50%] -translate-x-[50%]"></div>
                </div>

                <img
                    src={
                        import.meta.env.VITE_BASEURL +
                        '/public/storage/' +
                        product.image
                    }
                    alt="card"
                    className="w-[130] h-[87px] sm:min-h-[156px]  sm:min-w-full rounded-md "
                />
                <span className="text-gray-500 uppercase my-[4px] sm:my-2 text-[10px] sm:text-base text-nowrap	">
                    {product.name}
                </span>
            </div>
        </>
    );
};
