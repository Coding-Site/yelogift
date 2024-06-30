import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import instance from '../../axios';
import Spinner from '../../utils/Spinner';

function BinanceAuth() {
    const { register, handleSubmit, reset } = useForm<any>();
    const [loading, setLoading] = useState(false);
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;

    useEffect(() => {
        const fetchBinanceAuthData = async () => {
            try {
                setLoading(true);
                const response = await instance.get('/api/admin/credintial ', {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                });
                const binanceAuthdata = response?.data.data[0];
                const defaultValues: any = {
                    client_id: binanceAuthdata?.client_id || '',
                    redirect_url: binanceAuthdata?.redirect_url || '',
                    scope: binanceAuthdata?.scope || '',
                    state: binanceAuthdata?.state || '',
                    client_secret: binanceAuthdata?.client_secret || '',
                };
                reset(defaultValues);
            } catch (error) {
                console.error('Failed to fetch Contact data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBinanceAuthData();
    }, []);

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            await instance.put('/api/admin/credintial/update/1', data, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });
        } catch (error) {
            console.error('Failed to update contact data:', error);
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
                            Binance Auth
                        </span>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col items-start gap-3 w-full"
                    >
                        <div className="flex flex-col grow w-full">
                            <label
                                htmlFor="client_id"
                                className="text-main flex flex-col font-semibold gap-y-2 w-full"
                            >
                                Client ID
                                <input
                                    {...register('client_id')}
                                    type="text"
                                    className="border border-gray-400 rounded-md bg-transparent p-1"
                                />
                            </label>
                        </div>
                        <div className="flex flex-col grow w-full">
                            <label
                                htmlFor="redirect_url"
                                className="text-main flex flex-col font-semibold gap-y-2 w-full"
                            >
                                Redirect Url
                                <input
                                    {...register('redirect_url')}
                                    type="text"
                                    className="border border-gray-400 rounded-md bg-transparent p-1"
                                />
                            </label>
                        </div>
                        <div className="flex flex-col grow w-full">
                            <label
                                htmlFor="scope"
                                className="text-main flex flex-col font-semibold gap-y-2 w-full"
                            >
                                Scope
                                <input
                                    {...register('scope')}
                                    type="text"
                                    className="border border-gray-400 rounded-md bg-transparent p-1"
                                />
                            </label>
                            <span className="text-[#c62929] mt-2">
                                min scope data is : 'user:email,user:name'
                            </span>
                        </div>
                        <div className="flex flex-col grow w-full">
                            <label
                                htmlFor="state"
                                className="text-main flex flex-col font-semibold gap-y-2 w-full"
                            >
                                state
                                <input
                                    {...register('state')}
                                    type="text"
                                    className="border border-gray-400 rounded-md bg-transparent p-1"
                                />
                            </label>
                            <span className="text-[#c62929] mt-2">
                                (not required)
                            </span>
                        </div>
                        <div className="flex flex-col grow w-full">
                            <label
                                htmlFor="client_secret"
                                className="text-main flex flex-col font-semibold gap-y-2 w-full"
                            >
                                Client Secret
                                <input
                                    {...register('client_secret')}
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

export default BinanceAuth;
