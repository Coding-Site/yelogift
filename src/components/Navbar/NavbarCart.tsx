import { Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import {
    decreaseOneItem,
    increaseOneItem,
} from '../../store/CartSlice/CartSlice';

type Props = {
    setOpenCart: Dispatch<SetStateAction<boolean>>;
    openCart: boolean;
};

function NavbarCart({ setOpenCart, openCart }: Props) {
    const navigate = useNavigate();
    const carts = useSelector((state: RootState) => state.cartSlice.items);
    const dispatch = useDispatch();
    // const carts = [
    //   {
    //     img: "/assets/cards/card1.png",
    //     description: "avsfvsgd",
    //     price: 125,
    //     quantity: 1,
    //   },
    //   {
    //     img: "/assets/cards/card1.png",
    //     description: "avsfvsgadfvasdvafvdd",
    //     price: 125,
    //     quantity: 1,
    //   },
    // ];

    return (
        <div className="bg-white flex flex-col gap-2 rounded-md p-3 ">
            <div className="flex flex-col gap-3">
                {carts.length > 0 ? (
                    carts.map((cart, idx) => (
                        <div
                            className="flex justify-start gap-3 w-full "
                            key={idx}
                        >
                            <img
                                className="w-20 h-12"
                                src={`${
                                    import.meta.env.VITE_BASEURL
                                }/public/storage/${cart.product?.image}`}
                                alt="cart"
                            />
                            <div className="flex flex-col gap-0">
                                {/* <span className="text-xl text-black ">{(cart.product as IProduct).description?.length > 10 ? cart.product?.description.slice(0, 10) + '...' : cart?.product?.description}</span> */}
                                <span className="text-sm text-gray-500">
                                    AED {cart.product?.price}
                                </span>
                            </div>
                            <div className="flex basis-24 text-base h-8 min-w-[100px] px-3 items-center ms-auto w-auto  justify-between rounded-full border border-gray-300">
                                <span
                                    onClick={() =>
                                        dispatch(
                                            decreaseOneItem(
                                                cart.product?.id as number
                                            )
                                        )
                                    }
                                    className="cursor-pointer"
                                >
                                    -
                                </span>
                                <span>{cart.quantity}</span>
                                <span
                                    onClick={() =>
                                        dispatch(
                                            increaseOneItem(
                                                cart.product?.id as number
                                            )
                                        )
                                    }
                                    className="cursor-pointer"
                                >
                                    +
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <span className="text-center w-full text-3xl">
                        No Products in Cart
                    </span>
                )}

                <div className="flex justify-between text-base">
                    <button className="!rounded-full shadow-md px-5">
                        keep shopping
                    </button>
                    <button
                        onClick={() => {
                            setOpenCart(!openCart);
                            navigate('/checkout');
                        }}
                        className="btn !rounded-full  shadow-md"
                    >
                        checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NavbarCart;
