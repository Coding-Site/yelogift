import { Link, Navigate, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { FaEnvelope } from 'react-icons/fa';
import { SubmitHandler, useForm } from 'react-hook-form';
import instance from '../axios/index';
import { useState, useEffect } from 'react';
import { useToken } from '../hooks/useToken';
import { FaUser } from 'react-icons/fa';
import { IoPhonePortrait } from 'react-icons/io5';
import { RiLockPasswordFill } from 'react-icons/ri';
import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { auth } from '../config/config';
import axios from 'axios';
type Inputs = {
    name: string;
    email: string;
    phone: string;
    password: string;
};

function Signup() {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { userToken } = useToken();
    const [backError, setBackError] = useState('');
    const [binanceData, setBinanceData] = useState<any>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    useEffect(() => {
        const fetchBinanceAuthData = async () => {
            try {
                setLoading(true);
                const response = await instance.get('/api/credintials ');
                setBinanceData(response.data.data[0]);
            } catch (error) {
                console.error('Failed to fetch Contact data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBinanceAuthData();
    }, []);

    const signInWithBinance = async () => {
        const clientId = binanceData?.client_id || ' ';
        const redirectUrl = binanceData?.redirect_url || ' ';
        const encodedRedirectUrl = encodeURIComponent(redirectUrl);
        const scope = binanceData?.scope || 'user:email,user:name';
        const encodedScope = encodeURIComponent(scope);

        // const state = 'YOUR_STATE'; &state=${state}
        const url = `https://accounts.binance.com/en/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodedRedirectUrl}&scope=${encodedScope}`;
        const popup: any = window.open(url, '_blank', 'width=600,height=600');

        // const userData: any = {
        //     name: null,
        //     email:null,
        //     photo: null,
        //     client_id: null,
        //     provider: null,
        // };

        const polling = setInterval(() => {
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(polling);
            }
            try {
                if (popup.location.href.includes('https://yelogift.net/')) {
                    clearInterval(polling);
                    const code = new URLSearchParams(popup.location.search).get(
                        'code'
                    );
                    popup.close();
                    axios
                        .post('/api/auth/social', { code })
                        .then((response: any) => {
                            console.log(response.data);
                        })
                        .catch((error) => {
                            console.error(
                                'Error sending Binance sign-in data:',
                                error
                            );
                        });
                }
                console.log('done');
            } catch (error) {
                console.error(error);
            }
        }, 1000);
    };

    const signInWithGoogle = async () => {
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((res) => {
                sendData(res);
            })
            .catch((error) => console.log(error));
    };
    const signInWithFacebook = async () => {
        signInWithPopup(auth, new FacebookAuthProvider())
            .then((res) => {
                sendData(res);
            })
            .catch((error) => console.log(error));
    };

    const sendData = (cR: any) => {
        const userData: any = {
            name: cR?.user.displayName,
            email: cR?.user.email,
            photo: cR?.user.photoURL,
            client_id: cR?.user.uid,
            provider: cR?.providerId,
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
                        userName: response?.data.data.user.name,
                        userToken: response?.data.data.token,
                        role: 'user',
                    };
                    localStorage.setItem('userData', JSON.stringify(userLocal));
                    navigate('/');
                    window.location.reload();
                }
            })
            .catch((error: any) => {
                console.error('Error sending Google sign-in data:', error);
                setBackError(
                    error.response?.data?.message || 'An error occurred'
                );
            });
    };
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setLoading(true);
        instance
            .post(
                `${import.meta.env.VITE_BASEURL}/api/user/auth/register`,
                data
            )
            .then((d: any) => {
                if (d.status == 200) {
                    setLoading(false);
                    navigate('/signin');
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

    if (userToken) return <Navigate to="/" />;
    return (
        <div className="flex flex-col text-mainWhite">
            <div className="flex flex-col-reverse sm:flex-row bg-black sm:bg-mainLightBlack pt-5 sm:pt-0">
                <div className=" p-4  flex flex-col w-full sm:w-1/2 justify-between h-fit">
                    <div className="p-5 h-1/5 flex flex-col gap-y-10">
                        <div>
                            <img
                                className="w-28 hidden sm:flex mb-10"
                                src="/assets/Logo/Asset-1.png"
                                alt="logo"
                            />
                            <h2 className="text-3xl font-semibold mt-2">
                                Sign Up
                            </h2>
                        </div>
                        <div
                            className="flex  flex-col items-center justify-around w-full md:flex-row
          [&>*]:border [&>*]:border-gray-300 [&>*]:rounded-md [&>*]:py-2 [&>*]:px-4 gap-2"
                        >
                            <button
                                style={{ position: 'relative' }}
                                className="flex justify-around items-center pad_0_im h-[42px] w-[140px] min-w-[110px] text-[14px] gap-1 "
                                onClick={() => {
                                    signInWithGoogle();
                                }}
                            >
                                <img
                                    src="assets/signin/google.png"
                                    alt="singin with google"
                                />
                                Google
                            </button>
                            <button
                                onClick={() => signInWithFacebook()}
                                className="flex justify-around items-center pad_0_im h-[42px] w-[140px] min-w-[110px] text-[14px] gap-1 "
                            >
                                <img
                                    src="assets/signin/facebook.png"
                                    alt="singin with google"
                                />
                                Facebook
                            </button>
                            <button
                                onClick={signInWithBinance}
                                className="flex justify-around items-center pad_0_im h-[42px] w-[140px] min-w-[110px] text-[14px] gap-1 "
                            >
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
                        onSubmit={handleSubmit(onSubmit)}
                        className="py-10 flex flex-col justify-center mx-auto items-center gap-5 w-[85%]"
                    >
                        <div className="relative w-full">
                            <input
                                type="text"
                                {...register('name', { required: true })}
                                className="bg-transparent border rounded-lg w-full ps-12 py-2 placeholder:text-white placeholder:text-xs "
                                placeholder="Name"
                            />
                            <FaUser className="absolute left-4 top-[50%] -translate-y-[50%]" />
                        </div>
                        {errors.name && (
                            <span className="text-red-600 w-full text-center">
                                This field is required
                            </span>
                        )}

                        <div className="relative w-full">
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                className="bg-transparent border rounded-lg w-full ps-12 py-2 placeholder:text-white placeholder:text-xs "
                                placeholder="Email"
                            />
                            <FaEnvelope className="absolute left-4 top-[50%] -translate-y-[50%]" />
                        </div>
                        {errors.email && (
                            <span className="text-red-600 w-full text-center">
                                This field is required
                            </span>
                        )}

                        <div className="relative w-full">
                            <input
                                type="text"
                                {...register('phone', { required: true })}
                                className="bg-transparent border rounded-lg w-full ps-12 py-2 placeholder:text-white placeholder:text-xs "
                                placeholder="Phone number"
                            />
                            <IoPhonePortrait className="absolute left-4 top-[50%] -translate-y-[50%]" />
                        </div>
                        {errors.phone && (
                            <span className="text-red-600 w-full text-center">
                                This field is required
                            </span>
                        )}

                        <div className="relative w-full">
                            <input
                                {...register('password', { required: true })}
                                type="password"
                                className="bg-transparent border w-full rounded-lg ps-12 py-2 placeholder:text-white placeholder:text-xs placeholder:font-light"
                                placeholder="Password"
                            />
                            <RiLockPasswordFill className="absolute left-4 top-[50%] -translate-y-[50%]" />
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
                            <label className="cursor-pointer label p-0">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="checkbox checkbox-warning checkbox-sm me-4 rounded-md"
                                />
                                remember me
                            </label>
                        </div>
                        <button className="btn !w-[80%] !rounded-md mt-12 mx-auto">
                            {loading ? 'loading...' : 'Signup'}
                        </button>
                        <Link className="text-xs" to="/signin">
                            Sign In
                        </Link>
                    </form>
                </div>
                <div className="w-full sm:w-1/2 bg-black">
                    <img
                        className="flex sm:hidden"
                        src="/assets/login.png"
                        alt="login hero"
                    />
                    <img
                        className="hidden sm:flex w-full h-[100%] object-cover"
                        src="/assets/admin/login-hero.jpg"
                        alt="login hero"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Signup;
