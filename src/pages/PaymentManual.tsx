import { MdContentCopy } from 'react-icons/md';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PaymentManual() {
    const navigate = useNavigate();
    const localstorage = JSON.parse(localStorage.getItem('userData') as string);
    const [invoice, setInvoice] = useState<any>(null);
    const userToken = localstorage?.userToken;
    const [cryptoPayData, setCryptoPayData] = useState<any>({});
    const [orderPrice, setOrderPrice] = useState<any>(null);
    const [invMiss, setInvMiss] = useState<boolean>(false);

    useEffect(() => {
        const orderId = JSON.parse(localStorage.getItem('orderId') as string);
        const currencyId = JSON.parse(
            localStorage.getItem('currencyId') as string
        );
        axios
            .post(
                `${import.meta.env.VITE_BASEURL}/api/user/order/crypto`,
                {
                    order_id: orderId,
                    payment_id: currencyId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            )
            .then((d) => {
                const data = d.data.data;
                setCryptoPayData(data[0]);
                setOrderPrice(data[1].price);
            })
            .catch((err) => console.log(err));
    }, []);

    const copyToClipboard = (text: any) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied', {
            autoClose: 700,
        });
    };

    const sentToDB = () => {
        const orderId = JSON.parse(localStorage.getItem('orderId') as string);

        if (!invoice) {
            console.error('Invoice file is missing');
            setInvMiss(true);
            return;
        }

        const formData = new FormData();
        formData.append('order_id', orderId);
        formData.append('invoice', invoice);

        axios
            .post(
                `${import.meta.env.VITE_BASEURL}/api/user/order/pay/currancy`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            .then(() => {
                navigate('/');
                setInvMiss(false);
            })
            .catch((err) => {
                console.error('Error submitting data', err);
            });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setInvoice(file);
            toast.success('Image uploaded successfully!', {
                autoClose: 1500,
            });
        }
    };

    return (
        <div className="flex flex-col sm:py-10 w-full sm:container bg-black sm:bg-transparent text-mainLightBlack">
            <div className="flex justify-between sm:flex-row flex-col w-full gap-x-12 gap-y-4">
                <div className="flex justify-start flex-col px-2 py-2 sm:px-10 sm:py-10 sm:bg-white bg-[#000000] text-white sm:text-black grow w-full  sm:h-[650px] ">
                    <div className="flex flex-col gap-y-3">
                        <span className="text-2xl font-semibold mb-5">
                            Wallet Connect
                        </span>
                        <p className="text-[12px] sm:text-[16px]">
                            Send the indicated amount to the address below:
                        </p>
                        <span className="bg-[#222222] sm:bg-gray-300  text-white sm:text-gray-700 rounded-md text-sm mb-5 p-2 hidden sm:block">
                            You need to add network fee into transfer
                            transaction
                        </span>
                        <div className="flex flex-col gap-y-1">
                            <span className="sm:text-2xl">USDT Amount</span>
                            <div className="flex justify-between w-full">
                                <input
                                    type="text"
                                    value={orderPrice || ' '}
                                    className="py-2 px-3 rounded-s-md bg-[#222222] sm:bg-gray-300 grow  text-white sm:text-gray-700"
                                    disabled
                                />
                                <span
                                    className="bg-main rounded-e-md w-[50px] flex justify-center items-center cursor-pointer"
                                    onClick={() => copyToClipboard(orderPrice)}
                                >
                                    <MdContentCopy className="text-3xl p-1" />
                                </span>
                            </div>
                            <p className="text-xs">
                                Your total transfer - network fee = {orderPrice}
                            </p>
                            <p>
                                Blockchain:{' '}
                                <span className="text-main">
                                    {cryptoPayData?.blockchain_type}
                                </span>
                            </p>
                        </div>
                        <span className="sm:text-2xl">Wallet address</span>
                        <div className="flex justify-between w-full min-w-fit">
                            <input
                                type="text"
                                value={cryptoPayData?.address || ' '}
                                className="py-2 px-3 rounded-s-md bg-[#222222] sm:bg-gray-300 grow text-white sm:text-gray-700"
                                style={{
                                    minWidth:
                                        cryptoPayData?.address?.length + 'ch',
                                }}
                                disabled
                            />
                            <span
                                className="bg-main rounded-e-md w-[50px] flex justify-center items-center cursor-pointer"
                                onClick={() =>
                                    copyToClipboard(cryptoPayData.address)
                                }
                            >
                                <MdContentCopy className="text-3xl p-1" />
                            </span>
                        </div>
                        <div className="flex-col hidden sm:flex">
                            <span className="text-2xl">Upload file</span>
                            <label
                                htmlFor="file"
                                className="w-full py-3 px-4 bg-[#222222] sm:bg-[#CBD3FF] rounded-md border-dashed border-gray-400 text-center text-gray-700 "
                            >
                                Drop your PDF or image file here or{' '}
                                <span className="font-bold">choose file</span>
                                <input
                                    type="file"
                                    id="file"
                                    accept="image/*,.pdf"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start flex-col px-2 py-2 sm:px-10 sm:py-10 sm:bg-white bg-[#000000] text-white sm:text-black grow w-full sm:h-[650px]">
                    <span className="text-2xl font-semibold mb-5">
                        {' '}
                        Payment{' '}
                    </span>
                    <div className="flex flex-col gap-y-7 w-full items-center ">
                        <p>Scan this QR code in the Binance app</p>
                        <img
                            className="mx-auto w-[75%] sm:w-auto  max-h-[300px] max-w-[300px]"
                            src={`${
                                import.meta.env.VITE_BASEURL
                            }/public/storage/${cryptoPayData.payment_qr}`}
                            alt="QR"
                        />
                        {invMiss && (
                            <span className="text-red-600 ">
                                Invoice file is missing
                            </span>
                        )}
                    </div>
                    <div className="flex-col flex sm:hidden">
                        <span className="hidden sm:block text-2xl">
                            Upload photo
                        </span>
                        <span className="text-[15px] pt-[18px] pb-[9px] sm:hidden">
                            To Verify Your Payment Upload Receipt
                        </span>
                        <label
                            htmlFor="file"
                            className="w-full py-3 px-4 bg-[#CBD3FF] rounded-md border-dashed border-gray-400 text-center text-gray-700 text-[12px] sm:text-[16px] border-dashed border-[2px] border-[#0C192B]"
                        >
                            Drop your PDF or PNG file here or{' '}
                            <span className="font-bold">choose file</span>
                            <input
                                type="file"
                                id="file"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-y-5  items-center py-14">
                <button className="btn !rounded-md !w-56" onClick={sentToDB}>
                    Submit order
                </button>
                <Link to="/" className="text-white">
                    Cancel
                </Link>
            </div>
            <ToastContainer />
        </div>
    );
}

export default PaymentManual;
