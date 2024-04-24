
function Status({status}: {status: string | number}) {
  return (
    <>
            { status == '0' ? <Pending /> : ( status == "1") ? <Confirmed /> : <Cancelled />}
    </>
  
  )
}


export default Status

function Pending() {
    return (
        <span className='px-4 rounded-full py-1 border  bg-[#B2B2B2] border-[#303030] tex-[#303030]' >
            Pending
        </span>
    )
}
function Confirmed() {
    return (
        <span className='px-4  rounded-full py-1 border bg-[#156A00] border-[#156A00]  text-[#156A00]' >
            Confirmed
        </span>
    )
}
function Cancelled() {
    return (
        <span className='px-4  rounded-full py-1  border bg-red-800 border-red-900 text-red-900' >
            Cancelled
        </span>
    )
}