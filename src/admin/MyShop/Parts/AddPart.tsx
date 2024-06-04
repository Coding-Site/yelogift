import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import Spinner from '../../../utils/Spinner';
import { FiCircle } from 'react-icons/fi';
import { FaRegCircleStop } from 'react-icons/fa6';
import { ImCross } from 'react-icons/im';

import instance from '../../../axios';

type Inputs = {
    product_id: string;
    title: string;
    discount: string;
    price: string;
    price_text?: string;
    selling_type: 'auto' | 'manual';
    manual_input?: string;
    code?: string;
};

function AddPart() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [codes, setCodes] = useState<string[]>(['']);
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;
    const { productId } = useParams();
    const { register, handleSubmit, watch } = useForm<Inputs>({
        defaultValues: {
            selling_type: 'auto',
        },
    });

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        setLoading(true);
        instance
            .post(
                `/api/admin/product/parts/store`,
                { ...data, product_id: productId, codes },
                {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                }
            )
            .then(() => {
                setLoading(false);
                navigate('/admin/products');
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const handleAddCode = () => {
        setCodes([...codes, '']);
    };

    const handleCodeChange = (index: number, value: string) => {
        const newCodes = [...codes];
        newCodes[index] = value;
        setCodes(newCodes);
    };

    const handleRemoveCode = (index: number) => {
        const newCodes = codes.filter((_, i) => i !== index);
        setCodes(newCodes);
    };

    return (
        <div className="flex flex-col gap-4 w-full py-5 container ps-12">
            <div className="flex items-center justify-start w-full relative">
                <Link to="/admin/products">
                    <FaChevronLeft className="text-main text-2xl absolute -left-7 font-semibold top-[50%] -translate-y-[50%]" />
                </Link>
                <span className="text-3xl text-white font-semibold">
                    Add new part
                </span>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col"
                >
                    <div className="flex w-full gap-10">
                        <div className="w-full sm:w-1/2 flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="name"
                                    className="text-main font-semibold"
                                >
                                    Title
                                </label>
                                <input
                                    {...register('title')}
                                    type="text"
                                    className="border border-gray-400 rounded-md bg-transparent p-1"
                                />
                            </div>
                            <div className="flex flex-col gap-2 relative">
                                <label
                                    htmlFor="description"
                                    className="text-main font-semibold"
                                >
                                    Price
                                </label>
                                <input
                                    {...register('price')}
                                    type="text"
                                    className="border border-gray-400 rounded-md bg-transparent p-1"
                                />
                            </div>
                            <div className="flex flex-col gap-2 relative">
                                <label
                                    htmlFor="price_text"
                                    className="text-main font-semibold"
                                >
                                    Price Description
                                </label>
                                <input
                                    {...register('price_text')}
                                    type="text"
                                    className="border border-gray-400 rounded-md bg-transparent p-1"
                                />
                            </div>
                            <div className="flex flex-col gap-2 relative">
                                <label
                                    htmlFor="description"
                                    className="text-main font-semibold"
                                >
                                    Discount
                                </label>
                                <input
                                    {...register('discount')}
                                    type="text"
                                    className="border border-gray-400 rounded-md bg-transparent p-1"
                                />
                            </div>
                            <div className="flex flex-col gap-2 relative">
                                <label className="text-main font-semibold">
                                    Selling Type
                                </label>
                                <label
                                    htmlFor="auto"
                                    className="flex items-center gap-x-2"
                                >
                                    <span className="text-main">
                                        {watch('selling_type') === 'auto' ? (
                                            <FaRegCircleStop />
                                        ) : (
                                            <FiCircle />
                                        )}
                                    </span>
                                    <input
                                        {...register('selling_type')}
                                        type="radio"
                                        defaultChecked
                                        id="auto"
                                        value="auto"
                                        className="border hidden border-gray-400 rounded-md bg-transparent p-1"
                                    />
                                    Auto
                                </label>
                                <label
                                    htmlFor="manual"
                                    className="flex items-center gap-x-2"
                                >
                                    <span className="text-main">
                                        {watch('selling_type') === 'manual' ? (
                                            <FaRegCircleStop />
                                        ) : (
                                            <FiCircle />
                                        )}
                                    </span>
                                    <input
                                        {...register('selling_type')}
                                        type="radio"
                                        value="manual"
                                        id="manual"
                                        className="border hidden border-gray-400 rounded-md bg-transparent p-1"
                                    />
                                    Manual
                                </label>
                            </div>
                            {watch('selling_type') === 'auto' && (
                                <div className="flex flex-col gap-2 relative">
                                    <label
                                        htmlFor="code"
                                        className="text-main font-semibold"
                                    >
                                        Code
                                    </label>
                                    {codes.map((code, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <input
                                                type="text"
                                                value={code}
                                                onChange={(e) =>
                                                    handleCodeChange(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                                className="border border-gray-400 rounded-md bg-transparent p-1 w-full"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveCode(index)
                                                }
                                                className="text-red-500"
                                            >
                                                <ImCross />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={handleAddCode}
                                        className="btn !rounded !w-[150px] !h-[30px] mt-2"
                                    >
                                        Add Code
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="w-full text-end mt-5">
                            <button
                                type="submit"
                                className="btn !rounded !w-[150px] !h-[50px]"
                            >
                                Add part
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}

export default AddPart;
