import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCircle } from 'react-icons/fi';
import { FaRegCircleStop } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { addNewItem, getCartData } from '../store/CartSlice/CartSlice';
import { AppDispatch } from '../store';
import instance from '../axios';
import { Helmet } from 'react-helmet-async';

function SingleProduct() {
    const [Product, setProduct] = useState<any>();
    const [selectedPart, setSelectedPart] = useState(1);
    const [q, setQ] = useState(1);
    const { id } = useParams();
    const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);
    const localstorage = JSON.parse(localStorage.getItem('userData') as string);
    const userToken = localstorage?.userToken;
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [addedInTheCard, setAddedInTheCard] = useState<boolean>(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        instance.get(`/api/home/products/${id}`).then((d) => {
            const prod = d.data.data;
            setProduct(prod);
            if (!prod.product_parts || prod.product_parts.length === 0) {
                setButtonsDisabled(true);
            }
        });
    }, [id]);

    const AddtoCart = async () => {
        setAddedInTheCard(false);

        if (!userToken) {
            alert('You should sign in to add products');
            return;
        }

        const selectedPartData = Product.product_parts.find(
            (part: any) => part.id === selectedPart
        );

        if (!selectedPartData) {
            alert('Selected product part not found');
            return;
        }

        await dispatch(
            addNewItem({
                product_id: Product.id,
                product_part_id: selectedPartData.id,
                part_name: selectedPartData.title,
                part_price: selectedPartData.price,
                quantity: q,
            })
        );
        dispatch(getCartData());
        setAddedInTheCard(true);
    };

    const buyNow = () => {
        if (userToken) {
            instance
                .post(
                    '/api/user/order/direct',
                    { part_id: selectedPart },
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    }
                )
                .then((data) => {
                    const orderId = data.data.data.order_product.order_id;
                    localStorage.setItem('orderId', JSON.stringify(orderId));
                    navigate(`buy-now/${orderId}`);
                })
                .catch((error) => {
                    console.error('Error placing order', error);
                });
        } else {
            alert('You should sign in to place an order');
        }
    };

    const metaDesc =
        'Buy gift cards for your favorite games at unbeatable prices. Enjoy instant delivery and enhance your gaming experience with our wide selection of game gift cards.';

    return (
        <>
            <Helmet>
                <title>
                    {Product
                        ? `${Product.name} | Yelo-Gift`
                        : `Product | Yelo-Gift`}
                </title>
                <link rel="canonical" href="/" />
                <meta
                    name="description"
                    content={Product ? `${Product.description}` : metaDesc}
                />
                <meta
                    name="keywords"
                    content={Product ? `${Product.description}` : metaDesc}
                />
            </Helmet>
            <div className="py-10 flex flex-col sm:flex-row justify-between container ">
                <div className="flex w-full sm:w-1/2 p-10 justify-center items-start pt-0">
                    <div className="bg-black sm:bg-white rounded-md flex flex-col justify-stretch items-center w-[350px]">
                        <div className="hidden sm:flex bg-white flex-col justify-stretch items-center p-6 w-full rounded-md">
                            <div className="relative w-1/3 rounded-full bg-black h-[15px]">
                                <div className="size-5 rounded-full bg-black absolute -top-[50%] left-[50%] -translate-x-[50%]"></div>
                                {/* <span className="absolute text-gray-500 font-semibold -right-[80px] -top-[4px]">
                                    ${Product?.price}
                                </span> */}
                            </div>
                            <div className="flex flex-col text-gray-500 justify-center items-center mt-5">
                                <span className="text-2xl">
                                    {Product?.category?.name}
                                </span>
                                <span className="text-xs">{Product?.name}</span>
                            </div>
                        </div>
                        <img
                            src={`${
                                import.meta.env.VITE_BASEURL
                            }/public/storage/${Product?.image}`}
                            alt="product card"
                            className="mx-auto min-w-full"
                        />
                    </div>
                </div>
                <div className="flex w-full sm:w-1/2 flex-col justify-start items-start gap-5">
                    <span className="capitalize text-white text-3xl font-semibold">
                        {Product?.name}
                    </span>
                    <span className="p-2 border w-full border-gray-200 rounded-md text-sm text-ellipsis ">
                        <span className="line_clamp w-[50%] text-ellipsis">
                            {Product?.description}
                        </span>
                    </span>
                    <span className="text-main">choose product part</span>
                    <div className="flex flex-col gap-2 w-full pe-4">
                        {Product?.product_parts?.map((pp: any, idx: any) => (
                            <div
                                key={idx}
                                className={`rounded p-2 cursor-pointer flex items-start gap-2 w-full ${
                                    pp.id == selectedPart ? 'bg-[#323232]' : ''
                                } `}
                                onClick={() => setSelectedPart(pp.id)}
                            >
                                {pp.id == selectedPart ? (
                                    <FaRegCircleStop className="text-main mt-1" />
                                ) : (
                                    <FiCircle className="mt-1" />
                                )}
                                <div className="flex flex-col gap-3">
                                    <span>{pp.title}</span>
                                    <div className="flex gap-5 text-gray-500 ">
                                        Price :{' '}
                                        {pp.discount > 0 && (
                                            <span className="text-gray-500 line-through ">
                                                USD {pp.price}
                                            </span>
                                        )}
                                        <span className="text-gray-500 ">
                                            USD {pp.priceDiscount || pp.price}
                                        </span>
                                    </div>
                                </div>
                                <span className="ms-auto">{pp.price_text}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <span className="capitalize text-white text-3xl font-semibold">
                            Quantity
                        </span>
                        <div
                            className="flex justify-between w-full 
                                        [&>*]:border 
                                        [&>*]:border-gray-300 
                                        [&>*]:grow 
                                        [&>*]:py-2
                                        "
                        >
                            <button
                                onClick={() => setQ((old) => ++old)}
                                className="flex justify-center items-center rounded-s-md"
                            >
                                +
                            </button>
                            <div className="flex justify-center items-center w-1/2">
                                {q}
                            </div>
                            <button
                                onClick={() =>
                                    setQ((old) => (old > 1 ? --old : old))
                                }
                                className="flex justify-center items-center rounded-e-md"
                            >
                                -
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between w-full gap-3">
                        <div className="basis-2/4 grow flex flex-col item-center justify-center">
                            <button
                                className="btn !rounded-md adding_to_card_single_btn"
                                onClick={AddtoCart}
                                disabled={buttonsDisabled}
                            >
                                Add to cart
                            </button>
                            {addedInTheCard && (
                                <span className="text-green-600 w-full text-center ">
                                    Product added successfully
                                </span>
                            )}
                        </div>
                        <button
                            className="btn grow !bg-white !rounded-md basis-auto"
                            disabled={buttonsDisabled}
                            onClick={buyNow}
                        >
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>
            <div className="container mb-10">
                <div
                    tabIndex={0}
                    className="collapse collapse-arrow rounded-none px-0 border-t border-gray-500 "
                >
                    <div className="collapse-title after:!w-3 after:!h-3 after:!text-main text-xl font-medium px-0">
                        Description
                    </div>
                    <div className="collapse-content ">
                        <p className="preserve-whitespace ">
                            {Product?.description}
                        </p>
                    </div>
                </div>
                <div
                    tabIndex={0}
                    className="collapse collapse-arrow rounded-none px-0 border-t border-gray-500 "
                >
                    <div className="collapse-title after:!w-3 after:!h-3 after:!text-main text-xl font-medium px-0">
                        How To Redeem
                    </div>
                    {Product?.how_to_redeem ? (
                        <div className="collapse-content ">
                            <p className="preserve-whitespace ">
                                {Product.how_to_redeem}
                            </p>
                        </div>
                    ) : (
                        <div className="collapse-content ">
                            <p>
                                Please contact our support team if you have any
                                questions.
                            </p>
                        </div>
                    )}
                </div>
                <div
                    tabIndex={0}
                    className="collapse collapse-arrow rounded-none px-0 border-t border-gray-500 "
                >
                    <div className="collapse-title after:!w-3 after:!h-3 after:!text-main text-xl font-medium px-0">
                        More Information
                    </div>
                    <div className="collapse-content ">
                        <p className="preserve-whitespace ">
                            {Product?.more_info}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SingleProduct;
