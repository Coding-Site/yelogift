import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import instance from '../../../axios';
import Spinner from '../../../utils/Spinner';

function ContactUsSettings() {
    const { register, handleSubmit, reset } = useForm<any>();
    const [loading, setLoading] = useState(false);
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;

    useEffect(() => {
        const fetchContactData = async () => {
            try {
                setLoading(true);
                const response = await instance.get('/api/admin/contact ', {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                });
                const ContactData = response.data.data[0];
                console.log(ContactData);
                const defaultValues: any = {
                    address: ContactData.address || '',
                    mail_1: ContactData.mail_1 || '',
                    mail_2: ContactData.mail_2 || '',
                    phone_1: ContactData.phone_1 || '',
                    phone_2: ContactData.phone_2 || '',
                };
                reset(defaultValues);
            } catch (error) {
                console.error('Failed to fetch Contact data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchContactData();
    }, []);

    const onSubmit = async (data: any) => {
        console.log(data);
        try {
            setLoading(true);
            await instance.put('/api/admin/contact/update/1', data, {
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
                            Contact US
                        </span>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col items-start gap-3 w-full"
                    >
                        {/* <div className="flex flex-col grow w-full">
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
                        </div> */}
                        <div className="flex flex-col grow w-full">
                            <label
                                htmlFor="address"
                                className="text-main flex flex-col font-semibold gap-y-2 w-full"
                            >
                                Address
                                <input
                                    {...register('address')}
                                    type="text"
                                    className="border border-gray-400 rounded-md bg-transparent p-1"
                                />
                            </label>
                        </div>
                        <div className="flex flex-col grow w-full">
                            <label
                                htmlFor="mail_1"
                                className="text-main flex flex-col font-semibold gap-y-2 w-full"
                            >
                                Mail-1
                                <input
                                    {...register('mail_1')}
                                    type="text"
                                    className="border border-gray-400 rounded-md bg-transparent p-1"
                                />
                            </label>
                        </div>
                        <div className="flex flex-col grow w-full">
                            <label
                                htmlFor="mail_2"
                                className="text-main flex flex-col font-semibold gap-y-2 w-full"
                            >
                                Mail-2
                                <input
                                    {...register('mail_2')}
                                    type="text"
                                    className="border border-gray-400 rounded-md bg-transparent p-1"
                                />
                            </label>
                        </div>
                        <div className="flex flex-col grow w-full">
                            <label
                                htmlFor="phone_1"
                                className="text-main flex flex-col font-semibold gap-y-2 w-full"
                            >
                                Phone-1
                                <input
                                    {...register('phone_1')}
                                    type="text"
                                    className="border border-gray-400 rounded-md bg-transparent p-1"
                                />
                            </label>
                        </div>
                        <div className="flex flex-col grow w-full">
                            <label
                                htmlFor="phone_2"
                                className="text-main flex flex-col font-semibold gap-y-2 w-full"
                            >
                                Phone-2
                                <input
                                    {...register('phone_2')}
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

export default ContactUsSettings;
