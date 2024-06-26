import { Link, Navigate, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { IoIosLock } from 'react-icons/io';
import { FaEnvelope } from 'react-icons/fa';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import instance from '../axios';
import axios from 'axios';
import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { auth } from '../config/config';
import Modal from 'react-modal';

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
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [binanceData, setBinanceData] = useState<any>(null);

    Modal.setAppElement('#root');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const {
        register: registerForgetPassword,
        handleSubmit: handleSubmitForgetPassword,
        formState: { errors: forgetPasswordErrors },
    } = useForm<any>();

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

    const onForgetPasswordSubmit: SubmitHandler<any> = (data) => {
        console.log(data);
        instance
            .post(`/api/user/auth/forget/password`, data)
            .then((response) => {
                if (response) {
                    console.log(response);
                    setIsEmailSent(true);
                }
            })
            .catch((error) => {
                console.error('Error sending forget password email:', error);
                setBackError(
                    error.response?.data?.message || 'An error occurred'
                );
            });
    };

    const doneSeeingEmailNoti = () => {
        setIsModalOpen(false);
        setIsEmailSent(false);
    };

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
            .post(`/api/user/auth/social`, userData, {
                headers: {
                    'ngrok-skip-browser-warning': true,
                },
            })
            .then((response: any) => {
                if (response.status === 200) {
                    const userLocal = {
                        userName: response.data.data.user.name,
                        userToken: response.data.data.token,
                        role: 'user',
                    };
                    localStorage.setItem('userData', JSON.stringify(userLocal));
                    navigate('/');
                    console.log(response);
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
                if (d.data.data.role == 'user') {
                    console.log(d);
                    const data = {
                        userToken: d.data.data.token.token,
                        userName: d.data.data.user.name,
                        role: d.data.data.role,
                        auth: d.data.data.auth,
                    };
                    setItem('userData', JSON.stringify(data));
                    navigate('/');
                    window.location.reload();
                } else {
                    console.log(d);
                    const data = {
                        adminID: d.data.data.user.id,
                        adminMail: d.data.data.user.email,
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
                setLoading(false);
                if (msg) {
                    setBackError(msg);
                }
            });
    };
    if (userToken !== undefined && userToken !== null)
        return <Navigate to="/" />;
    return (
        <div className="flex flex-col text-mainWhite">
            <div className="flex flex-col-reverse sm:flex-row bg-black sm:bg-mainLightBlack pt-5 sm:pt-0">
                <div className=" p-4  flex flex-col w-full sm:w-1/2 justify-between h-fit">
                    <div className="p-0 sm:p-5 h-1/5 flex flex-col gap-y-10">
                        <div>
                            <img
                                className="w-28 hidden sm:flex mb-10"
                                src="/assets/Logo/Asset-1.png"
                                alt="logo"
                            />
                            <h2 className="text-3xl font-semibold mt-2">
                                Login to your account
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
                        onSubmit={handleSubmit(onSubmitt)}
                        className="py-10 flex flex-col justify-center mx-auto items-center gap-5 w-[85%]"
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
                            <span
                                className="text-main text-xs text-xs hover:underline cursor-pointer"
                                onClick={() => setIsModalOpen(true)}
                            >
                                forget password?
                            </span>
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
                        className="hidden sm:flex w-full h-[100%] object-cover"
                        src="/assets/admin/login-hero.jpg"
                        alt="login hero"
                    />
                </div>
            </div>
            <Footer />

            {/* Modal for Forget Password */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        zIndex: 1000,
                    },
                    content: {
                        color: 'lightsteelblue',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1001,
                        width: '60%',
                        maxWidth: '90%',
                        backgroundColor: '#1E2329',
                    },
                }}
            >
                {isEmailSent ? (
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-main text-center">
                            An email has been sent to your email address. Please
                            check your inbox.
                        </p>
                        <button
                            onClick={doneSeeingEmailNoti}
                            className=" rounded-xl w-full btn text-black font-semibold mt-5"
                        >
                            Okay
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 className="text-xl text-main font-semibold mb-4">
                            Forget Password
                        </h2>
                        <form
                            onSubmit={handleSubmitForgetPassword(
                                onForgetPasswordSubmit
                            )}
                            className="flex flex-col gap-4"
                        >
                            <div className="relative w-full">
                                <input
                                    type="email"
                                    {...registerForgetPassword('email', {
                                        required: true,
                                    })}
                                    className="bg-transparent border rounded-lg w-full ps-4 py-2 placeholder:text-white outline-none placeholder:text-xs"
                                    placeholder="Enter your email"
                                />
                            </div>
                            {forgetPasswordErrors.email && (
                                <span className="text-red-600 w-full text-center">
                                    This field is required
                                </span>
                            )}
                            <button className="py-2 rounded-xl w-full btn text-black font-semibold mx-auto w-[50%]">
                                Send
                            </button>
                        </form>
                    </>
                )}
            </Modal>
        </div>
    );
}

export default Signin;
