/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IProduct } from '../models/IProduct';
import Spinner from '../utils/Spinner';
import instance from '../axios';

function Categories() {
    const [loading, setLoading] = useState<boolean>(false);
    const [Products, setProducts] = useState([]);
    const [page, setPage] = useState<number>(1);
    const [pages, setPages] = useState<number>(0);
    const [, setPerPage] = useState(10);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getProducts = (page: number) => {
        setLoading(true);
        instance.get(`/api/home/products?page=${page}`).then((d) => {
            const prods = d.data.data.data;
            const data = d.data.data;
            setPerPage(data.per_page);
            setProducts(prods);
            setPages(Math.ceil(data.total / data.per_page) as number);
            setPage(page);
            setLoading(false);
        });
    };

    useEffect(() => {
        setLoading(true);

        getProducts(page);
    }, [page]);

    return (
        <div className="flex flex-col gap-4 w-full py-5 container ps-12">
            <div className="flex items-center justify-start w-full relative ">
                <Link to="/">
                    <FaChevronLeft className="text-main text-2xl absolute -left-7 font-semibold top-[50%] -translate-y-[50%]" />
                </Link>
                <span className="text-3xl text-white font-semibold">
                    More cards for you
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
            <Pagination
                pages={pages}
                page={page}
                setPage={setPage}
                loading={loading}
            />
        </div>
    );
}

export default Categories;

const Pagination = ({
    pages,
    page,
    loading,
    setPage,
}: {
    pages: number;
    page: number;
    loading: boolean;
    setPage: Dispatch<SetStateAction<number>>;
}) => {
    const Prev = () => {
        !loading ? setPage((old) => (old != 1 ? --old : 1)) : '';
    };
    const Next = () => {
        !loading ? setPage((old) => (old != pages ? ++old : pages)) : '';
    };

    return (
        <div className="flex justify-center items-center w-[350px] mx-auto [&>*]:cursor-pointer">
            <FaChevronLeft className="text-main text-3xl " onClick={Prev} />
            <div
                className={`gap-5 flex justify-center items-center w-[250px] `}
            >
                {Array.from({ length: pages }, (_, idx) => idx + 1).map(
                    (p, idx) => (
                        <span
                            key={idx}
                            className={` border size-10  rounded flex justify-center items-center border-main ${
                                p == page ? 'bg-main text-mainLightBlack' : ''
                            } `}
                            onClick={() => (!loading ? setPage(p) : '')}
                        >
                            {p}
                        </span>
                    )
                )}
            </div>
            <FaChevronRight className="text-main text-3xl" onClick={Next} />
        </div>
    );
};

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
                    src={`${import.meta.env.VITE_BASEURL}/public/storage/${
                        product.image
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
