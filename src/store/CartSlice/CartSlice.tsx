import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IProduct } from '../../models/IProduct';
import axios from 'axios';
import instance from '../../axios';

const localstorage = JSON.parse(localStorage.getItem('userData') as string);
const userToken = localstorage?.userToken;

export const getCartData = createAsyncThunk('carts/getAll', async () => {
    try {
        if (userToken) {
            const res = await instance.get<any>(`/api/user/carts`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            return res.data.data;
        } else {
            return [];
        }
    } catch (err) {
        console.log(err);
    }
});

export const addNewItem = createAsyncThunk(
    'carts/addItemProduct',
    async ({
        product_id,
        product_part_id,
        quantity,
    }: {
        product_id: number;
        product_part_id: number;
        quantity: number;
    }) => {
        try {
            if (userToken) {
                const res = await instance.post(
                    `/api/user/carts/store`,
                    { product_id, product_part_id, quantity },
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    }
                );
                return res;
            } else {
                return null;
            }
        } catch (err) {
            console.log(err);
        }
    }
);
export const updateCartItem = createAsyncThunk(
    'carts/UpdatecartItem',
    async ({ cart_id, quantity }: { cart_id: number; quantity: number }) => {
        try {
            if (userToken) {
                const res = await axios.post(
                    `${import.meta.env.VITE_BASEURL}/api/user/carts/update`,
                    { cart_id, quantity },
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    }
                );
                return res;
            } else {
                return null;
            }
        } catch (err) {
            console.log(err);
        }
    }
);
export const deleteCartProduct = createAsyncThunk(
    'carts/DeletecartItem',
    async ({ id }: { id: number }) => {
        try {
            if (userToken) {
                const res = await axios.get(
                    `${
                        import.meta.env.VITE_BASEURL
                    }/api/user/carts/delete/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    }
                );
                return res;
            } else {
                return null;
            }
        } catch (err) {
            console.log(err);
        }
    }
);

type cartItem = {
    id?: number;
    product?: IProduct;
    productPartId?: number;
    quantity: number;
};

type State = {
    items: cartItem[];
};
const cartInitialState: State = JSON.parse(
    localStorage.getItem('cart') as string
)
    ? JSON.parse(localStorage.getItem('cart') as string)
    : { items: [] };

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: cartInitialState,
    reducers: {
        addNewItem(state: State, { payload }: { payload: cartItem }) {
            const itemExist = state?.items?.findIndex(
                (ci) => ci.product?.id == payload.product?.id
            );

            if (-1 == itemExist) {
                state = state = { items: [...state.items, payload] };
                localStorage.setItem('cart', JSON.stringify(state));
                return state;
            } else {
                state.items.map((ci) => {
                    if (ci.product?.id == payload.product?.id) {
                        ci.quantity += payload.quantity;
                    }

                    return ci;
                });

                localStorage.setItem('cart', JSON.stringify(state));
                return state;
            }
        },
        increaseOneItem(state: State, { payload }: { payload: number }) {
            state.items.map((ci) => {
                if (ci.product?.id == payload) {
                    ci.quantity++;
                    return ci;
                }
            });

            localStorage.setItem('cart', JSON.stringify(state));
            return state;
        },
        decreaseOneItem(state: State, { payload }: { payload: number }) {
            const item = state.items.find(
                (i) => i.product?.id == payload
            ) as cartItem;
            const itemIndex = state.items.findIndex(
                (i) => i.product?.id == payload
            );
            if (item.quantity > 1) {
                state.items.map((ci) => {
                    if (ci.product?.id == payload) {
                        ci.quantity--;
                        return ci;
                    }
                });
            } else {
                state.items.splice(itemIndex, 1);
            }

            localStorage.setItem('cart', JSON.stringify(state));
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCartData.fulfilled, (state, action) => {
            const data = action?.payload;
            const newITems: {
                id: any;
                product: any;
                productPartId: any;
                quantity: any;
            }[] = [];

            data.forEach((element: any) => {
                newITems.push({
                    id: element.id,
                    product: element.product,
                    productPartId: element.product_part_id,
                    quantity: element.quantity,
                });
            });

            state = { ...state, items: newITems };

            return state;
        });
    },
});

export const { decreaseOneItem, increaseOneItem } = cartSlice.actions;
export default cartSlice.reducer;
