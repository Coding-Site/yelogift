import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';
import { SubmitHandler, useForm } from 'react-hook-form';
import instance from '../../axios';
import Spinner from '../../utils/Spinner';

function EditPayment() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currency, setCurrency] = useState<any>([]);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;
    const { register, handleSubmit, reset } = useForm<any>();
    const [loading, setLoading] = useState<Boolean>(false);

    const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setImage(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            console.error('Selected file is not an image');
        }
    };

    useEffect(() => {
        setLoading(true);
        instance
            .get(`/api/admin/payment/setting/${id}`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then((d: any) => {
                const item = d.data.data;
                const defaultValues = {
                    payment_id: id,
                    address: item?.address,
                    blockchain_type: item?.blockchain_type,
                    currency_id: item?.currency_id,
                };
                reset(defaultValues as any);
                setImagePreview(
                    `${import.meta.env.VITE_BASEURL}/public/storage/${
                        item?.payment_qr
                    }`
                );
                setLoading(false);
            });
    }, [adminToken, id, reset]);

    const onSubmit: SubmitHandler<any> = (data: any) => {
        setLoading(true);
        const fd = new FormData();
        for (const key in data) {
            if (key !== 'payment_qr') {
                fd.append(key, data[key]);
            }
        }
        if (image) {
            fd.append('payment_qr', image);
        }

        instance
            .post(`/api/admin/payment/setting/update`, fd, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(() => {
                setLoading(false);
                navigate('/admin/payment-setting');
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        instance
            .get(`/api/admin/currency`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then((data) => setCurrency(data.data.data));
    }, [adminToken]);

    return (
        <div className="flex flex-col gap-4 w-full py-5 container ps-12">
            <div className="flex items-center justify-start w-full relative ">
                <Link to="/admin/payment-setting">
                    <FaChevronLeft className="text-main text-2xl absolute -left-7 font-semibold top-[50%] -translate-y-[50%]" />
                </Link>
                <span className="text-3xl text-white font-semibold">
                    Edit payment
                </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
                <div className="flex justify-between w-full gap-10">
                    <div className="w-full sm:w-1/2 flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="address"
                                className="text-main font-semibold"
                            >
                                Wallet Address
                            </label>
                            <input
                                {...register('address')}
                                type="text"
                                className="border border-gray-400 rounded-md bg-transparent p-1"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="currency_id"
                                className="text-main font-semibold"
                            >
                                Currency
                            </label>
                            <select
                                {...register('currency_id')}
                                id="currency_id"
                                className="border  border-gray-400 rounded-md bg-transparent p-1"
                            >
                                <option className="bg-mainLightBlack text-mainWhite">
                                    Select Currency
                                </option>
                                {currency.map((cat: any, idx: any) => (
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
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="blockchain_type"
                                className="text-main font-semibold"
                            >
                                Blockchain type
                            </label>
                            <input
                                {...register('blockchain_type')}
                                type="text"
                                className="border border-gray-400 rounded-md bg-transparent p-1"
                            />
                        </div>
                    </div>
                    <div className="w-fit  flex flex-col gap-5">
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
                                htmlFor="payment_qr"
                                className="text-main font-semibold"
                            >
                                Payment QR
                            </label>
                            <input
                                {...register('payment_qr')}
                                type="file"
                                id="payment_qr"
                                className="hidden"
                                onChange={handleImage}
                            />
                            <div className="flex justify-between items-end gap-3 border border-gray-600 rounded-md bg-transparent p-3 w-fit">
                                <label
                                    htmlFor="payment_qr"
                                    className="flex flex-col justify-end aspect-square border rounded-md cursor-pointer  border-dashed  border-gray-400 h-[300px] w-[300px]"
                                >
                                    {imagePreview ? (
                                        <img
                                            className="w-[auto] max-w-[300px] h-[auto] max-h-[300px] mx-auto "
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
                </div>
                <div className="w-full text-end mt-5">
                    <button
                        type="submit"
                        className="btn !rounded !w-[150px] !h-[50px] "
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

export default EditPayment;
