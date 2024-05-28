import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import instance from '../../../axios';
import Spinner from '../../../utils/Spinner';

function Footer() {
    const { register, handleSubmit, reset } = useForm<any>();
    const [loading, setLoading] = useState(false);
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;

    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                setLoading(true);
                const response = await instance.get('/api/admin/footer', {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                });
                const footerData = response.data;
                const defaultValues = {
                    description: footerData.data.description,
                };
                reset(defaultValues as any);
                console.log(footerData);
            } catch (error) {
                console.error('Failed to fetch footer data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFooterData();
    }, []);

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            await instance.post('/api/admin/footer/update', data, {
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
                            Footer
                        </span>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex items-end gap-3 w-full"
                    >
                        <div className="flex flex-col grow">
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
                        <button className="btn py-2  !rounded-md px-5">
                            Save changes
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}

export default Footer;
