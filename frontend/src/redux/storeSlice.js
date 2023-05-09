import { createSlice } from "@reduxjs/toolkit"

const storeSlice = createSlice({
    name: "store", 
    initialState: {
        isFetching: null,
        allStore: [],
        error: null
    },
    reducers: {
        getAllStoreStart: (state) => {
            state.isFetching = true;
        },
        getAllStoreSuccess: (state, action) => {
            state.isFetching = false;
            state.allStore = action.payload.data;
            // state.allStore = []
        },
        getAllStoreFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
}); 

export const {
    getAllStoreStart,
    getAllStoreSuccess,
    getAllStoreFailed,
} = storeSlice.actions;

export default storeSlice.reducer;