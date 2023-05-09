import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
    name: 'items',
    initialState:{
        items: {
            allItems: null,
            isFetching: false,
            error: false,
            listItems: null,
            typeItems: null,
        }, 
        msg: ""
    },
    reducers:{
        getItemsStart: (state) => {
            state.items.isFetching = true;
        },
        getItemsSuccess: (state, action) => {
            state.items.allItems = action.payload.data;
            state.items.isFetching = false; 
        }, 
        getItemsFailed: (state) => {
            state.items.isFetching = false; 
            state.items.error = true;
        },
        getListItemsStart: (state) => {
            state.items.isFetching = true;
        },
        getListItemsSuccess: (state, action) => {
            state.items.listItems = action.payload;
            state.items.isFetching = false; 
        }, 
        getListItemsFailed: (state) => {
            state.items.isFetching = false; 
            state.items.error = true;
        },
        getTypeItemsStart: (state) => {
            state.items.isFetching = true;
        },
        getTypeItemsSuccess: (state, action) => {
            state.items.isFetching = false;
            state.items.typeItems = action.payload;
        },
        getTypeItemsFailed: (state) => {
            state.items.isFetching = false;
            state.items.error = true;
        }
    },
})

export const {
    getItemsStart, 
    getItemsSuccess,
    getItemsFailed,
    getListItemsStart, 
    getListItemsSuccess,
    getListItemsFailed,
    getTypeItemsStart,
    getTypeItemsSuccess,
    getTypeItemsFailed,
} = itemSlice.actions;

export default itemSlice.reducer;