import { configureStore } from "@reduxjs/toolkit";
import stockReducer from './Store/productSlice'
import retailerReducer from './Retailer/retailerSlice'

const Store = configureStore({
    reducer: {
        stock: stockReducer,
        retailer: retailerReducer
    }
})

export default Store 
export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch