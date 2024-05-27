/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';
import {  useEffect, useState } from 'react';
import { IProduct } from '../models/IProduct';
import Spinner from '../utils/Spinner';
import instance from '../axios';

function Search() {
    const [loading, setLoading] = useState<boolean>(false);
    const [Products, setProducts] = useState([]);
    const { keyword } = useParams();

    const getSearchedProducts = () => {
        setLoading(true);
        instance.get(`/api/home/products/search?query=${keyword}`).then((d:any) => {
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
            <div className="bg-white rounded-md p-3 pt-6  flex flex-col items-center w-full ">
                <div className="relative w-2/3 sm:w-1/3 rounded-full bg-black h-[20px]">
                    <div className="size-7 rounded-full bg-black absolute -top-[50%] left-[50%] -translate-x-[50%]"></div>
                </div>

                <span className="text-gray-500 uppercase my-2 text-xs sm:text-base">
                    {product.name}
                </span>
                <img
                    src={`${import.meta.env.VITE_BASEURL}/public/storage/${product.image
                        }`}
                    alt="card"
                    className="rounded-md"
                />
            </div>

            <div className="flex justify-start w-full py-2 font-semibold">
                <div className="flex flex-col ">
                    <span>ebay</span>
                    <span>{product.price} SAR</span>
                </div>
            </div>
        </>
    );
};
