import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICategory } from '../../../models/ICategory';
import { PiArrowsCounterClockwise } from 'react-icons/pi';
import { FaRegTrashAlt } from 'react-icons/fa';
import Spinner from '../../../utils/Spinner';
import instance from '../../../axios';

type Inputs = {
    product_id: string;
    name: string;
    description: string;
    how_to_redeem: string;
    category_id: string;
    image: FileList;
    price: number;
    discount: number;
    popular: boolean;
};

function EditProduct() {
    const [loading, setLoading] = useState<Boolean>(false);
    const { id } = useParams();
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [imagePreview, setImagePreview] = useState<string>('');
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;
    const { register, handleSubmit, unregister, reset, setValue } =
        useForm<Inputs>();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        instance
            .get(`/api/admin/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then((d: any) => {
                const product = d.data.data;
                const defaultValues = {
                    product_id: id,
                    name: product?.name,
                    description: product?.description,
                    how_to_redeem: product?.how_to_redeem,
                    category_id: product?.category_id,
                    price: product?.price,
                    discount: product?.discount,
                    popular: product?.popular === true,
                };
                reset(defaultValues as any);
                setImagePreview(
                    `${import.meta.env.VITE_BASEURL}/public/storage/${
                        product?.image
                    }`
                );
                setLoading(false);
            });
    }, [adminToken, id, reset]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImagePreview(URL.createObjectURL(files[0]));
            setValue('image', files);
        }
    };

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setLoading(true);
        const fd = new FormData();
        for (const i in data) {
            if (i === 'image') {
                if (data.image && data.image[0]) {
                    fd.append(i, data.image[0]);
                }
            } else {
                fd.append(i, (data as any)[i]);
            }
        }
        instance
            .post(`/api/admin/product/update`, fd, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then(() => {
                navigate('/admin/products');
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        instance
            .get(`/api/admin/category`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then((data) => setCategories(data.data.data));
    }, [adminToken]);

    return (
        <div className="flex flex-col gap-4 w-full py-5 container ps-12">
            <div className="flex items-center justify-start w-full relative ">
                <Link to="/admin/products">
                    <FaChevronLeft className="text-main text-2xl absolute -left-7 font-semibold top-[50%] -translate-y-[50%]" />
                </Link>
                <span className="text-3xl text-white font-semibold">
                    Edit product
                </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
                <div className="flex w-full gap-10">
                    <div className="w-full sm:w-1/2 flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="name"
                                className="text-main font-semibold"
                            >
                                Name
                            </label>
                            <input
                                {...register('name')}
                                type="text"
                                className="border border-gray-400 rounded-md bg-transparent p-1"
                            />
                        </div>
                        <div className="flex flex-col gap-2 relative">
                            <label
                                htmlFor="description"
                                className="text-main font-semibold"
                            >
                                Description
                            </label>
                            <textarea
                                className="border border-gray-400 rounded-md bg-transparent p-1"
                                rows={5}
                                {...register('description')}
                            ></textarea>
                        </div>
                        <div className="flex flex-col gap-2 relative">
                            <label
                                htmlFor="how_to_redeem"
                                className="text-main font-semibold"
                            >
                                How to redeem
                            </label>
                            <textarea
                                className="border border-gray-400 rounded-md bg-transparent p-1"
                                rows={5}
                                {...register('how_to_redeem')}
                            ></textarea>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="category"
                                className="text-main font-semibold"
                            >
                                Category
                            </label>
                            <select
                                {...register('category_id')}
                                id="category"
                                className="border border-gray-400 rounded-md bg-transparent p-1"
                            >
                                {categories.map((cat, idx) => (
                                    <option
                                        className="bg-mainLightBlack text-mainWhite"
                                        key={idx}
                                        value={cat.id}
                                    >
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 flex flex-col gap-5">
                        <div className="flex flex-col gap-2 items-start">
                            <label
                                htmlFor="image"
                                className="text-main font-semibold"
                            >
                                Product Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <div className="flex justify-between items-end gap-3 border border-gray-600 rounded-md bg-transparent p-3 w-full">
                                <label
                                    htmlFor="image"
                                    className="flex flex-col justify-end aspect-square border rounded-md cursor-pointer border-dashed border-gray-400 h-[150px]"
                                >
                                    {imagePreview ? (
                                        <img
                                            className="w-[150px] h-[147px] mx-auto "
                                            src={imagePreview}
                                            alt="Selected Image Preview"
                                        />
                                    ) : (
                                        <>
                                            <img
                                                className="size-12 mx-auto"
                                                src="/assets/products/upload.png"
                                                alt="upload image"
                                            />
                                            <span className="text-xs px-5 text-center pb-4">
                                                <span className="underline  text-[#8095FF]">
                                                    click to upload{' '}
                                                </span>{' '}
                                                or drag and drop
                                            </span>
                                        </>
                                    )}
                                </label>
                                <label
                                    htmlFor="image"
                                    className="grow cursor-pointer flex items-center justify-center gap-2 border border-gray-600 p-1 h-10 rounded-lg"
                                >
                                    <PiArrowsCounterClockwise /> replace
                                </label>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImagePreview('');
                                        unregister('image');
                                    }}
                                    className="grow flex items-center justify-center gap-2 border border-gray-600 p-1 h-10 rounded-lg"
                                >
                                    <FaRegTrashAlt /> remove
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <label
                                    htmlFor="popular"
                                    className="text-main font-semibold"
                                >
                                    Popular
                                </label>
                                <input
                                    {...register('popular')}
                                    type="checkbox"
                                    id="popular"
                                    className="border border-gray-400 rounded-md bg-transparent p-1"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full text-end">
                    <button
                        type="submit"
                        className="btn !rounded !w-[150px] !h-[50px] mt-10"
                    >
                        {loading ? 'Editing...' : 'Edit'}
                    </button>
                </div>
            </form>
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <Spinner />
                </div>
            )}
        </div>
    );
}

export default EditProduct;
