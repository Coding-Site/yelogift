import { configureStore } from "@reduxjs/toolkit";


import cartSlice from "./CartSlice/CartSlice";
import themeSlice from "./ThemeSlice/ThemeSlice";



export const store = configureStore({
    reducer:{
        cartSlice,
        themeSlice
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
