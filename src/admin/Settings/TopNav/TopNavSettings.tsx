import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import instance from '../../../axios';
import Spinner from '../../../utils/Spinner';

function TopNavSettings() {
    const { register, handleSubmit, reset } = useForm<any>();
    const [loading, setLoading] = useState(false);
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;

    useEffect(() => {
        const fetchTopNav = async () => {
            try {
                setLoading(true);
                const response = await instance.get('/api/admin/advertismant', {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                });
                const topNavData = response.data.data[0];
                console.log(topNavData);
                const defaultValues: any = {
                    description: topNavData.description || '',
                    url: topNavData.url || '',
                };
                reset(defaultValues);
            } catch (error) {
                console.error('Failed to fetch topnav data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTopNav();
    }, []);

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            await instance.put('/api/admin/advertismant/update', data, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });
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
