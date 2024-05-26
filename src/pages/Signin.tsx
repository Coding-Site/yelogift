/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { IoIosLock } from 'react-icons/io';
import { FaEnvelope } from 'react-icons/fa';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import instance from '../axios';
import axios from 'axios';
import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { auth } from '../config/config';
type Inputs = {
    login: string;
    password: string;
};

function Signin() {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { setItem } = useLocalStorage();
    const localstorage = JSON.parse(localStorage.getItem('userData') as string);
    const userToken = localstorage?.userToken;
    const [backError, setBackError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const signInWithGoogle = async () => {
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((res) => {
                console.log(res);
                sendData(res);
            })
            .catch((error) => console.log(error));
    };
    const signInWithFacebook = async () => {
        signInWithPopup(auth, new FacebookAuthProvider())
            .then((res) => {
                console.log(res);
                sendData(res);
            })
            .catch((error) => console.log(error));
    };

    const sendData = (cR: any) => {
        const userData: any = {
            name: cR.user.displayName,
            email: cR.user.email,
            photo: cR.user.photoURL,
            client_id: cR.user.uid,
            provider: cR.providerId,
        };
        instance
            .post(
                `${import.meta.env.VITE_BASEURL}/api/user/auth/social`,
                userData,
                {
                    headers: {
                        'ngrok-skip-browser-warning': true,
                    },
                }
            )
            .then((response: any) => {
                if (response.status === 200) {
                    const userLocal = {
                        userName: response.data.data.user.name,
                        userToken: response.data.data.token,
                        role: 'user',
                    };
                    localStorage.setItem('userData', JSON.stringify(userLocal));
                    navigate('/');
                }
            })
            .catch((error: any) => {
                console.error('Error sending Google sign-in data:', error);
                setBackError(
                    error.response?.data?.message || 'An error occurred'
                );
            });
    };
    const onSubmitt: SubmitHandler<Inputs> = (data) => {
        setLoading(true);
        instance.post(`/api/login`, data);
        axios
            .post(`${import.meta.env.VITE_BASEURL}/api/login`, data, {
                headers: {
                    'ngrok-skip-browser-warning': true,
                },
            })
            .then((d) => {
                console.log(d);
                if (d.data.data.role == 'user') {
                    const data = {
                        userToken: d.data.data.token.token,
                        userName: d.data.data.user.name,
                        role: d.data.data.role,
                    };
                    setItem('userData', JSON.stringify(data));
                    navigate('/');
                } else {
                    const data = {
                        adminToken: d.data.data.token.token,
                        adminName: d.data.data.user.name,
                        role: d.data.data.role,
                    };
                    setItem('adminData', JSON.stringify(data));
                    navigate('/admin');
                }
                setLoading(false);
            })
            .catch((err) => {
                const msg = err.response.data.message;
                console.log(err);
                if (msg) {
                    setLoading(false);
                    setBackError(msg);
                }
            });
    };
    if (userToken !== undefined && userToken !== null)
        return <Navigate to="/" />;
    return (
        <div className="flex flex-col text-mainWhite">
            <div className="flex flex-col-reverse sm:flex-row bg-black sm:bg-mainLightBlack pt-5 sm:pt-0">
                <div className=" p-4  flex flex-col w-full sm:w-1/2 gap-y-10">
                    <div className="p-0 sm:p-5 h-1/5 flex flex-col gap-y-10">
                        <img
                            className="w-28 hidden sm:flex"
                            src="/assets/logo.png"
                            alt="logo"
                        />

                        <h2 className="text-3xl font-semibold">
                            Login to your account
                        </h2>
                        <div
                            className="flex 
                  justify-around 
                  w-full 
                  [&>*]:border 
                  [&>*]:border-gray-300 
                  [&>*]:text-xs 
                  [&>*]:rounded-md 
                  [&>*]:py-2 
                  sm:[&>*]:px-4 
                  [&>*]:px-1
                  gap-x-2 "
                        >
                            <button className="flex gap-x-1 sm:gap-x-2 ">
                                <img
                                    src="assets/signin/google.png"
                                    alt="singin with google"
                                    onClick={() => {
                                        signInWithGoogle();
                                    }}
                                />
                                Google
                            </button>
                            <button className="flex gap-x-1 sm:gap-x-2 ">
                                <img
                                    src="assets/signin/facebook.png"
                                    alt="singin with google"
                                    onClick={() => signInWithFacebook()}
                                />
                                Facebook
                            </button>
                            <button className="flex gap-x-1 sm:gap-x-2  ">
                                <img
                                    src="assets/signin/binance.png"
                                    alt="singin with google"
                                />
                                Binanace
                            </button>
                        </div>
                    </div>
                    <div className="relative mt-10">
                        <hr className="bg-mainWhite " />
                        <span className="absolute left-[50%] -translate-x-[50%] -top-2 bg-black sm:bg-mainLightBlack px-4 text-nowrap text-xs">
                            continue with email or phone number
                        </span>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmitt)}
                        className="py-10 flex flex-col justify-center mx-auto items-center gap-5 w-[65%]"
                    >
                        <div className="relative w-full">
                            <input
                                type="text"
                                {...register('login', { required: true })}
                                className="bg-transparent border rounded-lg w-full ps-12 py-2 placeholder:text-white placeholder:text-xs "
                                placeholder="Email or phone number"
                            />
                            <FaEnvelope className="absolute left-4 top-[50%] -translate-y-[50%]" />
                        </div>
                        {errors.login && (
                            <span className="text-red-600 w-full text-center">
                                This field is required
                            </span>
                        )}
                        <div className="relative w-full">
                            <input
                                {...register('password', { required: true })}
                                type="password"
                                className="bg-transparent border w-full rounded-lg ps-12 py-2 placeholder:text-white placeholder:text-xs placeholder:font-light"
                                placeholder="Enter password"
                            />
                            <IoIosLock className="absolute left-4 top-[50%] -translate-y-[50%]" />
                        </div>
                        {errors.password && (
                            <span className="text-red-600 w-full text-center">
                                This field is required
                            </span>
                        )}
                        {backError.length > 1 ? (
                            <span className="text-red-600 w-full text-center">
                                {backError}
                            </span>
                        ) : (
                            ''
                        )}
                        <div className="flex justify-between w-full items-center">
                            <label className="cursor-pointer label text-xs p-0">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="checkbox checkbox-warning checkbox-sm me-4  rounded-md"
                                />
                                remember me
                            </label>
                            <Link
                                to="/"
                                className="text-main underline text-xs"
                            >
                                forget password?
                            </Link>
                        </div>
                        <button className="btn !w-[80%] !rounded-md mt-12 mx-auto">
                            {loading ? 'loading...' : 'login'}
                        </button>
                        <Link className="text-xs" to="/signup">
                            Sign Up
                        </Link>
                    </form>
                </div>
                <div className="w-full px-9 sm:px-0 sm:w-1/2 bg-black">
                    <img
                        className="flex sm:hidden"
                        src="/assets/login.png"
                        alt="login hero"
                    />
                    <img
                        className="hidden sm:flex"
                        src="/assets/admin/login-hero.jpg"
                        alt="login hero"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Signin;
