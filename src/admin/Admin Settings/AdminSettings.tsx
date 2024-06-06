import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaEnvelope } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

import instance from '../../axios/index';

export default function UserSettings() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<any>();
    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: passwordErrors },
        watch,
    } = useForm<any>();

    const [backError, setBackError] = useState<any>('');
    const [loading, setLoading] = useState<boolean>(false);
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;
    const adminId = localstorage?.adminID;
    const adminMail = localstorage?.adminMail;
    const adminName = localstorage?.adminName;
    const [passwordLoading, setPasswordLoading] = useState<boolean>(false);
    const [passwordSuccess, setPasswordSuccess] = useState<boolean>(false);
    const [dataChangedSuccess, setDataChangedSuccess] =
        useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const defaultValues: any = {
            name: adminName,
            email: adminMail,
        };
        reset(defaultValues as any);
        setLoading(false);
    }, []);

    const onSubmit: SubmitHandler<any> = (data) => {
        setLoading(true);
        instance
            .put(`api/admin/edit/${adminId}`, data, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then((d: any) => {
                if (d.status == 200) {
                    setLoading(false);
                    setDataChangedSuccess(true);
                }
            })
            .catch((err: any) => {
                const msg = err.response.data.message;
                if (msg) {
                    setLoading(false);
                    setBackError(msg);
                }
            });
    };

    const onSubmitPassword: SubmitHandler<any> = (data) => {
        setPasswordLoading(true);
        instance
            .put(`api/admin/reset/password/${adminId}`, data, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then((d: any) => {
                if (d.status == 200) {
                    setPasswordLoading(false);
                    setPasswordSuccess(true);
                }
            })
            .catch((err: any) => {
                setPasswordLoading(false);
                const msg = err.response.data.message;
                if (msg) {
                    setBackError(msg);
                }
            });
    };

    const renderErrorMessage = (error: any) => {
        if (error && typeof error.message === 'string') {
            return (
                <span className="text-red-600 w-full text-center">
                    {error.message}
                </span>
            );
        }
        return null;
    };

    return (
        <div className="w-full ">
            <div className="flex flex-col text-mainWhite ">
                <div className="flex flex-col-reverse sm:flex-row bg-black min-h-[100vh]">
                    <div className=" p-4  flex flex-col w-full ">
                        <div className="p-5 h-1/5 flex flex-col gap-y-10">
                            <h2 className="text-3xl font-semibold">Settings</h2>
                        </div>
                        <div className="flex flex-col md:flex-row gap-5">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="py-10 flex flex-col  justify-center mx-auto items-center gap-5 w-[90%] sm:w-[65%] border-2 border-[#F0B90B] p-10 rounded-xl	"
                            >
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        {...register('name', {
                                            required: true,
                                        })}
                                        className="bg-transparent border rounded-lg w-full ps-12 py-2 placeholder:text-white placeholder:text-xs "
                                        placeholder="Name"
                                    />
                                    <FaUser className="absolute left-4 top-[50%] -translate-y-[50%]" />
                                </div>
                                {renderErrorMessage(errors.name)}
                                <div className="relative w-full">
                                    <input
                                        type="email"
                                        {...register('email', {
                                            required: true,
                                        })}
                                        className="bg-transparent border rounded-lg w-full ps-12 py-2 placeholder:text-white placeholder:text-xs "
                                        placeholder="Email"
                                    />
                                    <FaEnvelope className="absolute left-4 top-[50%] -translate-y-[50%]" />
                                </div>
                                {renderErrorMessage(errors.email)}
                                <div className="relative w-full">
                                    <input
                                        type="password"
                                        {...register('password', {
                                            required: true,
                                        })}
                                        className="bg-transparent border rounded-lg w-full ps-12 py-2 placeholder:text-white placeholder:text-xs "
                                        placeholder="please enter password for confirm"
                                    />
                                    <RiLockPasswordFill className="absolute left-4 top-[50%] -translate-y-[50%]" />
                                </div>
                                {renderErrorMessage(errors.password)}
                                {dataChangedSuccess && (
                                    <span className="text-green-600 w-full text-center">
                                        changed successfully!
                                    </span>
                                )}
                                <button className="btn !w-[80%] !rounded-md mt-4 mx-auto">
                                    {loading ? 'Editing...' : 'Edit'}
                                </button>
                            </form>
                            <form
                                onSubmit={handleSubmitPassword(
                                    onSubmitPassword
                                )}
                                className="py-10 flex flex-col justify-center mx-auto items-center gap-5 w-[90%] sm:w-[65%]  border-2 border-[#F0B90B] p-10 rounded-xl	"
                            >
                                <div className="relative w-full">
                                    <input
                                        type="password"
                                        {...registerPassword('password', {
                                            required: true,
                                        })}
                                        className="bg-transparent border rounded-lg w-full ps-12 py-2 placeholder:text-white placeholder:text-xs "
                                        placeholder="Old Password"
                                    />
                                    <RiLockPasswordFill className="absolute left-4 top-[50%] -translate-y-[50%]" />
                                </div>
                                {renderErrorMessage(
                                    passwordErrors.old_password
                                )}
                                <div className="relative w-full">
                                    <input
                                        type="password"
                                        {...registerPassword('new_password', {
                                            required: true,
                                        })}
                                        className="bg-transparent border rounded-lg w-full ps-12 py-2 placeholder:text-white placeholder:text-xs "
                                        placeholder="New Password"
                                    />
                                    <RiLockPasswordFill className="absolute left-4 top-[50%] -translate-y-[50%]" />
                                </div>
                                {renderErrorMessage(
                                    passwordErrors.new_password
                                )}
                                <div className="relative w-full">
                                    <input
                                        type="password"
                                        {...registerPassword(
                                            'confirm_password',
                                            {
                                                required: true,
                                                validate: (value) =>
                                                    value ===
                                                        watch('new_password') ||
                                                    'Passwords do not match',
                                            }
                                        )}
                                        className="bg-transparent border rounded-lg w-full ps-12 py-2 placeholder:text-white placeholder:text-xs "
                                        placeholder="Confirm New Password"
                                    />
                                    <RiLockPasswordFill className="absolute left-4 top-[50%] -translate-y-[50%]" />
                                </div>
                                {renderErrorMessage(
                                    passwordErrors.confirm_password
                                )}
                                {backError.length > 1 ? (
                                    <span className="text-red-600 w-full text-center">
                                        {backError}
                                    </span>
                                ) : null}
                                {passwordSuccess && (
                                    <span className="text-green-600 w-full text-center">
                                        Password changed successfully!
                                    </span>
                                )}
                                <button className="btn !w-[80%] !rounded-md mt-4 mx-auto">
                                    {passwordLoading
                                        ? 'Changing...'
                                        : 'Change Password'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
