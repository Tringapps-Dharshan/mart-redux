import { createSlice } from "@reduxjs/toolkit"
import products from '../../data/martData/products.json'

interface Initialstatetype {
    productStock: {
        product_id: number,
        product_name: string,
        product_price: number,
        product_inStock: number
    }[]
}


const initialState: Initialstatetype = {
    productStock: products
}
const storeSlice = createSlice({
    name: 'stockReducer',
    initialState,
    reducers: {

    }
})

export default storeSlice.reducer
export const { } = storeSlice.actions