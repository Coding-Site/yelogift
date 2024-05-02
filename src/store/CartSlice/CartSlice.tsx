import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../models/IProduct";

type cartItem = {
  product?: IProduct;
  productPartId?: number;
  quantity: number;
};

type State = {
  items: cartItem[];
};
const cartInitialState: State = {
  items: [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: cartInitialState,
  reducers: {
    addNewItem(state: State, { payload }: { payload: cartItem } ) {
      const itemExist = state.items.findIndex(
        (ci) => ci.product?.id == payload.product?.id
      );


      console.log(itemExist)
      if (-1 == itemExist) {
         state = (state = { items: [...state.items, payload] });
         console.log(state)

         return state
      } else {
        state.items.map((ci) => {
          if (ci.product?.id == payload.product?.id) {
            ci.quantity += payload.quantity;
            console.log(ci.quantity);
          }

          return ci;
        });

        return state;
      }
    },
    increaseOneItem(state: State, { payload }: { payload: number } ){
      state.items.map((ci) => {
        if(ci.product?.id == payload){
           ci.quantity++
           return ci
        }
      })

      return state;
    },
    decreaseOneItem(state: State, { payload }: { payload: number } ){
      const item = state.items.find((i) => i.product?.id == payload) as cartItem;
      const itemIndex = state.items.findIndex((i) => i.product?.id == payload);
      if(item.quantity > 1){

        state.items.map((ci) => {
          if(ci.product?.id == payload){
            ci.quantity--
            return ci
          }
        })
      }else {
          state.items.splice(itemIndex, 1)
      }

      return state;
    }
  },
});

export const { addNewItem , decreaseOneItem, increaseOneItem} = cartSlice.actions;
export default cartSlice.reducer;
