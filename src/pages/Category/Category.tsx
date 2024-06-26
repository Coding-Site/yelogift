/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
// import { FaStar } from 'react-icons/fa';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IProduct } from '../../models/IProduct';
import instance from '../../axios';
import { Helmet } from 'react-helmet-async';

function Category() {
    const [loading, setLoading] = useState<boolean>(false);
    const [category, setCategory] = useState<any>();
    const { categoryId } = useParams();
    const [Products, setProducts] = useState([]);
    const [page, setPage] = useState<number>(1);
    const [pages, setPages] = useState<number>(0);
    const [, setPerPage] = useState(10);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setLoading(true);
        instance.get(`/api/home/categories/${categoryId}`).then((d) => {
            const cat = d.data.data;
            const data = cat.products;
            const prods = data.data;
            setPerPage(data.per_page);
            setProducts(prods);
            setPages(Math.ceil(data.total / data.per_page) as number);
            setPage(page);
            setLoading(false);
            setCategory(cat);
            setLoading(false);
        });
    }, []);

    const [metaDesc, setMetaDesc] = useState(
        'Discover a variety of game gift cards for top games. Shop now for the best deals and instant delivery. Enhance your gaming experience with our easy-to-use gift cards.'
    );

    const [metaKeyWord, setMetaKeyWord] = useState<any>(
        'seo, search engine optimization'
    );

    useEffect(() => {
        instance.get(`/api/pages/3`).then((d) => {
            const page = d.data.data;
            setMetaDesc(page.content);
            setMetaKeyWord(page.tags);
        });
    }, []);

    return (
        <>
            <Helmet>
                <title>
                    {category
                        ? `${category.name} | Yelo-Gift`
                        : `Product | Yelo-Gift`}
                </title>
                <link rel="canonical" href={`"/categories/"${categoryId}`} />
                <meta name="description" content={metaDesc} />
                <meta
                    name="keywords"
                    content={metaKeyWord.replace(/[\[\]]/g, '')}
                />
            </Helmet>

            <div className="flex flex-col gap-4 w-full py-5 container sm:ps-12 min-h-screen">
                <div className="flex items-center justify-start w-full relative ">
                    <Link to="/">
                        <FaChevronLeft className="text-main text-2xl absolute -left-7 font-semibold top-[50%] -translate-y-[50%]" />
                    </Link>
                    <span className="text-3xl text-white font-semibold">
                        {category?.name}
                    </span>
                </div>
                <div className="flex flex-wrap justify-between sm:justify-start ">
                    {loading ? (
                        <div>Loading ...</div>
                    ) : (
                        Products.map((pro: IProduct, idx: any) => (
                            <Link
                                key={idx}
                                to={`/product/${pro.id}`}
                                className="flex flex-col items-center sm:px-4 py-5 w-[45%] lg:w-1/4"
                            >
                                <Cart product={pro} />
                            </Link>
                        ))
                    )}
                </div>
                <div className="mt-[50px]">
                    <Pagination
                        pages={pages}
                        page={page}
                        setPage={setPage}
                        loading={loading}
                    />
                </div>
            </div>
        </>
    );
}

export default Category;

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
        <div className="w-[150px] flex justify-center items-center sm:w-[350px]  mx-auto [&>*]:cursor-pointer">
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
