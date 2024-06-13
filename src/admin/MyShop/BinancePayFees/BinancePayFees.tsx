import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import instance from '../../../axios';
import Spinner from '../../../utils/Spinner';

function BinancePayFees() {
    const { register, handleSubmit, reset } = useForm<any>();
    const [loading, setLoading] = useState(false);
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;

    useEffect(() => {
        const fetchFeeData = async () => {
            try {
                setLoading(true);
                const response = await instance.get('/api/admin/fee', {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                });
                const feeData = response.data.data;
                const defaultValues: any = {
                    description: feeData.description || '',
                };
                reset(defaultValues);
            } catch (error) {
                console.error('Failed to fetch topnav data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeeData();
    }, []);

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            await instance.put('api/admin/fee/update', data, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });
        } catch (error) {
            console.error('Failed to update fee data:', error);
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
                            Binance Pay Fees
                        </span>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col items-start gap-3 w-full"
                    >
                        <div className="flex flex-col grow w-full">
                            <label
                                htmlFor="description"
                                className="text-main flex flex-col font-semibold gap-y-2 w-full"
                            >
                                Binance Pay Fee
                                <input
                                    {...register('description')}
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

export default BinancePayFees;
