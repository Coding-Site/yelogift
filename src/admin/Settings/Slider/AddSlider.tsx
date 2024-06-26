import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../utils/Spinner';
import instance from '../../../axios';

type Inputs = {
    title: string;
    description: string;
    image: string;
    url: string;
};

function AddSlider() {
    const { register, handleSubmit } = useForm<Inputs>();
    const [loading, setLoading] = useState(false);
    const [backError, setBackError] = useState('');
    const navigate = useNavigate();
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;
    const [image, setImage] = useState<any>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImage = (image: any) => {
        const file = image.target.files[0];
        setImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setLoading(true);
        const fd = new FormData();

        for (const i in data) {
            fd.append(i, i != 'image' ? (data as any)[i] : image);
        }
        instance
            .post(`/api/admin/slider/store`, fd, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then(() => {
                setLoading(false);
                navigate('/admin/slider');
            })
            .catch((err) => {
                console.error(err);
                const msg = err.response.data.message;
                setBackError(msg);
            });
    };
    return (
        <div className="flex flex-col container py-5 px-2 bg-[#1F1F1F]">
            <div className="flex justify-between items-center mb-6">
                <span className="ps-3 border-mainLightColor border-s-4 font-medium">
                    Add Slider
                </span>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    action=""
                    className="flex w-full flex-col justify-between gap-x-6"
                >
                    <div className="flex w-full justify-between gap-x-6">
                        <div className="flex flex-col w-1/2 gap-y-4">
                            <label
                                htmlFor="name"
                                className="text-main flex flex-col font-semibold gap-y-2 w-full"
                            >
                                Title
                                <input
                                    {...register('title')}
                                    type="text"
                                    className="border border-gray-400 rounded-md bg-transparent p-1"
                                />
                            </label>
                            <label
                                htmlFor="url"
                                className="text-main flex flex-col font-semibold gap-y-2 w-full"
                            >
                                URL
                                <input
                                    {...register('url')}
                                    type="text"
                                    className="border border-gray-400 rounded-md bg-transparent p-1"
                                />
                            </label>
                            <label
                                htmlFor="description"
                                className="text-main font-semibold flex flex-col gap-y-2 w-full"
                            >
                                Description
                                <textarea
                                    {...register('description')}
                                    rows={10}
                                    className="border border-gray-400 w-full rounded-md bg-transparent p-1"
                                ></textarea>
                            </label>
                        </div>
                        <div className="flex flex-col w-1/2 gap-y-4">
                            <div className="flex flex-col grow gap-2 items-start">
                                <label
                                    htmlFor="image"
                                    className="text-main font-semibold"
                                >
                                    product image
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

                                <label
                                    htmlFor="image"
                                    className="flex flex-col w-full grow justify-center  border rounded-md cursor-pointer  border-dashed  border-gray-400 "
                                >
                                    {imagePreview ? (
                                        <img
                                            className="w-[500px] h-[auto] mx-auto "
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
                            </div>
                        </div>
                    </div>
                    {backError && (
                        <span className="text-red-600 w-full text-center my-3">
                            {backError}
                        </span>
                    )}
                    <button
                        type="submit"
                        className="btn mt-5 mx-auto my-3 !rounded px-5 "
                    >
                        {' '}
                        Add
                    </button>
                </form>
            )}
        </div>
    );
}

export default AddSlider;
