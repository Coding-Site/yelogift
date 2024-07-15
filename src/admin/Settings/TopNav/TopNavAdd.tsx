import { useForm } from 'react-hook-form';
import { useState } from 'react';
import instance from '../../../axios';
import Spinner from '../../../utils/Spinner';
import { useNavigate } from 'react-router-dom';

function TopNavSettings() {
    const { register, handleSubmit } = useForm<any>({
        defaultValues: {
            color1: '#585858',
            color2: '#ffffff',
        },
    });
    const [loading, setLoading] = useState(false);
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            await instance.post(`/api/admin/advertismant/store`, data, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });
            navigate('/admin/topnav-settings');
        } catch (error) {
            console.error('Failed to update footer data:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col container py-5 px-2 bg-[#1F1F1F]">
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <div className="flex justify-between mb-6">
                        <span className="ps-3 border-mainLightColor border-s-4 font-medium">
                            Advertisment Top Nav
                        </span>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col items-start gap-3 w-full"
                    >
                        <div className="flex flex-col grow w-full">
                            <label
                                htmlFor="description "
                                className="text-main mb-4"
                            >
                                Description
                            </label>
                            <textarea
                                {...register('description')}
                                name="description"
                                className="bg-transparent p-2 border border-gray-400 rounded-md outline-none grow"
                                id="description"
                                cols={30}
                                rows={10}
                            ></textarea>
                        </div>
                        <div className="flex flex-col grow w-full">
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
                        </div>
                        <div className="flex gap-5">
                            <div>
                                <label
                                    htmlFor="color1"
                                    className="text-main flex flex-col font-semibold gap-y-2 w-full"
                                >
                                    Background Color
                                    <input
                                        {...register('color1')}
                                        type="color"
                                        className="border border-gray-400 rounded-md p-1"
                                    />
                                </label>
                            </div>
                            <div>
                                <label
                                    htmlFor="color2"
                                    className="text-main flex flex-col font-semibold gap-y-2 w-full"
                                >
                                    Font Color
                                    <input
                                        {...register('color2')}
                                        type="color"
                                        className="border border-gray-400 rounded-md p-1"
                                    />
                                </label>
                            </div>
                        </div>
                        <button className="btn py-2  !rounded-md px-5">
                            Save changes
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}

export default TopNavSettings;
