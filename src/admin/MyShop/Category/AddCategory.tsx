/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PiArrowsCounterClockwise } from 'react-icons/pi';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useState } from 'react';
import Spinner from '../../../utils/Spinner';
import instance from '../../../axios';

type Inputs = {
    name: string;
    icon: any;
};

function AddCategory() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, unregister } = useForm<Inputs>();

    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setLoading(true);

        const fd = new FormData();
        for (const i in data) {
            fd.append(i, i != 'icon' ? (data as any)[i] : data.icon[0]);
        }

        instance
            .post(
                `/api/admin/category/store`,
                fd,
                {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                }
            )
            .then(() => {
                setLoading(false);
                navigate('/admin/category');
            });
    };

    return (
        <div className="flex flex-col gap-4 w-full py-10 container ps-12">
            <div className="flex items-center justify-start w-full relative ">
                <Link to="/admin/category">
                    <FaChevronLeft className="text-main text-2xl absolute -left-7 font-semibold top-[50%] -translate-y-[50%]" />
                </Link>
                <span className="text-3xl text-white font-semibold">
                    Add new category
                </span>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col "
                >
                    <div className="flex w-full gap-10">
                        <div className="w-1/2 flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="name"
                                    className="text-main font-semibold"
                                >
                                    {' '}
                                    Name
                                </label>
                                <input
                                    {...register('name')}
                                    type="text"
                                    className="border border-gray-400 rounded-md bg-transparent p-1"
                                />
                            </div>

                            <div className="w-1/2 flex flex-col  gap-2 items-start">
                                <label
                                    htmlFor="icon"
                                    className="text-main font-semibold"
                                >
                                    product icon
                                </label>
                                <input
                                    {...register('icon')}
                                    type="file"
                                    id="icon"
                                    className="hidden"
                                />
                            </div>
                            <div className="flex justify-between items-end gap-3 border border-gray-600 rounded-md bg-transparent p-3 w-full">
                                <label
                                    htmlFor="icon"
                                    className="flex flex-col justify-end aspect-square border rounded-md cursor-pointer  border-dashed  border-gray-400 h-[150px]"
                                >
                                    <img
                                        className="size-12 mx-auto"
                                        src="/assets/products/upload.png"
                                        alt="upload icon"
                                    />
                                    <span className="text-xs px-5 text-center pb-4">
                                        <span className="underline  text-[#8095FF]">
                                            click to upload{' '}
                                        </span>{' '}
                                        or drag and drop
                                    </span>
                                </label>
                                <label
                                    htmlFor="icon"
                                    className="grow cursor-pointer flex items-center justify-center gap-2 border border-gray-600 p-1 h-10 rounded-lg"
                                >
                                    <PiArrowsCounterClockwise /> replace
                                </label>
                                <button
                                    type="button"
                                    onClick={() => unregister('icon')}
                                    className="grow flex items-center justify-center gap-2 border border-gray-600 p-1 h-10 rounded-lg "
                                >
                                    <FaRegTrashAlt /> remove
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full text-end">
                        <button
                            type="submit"
                            className="btn !rounded !w-[150px] !h-[50px] "
                        >
                            {' '}
                            Add category
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default AddCategory;
