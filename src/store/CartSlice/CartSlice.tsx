import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import instance from '../../axios';

const localstorage = JSON.parse(localStorage.getItem('userData') as string);

export const getCartData = createAsyncThunk('carts/getAll', async () => {
    try {
        const userToken = localstorage?.userToken;
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
        part_name,
        part_price,
        quantity,
    }: {
        product_id: number;
        product_part_id: number;
        part_name: string;
        part_price: number;
        quantity: number;
    }) => {
        try {
            const userToken = localstorage?.userToken;
            if (userToken) {
                const res = await instance.post(
                    `/api/user/carts/store`,
                    {
                        product_id,
                        product_part_id,
                        part_name,
                        part_price,
                        quantity,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    }
                );
                return res.data.data;
            } else {
                throw new Error("User doesn't exist in this case");
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
            const userToken = localstorage?.userToken;
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
                return res.data.data;
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
            const userToken = localstorage?.userToken;
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
                return res.data.data;
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
    product_id: number;
    product_image: string;
    part_name: string;
    part_price: number;
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
                (ci) =>
                    ci.product_id === payload.product_id &&
                    ci.part_name === payload.part_name
            );

            if (itemExist === -1) {
                state.items.push(payload);
            } else {
                state.items[itemExist].quantity += payload.quantity;
            }

            localStorage.setItem('cart', JSON.stringify(state));
        },
        increaseOneItem(state: State, { payload }: { payload: number }) {
            const item = state.items.find((ci) => ci.product_id === payload);
            if (item) {
                item.quantity++;
            }

            localStorage.setItem('cart', JSON.stringify(state));
        },
        decreaseOneItem(state: State, { payload }: { payload: number }) {
            const itemIndex = state.items.findIndex(
                (ci) => ci.product_id === payload
            );
            if (itemIndex !== -1) {
                if (state.items[itemIndex].quantity > 1) {
                    state.items[itemIndex].quantity--;
                } else {
                    state.items.splice(itemIndex, 1);
                }
            }

            localStorage.setItem('cart', JSON.stringify(state));
        },

        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem('cart');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCartData.fulfilled, (state, action) => {
            const data = action.payload;
            const newItems = data.map((element: any) => ({
                id: element.id,
                product_id: element.product.id,
                product_image: element.product.image,
                part_name: element.product_part.title,
                part_price: element.product_part.price,
                quantity: element.quantity,
            }));

            state.items = newItems;
            localStorage.setItem('cart', JSON.stringify(state));
        });
    },
});

export const { decreaseOneItem, increaseOneItem, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
