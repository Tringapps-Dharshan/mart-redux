import { createSlice } from "@reduxjs/toolkit"
import customer from '../../data/retailerData/customer.json'

interface Product {
    id : string,
    name : string,
    quantity : number,
    date : Date
}

interface Initialstatetype {
    retailerStock: {
        id: number,
        name: string,
        products: Product[],
        address: string 
    }[]
}

const initialState:Initialstatetype = {
    retailerStock: customer
}
const retailerSlice = createSlice({
    name: 'retailerReducer',
    initialState,
    reducers: {

    }
})

export default retailerSlice.reducer
export const { } = retailerSlice.actions