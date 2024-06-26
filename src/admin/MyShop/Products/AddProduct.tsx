import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICategory } from '../../../models/ICategory';
import { PiArrowsCounterClockwise } from 'react-icons/pi';
import { FaRegTrashAlt } from 'react-icons/fa';
import instance from '../../../axios';
import Spinner from '../../../utils/Spinner';

type Inputs = {
    name: string;
    description: string;
    how_to_redeem: string;
    category_id: string;
    image: any;
    price: number;
    discount: number;
    popular: boolean;
};

function AddProduct() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [image, setImage] = useState<any>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;
    const { register, handleSubmit, unregister } = useForm<Inputs>();
    const [loading, setLoading] = useState<Boolean>(false);

    const handleImage = (image: any) => {
        const file = image.target.files[0];
        setImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit: SubmitHandler<Inputs> = (data: any) => {
        setLoading(true);
        const fd = new FormData();
        for (const i in data) {
            fd.append(i, i != 'image' ? data[i] : image);
        }
        instance
            .post(`/api/admin/product/store`, fd, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then(() => {
                setLoading(false);
                navigate('/admin/products');
            })
            .catch((err) => {
                console.error(err);
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
    }, []);

    return (
        <div className="flex flex-col gap-4 w-full py-5 container ps-12">
            <div className="flex items-center justify-start w-full relative ">
                <Link to="/admin/products">
                    <FaChevronLeft className="text-main text-2xl absolute -left-7 font-semibold top-[50%] -translate-y-[50%]" />
                </Link>
                <span className="text-3xl text-white font-semibold">
                    Add new product
                </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
                <div className="flex  w-full gap-10">
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
                                className="border  border-gray-400 rounded-md bg-transparent p-1"
                            >
                                <option className="bg-mainLightBlack text-mainWhite">
                                    Select Category
                                </option>
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
                        <div
                            className="flex gap-2 items-center 
                        w-full 
                        justify-end
                        [&>*]:w-[120px] 
                        [&>*]:h-[50px] 
                        [&>*]:rounded-md  
                        [&>*]:px-3 
                        [&>*]:py-2 
                        [&>*]:border 
                        [&>*]:flex 
                        [&>*]:cursor-pointer 
                        [&>*]:justify-center 
                        [&>*]:items-center 
                        [&>*]:border-gray-400 
                        "
                        ></div>
                        <div className="flex flex-col  gap-2 items-start">
                            <label
                                htmlFor="image"
                                className="text-main font-semibold"
                            >
                                Product Image
                            </label>
                            <input
                                {...register('image')}
                                type="file"
                                id="image"
                                className="hidden"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => handleImage(e)}
                            />
                            <div className="flex justify-between items-end gap-3 border border-gray-600 rounded-md bg-transparent p-3 w-full">
                                <label
                                    htmlFor="image"
                                    className="flex flex-col justify-end aspect-square border rounded-md cursor-pointer  border-dashed  border-gray-400 h-[150px]"
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
                                        unregister('image');
                                        setImage(null);
                                        setImagePreview(null);
                                    }}
                                    className="grow flex items-center justify-center gap-2 border border-gray-600 p-1 h-10 rounded-lg "
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
                <div className="w-full text-end mt-5">
                    <button
                        type="submit"
                        className="btn !rounded !w-[150px] !h-[50px] "
                    >
                        {loading ? 'Adding...' : 'Add Product'}
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

export default AddProduct;
