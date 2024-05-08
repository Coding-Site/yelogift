import { configureStore } from "@reduxjs/toolkit";
// import storage from 'redux-persist/lib/storage';

import cartSlice from "./CartSlice/CartSlice";
import themeSlice from "./ThemeSlice/ThemeSlice";



// const persistConfig = {
//     key: 'root',
//     storage
// }
export const store = configureStore({
    reducer:{
        cartSlice,
        themeSlice
    },
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
