import { createSlice } from "@reduxjs/toolkit"

const orderSlice = createSlice({
    name: "orders", 
    initialState: {
        isFetching: null,
        allOrder: [],
        error: null
    },
    reducers: {
        getAllOrderStart: (state) => {
            state.isFetching = true;
        },
        getAllOrderSuccess: (state, action) => {
            state.isFetching = false;
            // state.allOrder = []
            state.allOrder = action.payload.data.list_order;
            state.error = false;
        },
        getAllOrderFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
}); 

export const {
    getAllOrderStart,
    getAllOrderSuccess,
    getAllOrderFailed,
} = orderSlice.actions;

export default orderSlice.reducer;