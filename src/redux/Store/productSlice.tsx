import { createSlice } from "@reduxjs/toolkit"
import products from '../../data/martData/products.json'
import { listorder } from "../Retailer/retailerSlice"

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
const productSlice = createSlice({
    name: 'stockReducer',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(listorder,(state,action)=>{
            console.log(action.payload);
            const newProducts = action.payload.details
            const wholeSaleProducts = [...state.productStock]
            
            newProducts.forEach((productss:any)=>{
                console.log(productss);
                wholeSaleProducts.find((wholeSaleProduct:any)=>wholeSaleProduct.product_name===productss.name)!.product_inStock -= productss.quantity
            })
        })        
    },
    reducers:{

    }
})

export default productSlice.reducer
