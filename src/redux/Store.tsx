import { configureStore } from "@reduxjs/toolkit";
import stockReducer from './Store/storeSlice'
import retailerReducer from './Retailer/retailerSlice'

const Store = configureStore({
    reducer: {
        stock: stockReducer,
        retailer: retailerReducer
    }
})

export default Store 
export type RootState = ReturnType<typeof Store.getState>
