import { createSlice } from "@reduxjs/toolkit"
import products from '../../data/martData/products.json'
import { listorder } from "../Retailer/retailerSlice"
import { Initialstatetype } from '../../interfaces/product'

const initialState: Initialstatetype = {
    productStock: products
}
const productSlice = createSlice({
    name: 'stockReducer',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(listorder, (state, action) => {
            const newProducts = action.payload.details
            const wholeSaleProducts = [...state.productStock]

            newProducts.forEach((productss: any) => {
                wholeSaleProducts.find((wholeSaleProduct: any) => wholeSaleProduct.product_name === productss.name)!.product_inStock -= productss.quantity
            })
        })
    },
    reducers: {

    }
})

export default productSlice.reducer
