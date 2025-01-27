import { createSlice } from "@reduxjs/toolkit";

const initalValue =  {
    order: []
}

const orderSlice = createSlice({
    name: 'order',
    initialState: initalValue,
    reducers: {
        setOrder: (state, action) => {
            state.order = [...action.payload]
        }
    }
})

export const {setOrder} = orderSlice.actions

export default orderSlice.reducer