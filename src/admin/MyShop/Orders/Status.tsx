import { useEffect, useState } from 'react';

function Status({
    status,
    paymentstatus,
}: {
    status: string;
    paymentstatus: string;
}) {
    const [fstatus, setFStatus] = useState('');

    useEffect(() => {
        setFStatus(() => {
            if (status === '-1') {
                return 'Rejected';
            } else if (paymentstatus === '0') {
                return 'Pending';
            } else if (status === '0') {
                return 'InProgress';
            } else {
                return 'Confirmed';
            }
        });
    }, [status, paymentstatus]);

    return (
        <>
            {fstatus === 'Pending' ? (
                <Pending />
            ) : fstatus === 'InProgress' ? (
                <InProgress />
            ) : fstatus === 'Rejected' ? (
                <Rejected />
            ) : (
                <Confirmed />
            )}
        </>
    );
}

export default Status;

function Pending() {
    return (
        <span className="px-4 rounded-full py-0.5 border bg-[#B2B2B2] border-[#303030] text-white">
            Pending
        </span>
    );
}

function Confirmed() {
    return (
        <span className="px-4 rounded-full py-0.5 border bg-[#156A00] border-[#156A00] text-white">
            Confirmed
        </span>
    );
}

function InProgress() {
    return (
        <span className="px-4 rounded-full py-0.5 border bg-yellow-800 border-yellow-900 text-white">
            In Progress
        </span>
    );
}

function Rejected() {
    return (
        <span className="px-4 rounded-full py-0.5 border bg-red-600 border-red-700 text-white">
            Rejected
        </span>
    );
}
