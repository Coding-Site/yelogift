/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"

function OrderPartCode({ part , setSendedCode} : { part: any, setSendedCode: any }) {
    const [codes, setCodes] = useState(part.order_code);
    const [newCode, setNewCode] = useState<any>();

    return (
        <tr className="h-[100px] border-b border-gray-600">
            <td>{part?.product?.name}</td>
            <td>${part.price}</td>
            <td>{part?.quantity}</td>
            <td>
                <Codes codes={codes} partId={part?.id} quantity={part.quantity} />
            </td>
            <td>$ {part?.price * part?.quantity}</td>
            <dialog id={`my_modal_${part.id}`} className="modal">
                <div className="modal-box">
                    <div className="modal-action w-full">
                        <form method="dialog" className=' w-full flex flex-col gap-y-3 '>
                            <button className="btn btn-sm btn-circle !bg-transparent btn-ghost absolute right-2 top-2">✕</button>
                            <input
                                type="text"
                                value={newCode}
                                onChange={(e: any) => setNewCode(e.target.value)}
                                className="rounded outline-none py-3 text-mainLightBlack border-gray-500 border-2 w-full px-4 "
                                placeholder="Code here"
                            />
                            <button className="btn ms-auto" onClick={() => {
                                setCodes((old: any) => [...old, { code: newCode, order_product_id: part.id }]); 
                                setSendedCode((old: any) => [...old, { code: newCode, order_product_id: part.id , product_part_id: part.product_part_id}]); 
                                setNewCode('');
                            }} >
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </tr>


    )
}

export default OrderPartCode


const Codes = ({ codes, partId, quantity }: { codes: any, partId: any, quantity: any }) => {

    return (
        <>
            {codes.map((ordercode: any, idx: any) => {
                return (ordercode.order_product_id == partId) &&
                    (

                        <div className="flex flex-col mb-1" key={idx}>
                            <span className="text-xs border-gray-600 border py-1 rounded">
                                {ordercode.code.slice(0, 20)}
                            </span>
                        </div>

                    );
            })}
            {
                quantity > codes.length && (

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            (document.getElementById(`my_modal_${partId}`) as HTMLDialogElement).showModal();
                        }}
                        className="p-2 text-xs "
                    >
                        + Add Code
                    </button>
                )
            }
        </>
    )


}