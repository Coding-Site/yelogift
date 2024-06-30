import { SubmitHandler, useForm } from 'react-hook-form';
import { ICurrency } from '../../models/ICurrency';
import { useEffect, useState } from 'react';
// import { GoPencil } from 'react-icons/go';
import instance from '../../axios';
import { FaTrash } from 'react-icons/fa6';

function Currency() {
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;
    const [currencies, setCurrencies] = useState<any>([]);
    const { register, handleSubmit, reset } = useForm<any>();
    const [image, setImage] = useState<any>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [doo, setDoo] = useState<boolean>(false);

    const handleImage = (image: any) => {
        const file = image.target.files[0];
        setImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit: SubmitHandler<ICurrency> = (data: any) => {
        const fd = new FormData();
        for (const key in data) {
            if (key !== 'image') {
                fd.append(key, data[key]);
            }
        }
        fd.set('image', image);

        instance
            .post(`/api/admin/currency/store`, fd, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(() => {
                reset();
                const targetDialog: HTMLDialogElement = document.getElementById(
                    'my_modal_2'
                ) as HTMLDialogElement;
                if (targetDialog) {
                    targetDialog.close();
                }
                setDoo(!doo);
            });
    };

    useEffect(() => {
        instance
            .get(`/api/admin/currency`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then((response) => {
                setCurrencies(response.data.data);
            });
    }, [adminToken, doo]);

    const handleAddButtonClick = () => {
        const targetDialog: HTMLDialogElement = document.getElementById(
            'my_modal_2'
        ) as HTMLDialogElement;
        if (targetDialog) {
            targetDialog.showModal();
        }
    };

    const handleDeleteCurencies = (id: any) => {
        instance
            .get(`/api/admin/currency/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then(() => {
                setDoo(!doo);
            });
    };

    return (
        <div className="flex flex-col gap-4 w-full py-5 container">
            <div className="flex items-center justify-between w-full">
                <span className="text-3xl text-white font-semibold">
                    Currency
                </span>
            </div>

            <div className="flex justify-center items-center py-12">
                <button
                    className="btn !rounded-md !w-48"
                    onClick={handleAddButtonClick}
                >
                    Add
                </button>
                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-5 text-mainLightBlack modal-backdrop"
                            method="dialog"
                        >
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name">Currency Name</label>
                                <input
                                    type="text"
                                    {...register('name')}
                                    className="rounded border border-mainLightBlack px-2 py-1 outline-none"
                                />
                            </div>

                            <div className="flex  justify-between">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="symbol">Symbol</label>
                                    <input
                                        {...register('symbol')}
                                        type="text"
                                        className="rounded border border-mainLightBlack px-2 py-1 outline-none"
                                    />
                                </div>
                                <div>
                                    {' '}
                                    <div className="flex flex-col  gap-2 items-start">
                                        <label
                                            htmlFor="image"
                                            className="text-main font-semibold"
                                        >
                                            currency icon{' '}
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
                                        <div className="flex justify-between items-end gap-3 border border-gray-600 rounded-md bg-transparent p-3 w-fit">
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
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <span>Charges</span>
                                <div className="flex justify-between w-full">
                                    <div className="flex flex-col gap-2 w-auto">
                                        <label htmlFor="charge_rate">
                                            Fixed Charge
                                        </label>
                                        <div className="flex justify-between">
                                            <input
                                                type="number"
                                                min={0}
                                                {...register('charge_rate')}
                                                className="rounded-s max-w-[150px] border border-mainLightBlack px-2 py-1 outline-none"
                                            />
                                            <span className="rounded-e bg-mainLightBlack text-mainWhite p-2 flex justify-center items-center">
                                                USD
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 w-auto">
                                        <label htmlFor="charge_percent">
                                            Percent charge
                                        </label>
                                        <div className="flex justify-between">
                                            <input
                                                type="number"
                                                min={0}
                                                {...register('charge_percent')}
                                                className="rounded-s max-w-[150px] border border-mainLightBlack px-2 py-1 outline-none"
                                            />
                                            <span className="rounded-e bg-mainLightBlack text-mainWhite p-2 flex justify-center items-center">
                                                %
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn mt-5 !rounded-md px-14 mx-auto"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Icon</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Charge Rate</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currencies.map((cur: any) => (
                        <tr className="text-center" key={cur.id}>
                            <td>
                                <img
                                    className="size-12 mx-auto"
                                    src={`${
                                        import.meta.env.VITE_BASEURL
                                    }/public/storage/${cur.icon}`}
                                    alt="icons"
                                />
                            </td>
                            <td>{cur.name}</td>
                            <td>{cur.symbol}</td>
                            <td>{cur.charge_rate}</td>
                            <td>
                                <FaTrash
                                    onClick={() =>
                                        handleDeleteCurencies(cur.id)
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Currency;
