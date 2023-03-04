import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
    name: 'items',
    initialState:{
        items: {
            allitems: null,
            isFetching: false,
            error: false
        }, 
        msg: ""
    },
    reducers:{
        getItemsStart: (state) => {
            state.items.isFetching = true;
        },
        getItemsSuccess: (state, action) => {
            state.items.allitems = action.payload.data;
            state.items.isFetching = false; 
        }, 
        getItemsFailed: (state) => {
            state.items.isFetching = false; 
            state.items.error = true;
        },
    },
})

export const {
    getItemsStart, 
    getItemsSuccess,
    getItemsFailed,
} = itemSlice.actions;

export default itemSlice.reducer;