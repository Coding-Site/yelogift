import { useEffect, useState } from "react"

function Status({status, paymentstatus}: {status: string , paymentstatus: string}) {
    const [fstatus, setFStats] = useState('');

    useEffect(() => {
        setFStats(() => {
           return  paymentstatus == "0" ? "Pending" : status == "0" ? "in-Progress" : "Confirmed"
        })
    }, [])
  return (
    <>
            { fstatus == 'Pending' ? <Pending /> : ( fstatus == "in-Progress") ? <InProgrss /> : <Confirmed />}
    </>
  
  )
}


export default Status

function Pending() {
    return (
        <span className='px-4 rounded-full py-0.5 border  bg-[#B2B2B2] border-[#303030] text-white' >
            Pending
        </span>
    )
}
function Confirmed() {
    return (
        <span className='px-4  rounded-full py-0.5 border bg-[#156A00] border-[#156A00]  text-white' >
            Confirmed
        </span>
    )
}
function InProgrss() {
    return (
        <span className='px-4  rounded-full py-0.5  border bg-yellow-800 border-yellow-900 text-white' >
            In Progress
        </span>
    )
}