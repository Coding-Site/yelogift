import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { PiEye } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { ICard } from '../../../models/ICard';
import { GoPencil } from 'react-icons/go';
import { IProduct } from '../../../models/IProduct';
import Spinner from '../../../utils/Spinner';
import instance from '../../../axios';
import { FaTrashCan } from 'react-icons/fa6';

function Products() {
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;
    const [loading, setLoading] = useState(false);
    const [allProducts, setAllProducts] = useState<IProduct[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [term, setTerm] = useState('');

    useEffect(() => {
        setLoading(true);
        instance
            .get(`/api/admin/product`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then((data) => {
                setProducts(data.data.data);
                setAllProducts(data.data.data);
                setLoading(false);
            });
    }, [adminToken]);

    useEffect(() => {
        const filteredProducts = allProducts.filter(
            (pro) =>
                pro?.name.toLowerCase().startsWith(term.toLowerCase()) ||
                pro?.name.toLowerCase().includes(term.toLowerCase())
        );
        setProducts(term ? filteredProducts : allProducts);
    }, [term, allProducts]);

    const deleteProduct = async (id: number) => {
        setLoading(true);
        try {
            const response = await instance.get(
                `/api/admin/product/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                }
            );
            console.log('Delete response:', response);
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== id)
            );
            setAllProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== id)
            );
            setLoading(false);
        } catch (error) {
            console.error('Failed to delete product:', error);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full py-5 container">
            <div className="flex items-center justify-between w-full pt-10 pb-5 ">
                <span className="text-3xl text-white font-semibold">
                    All Products
                </span>

                <Link
                    to="/admin/products/add"
                    className="btn !rounded-md !h-12"
                >
                    <AiOutlinePlus /> Add new product
                </Link>
            </div>

            <div className="flex flex-col gap-2 rounded-t-xl p-4 bg-white text-mainLightBlack">
                <div className="flex justify-between w-full py-5 ps-4">
                    <p className="font-medium text-xl">
                        You have {products.length} card in total{' '}
                    </p>
                    <div className="flex items-center gap-1.5 rounded-full shadow-md border-2 border-gray-400 p-2.5 w-[250px] h-[33px]">
                        <img
                            src="/assets/admin/9035096_search_icon 4.svg"
                            alt="icon"
                            className="w-[20px] h-[16px]"
                        />
                        <input
                            type="text"
                            className="font-normal text-xs outline-none"
                            placeholder="Search a card"
                            onChange={(e) => setTerm(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <Spinner />
                ) : (
                    <table className="text-center table-auto border-collapse">
                        <thead>
                            <tr className="border-b-[30px] border-transparent font-medium">
                                <td>ID</td>
                                <td>Name</td>
                                <td>Category</td>
                                <td>Pic</td>
                                <td>Description</td>
                                <td>Parts</td>
                                <td>Edit</td>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((pro: ICard, idx) => (
                                <tr
                                    key={idx}
                                    className="table-row border-b-2 border-transparent font-medium"
                                >
                                    <td className="font-bold">#{pro.id}</td>
                                    <td className="w-36">{pro.name}</td>
                                    <td>{pro?.category?.name}</td>
                                    <td>
                                        <img
                                            className="size-12 mx-auto"
                                            src={`${
                                                import.meta.env.VITE_BASEURL
                                            }/public/storage/${pro.image}`}
                                            alt=""
                                        />
                                    </td>
                                    <td className="text-xs text-wrap max-w-44 w-44">
                                        {pro.description.slice(0, 15)}
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <Link
                                                className=" "
                                                to={`/admin/products/${pro.id}/parts/`}
                                            >
                                                <PiEye />
                                            </Link>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center gap-2">
                                            <Link
                                                to={`/admin/products/edit/${pro.id}`}
                                            >
                                                <GoPencil />
                                            </Link>
                                            <FaTrashCan
                                                onClick={() =>
                                                    deleteProduct(pro.id)
                                                }
                                                className="cursor-pointer"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Products;
