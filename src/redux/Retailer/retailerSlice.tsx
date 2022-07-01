import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import customer from '../../data/retailerData/customer.json'
import {Initialstatetype, Actionpayload} from '../../interfaces/retailer'

const initialState: Initialstatetype = {
    retailerStock : localStorage['customer'] ? JSON.parse(localStorage['customer']) : customer
}

if(!localStorage['customer']){
    localStorage['customer'] = JSON.stringify(customer);
}

const retailerSlice = createSlice({
    name: 'retailerReducer',
    initialState,
    reducers: {
        listorder: (state, action: PayloadAction<Actionpayload>) => {
            const index = action.payload.id
            const data = action.payload.details
            const alterData = [...state.retailerStock];
            data.forEach((items:any)=>alterData.find((retailer)=>retailer.id===index)?.products.push(items)) 
            console.log(data);
            localStorage['customer'] = JSON.stringify(alterData)
        }
    }
})

export default retailerSlice.reducer
export const { listorder } = retailerSlice.actions