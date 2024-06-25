import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoPencil } from 'react-icons/go';
import instance from '../../axios';
import Spinner from '../../utils/Spinner';
import { AiOutlinePlus } from 'react-icons/ai';

function PaymentSetting() {
    const [loading, setLoading] = useState(false);
    const [payments, setPayments] = useState<any>([]);
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;

    useEffect(() => {
        setLoading(true);
        instance
            .get(`/api/admin/payment/setting`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then((d) => {
                console.log(d);
                const data: any = d.data.data;
                setPayments(data);
                setLoading(false);
            });
    }, []);
    console.log(payments);

    return (
        <div className="flex flex-col gap-8 w-full py-10 container">
            <div className="flex items-center justify-between w-full ">
                <span className="text-3xl text-white font-semibold">
                    Payment Setting
                </span>
                <Link
                    to="/admin/payment-setting/add"
                    className="btn !rounded-md !h-12"
                >
                    <AiOutlinePlus /> Add Payment
                </Link>
            </div>
            <div className="flex flex-col gap-2 rounded-t-3xl p-4 bg-white text-mainLightBlack">
                {loading ? (
                    <Spinner />
                ) : (
                    <table className="text-center table-auto border-collapse">
                        <thead>
                            <tr className="border-b-[30px] border-transparent text-gray-400">
                                <td>Wallet details</td>
                                <td>Payment QR</td>
                                <td>Currency</td>
                                <td>Blockchain type</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((item: any, idx: any) => (
                                <tr
                                    key={idx}
                                    className="border-b-[20px] border-transparent even:bg-gray-50"
                                >
                                    <td className="font-semibold">
                                        {item.address.slice(0, 10)}...
                                    </td>
                                    <td className="font-semibold">
                                        <img
                                            className="size-12 mx-auto"
                                            src={`${
                                                import.meta.env.VITE_BASEURL
                                            }/public/storage/${
                                                item.payment_qr
                                            }`}
                                            alt="iconQR"
                                        />
                                    </td>
                                    <td className="font-semibold">
                                        {item.currency.name}
                                    </td>
                                    <td className="font-semibold">
                                        {item.blockchain_type}
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center gap-2 bg-[#F9D423] h-[40px] w-[40px] rounded-[7px]">
                                            <Link
                                                to={`/admin/payment-setting/edit/${item.id}`}
                                            >
                                                <GoPencil />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default PaymentSetting;
