import { createSlice } from "@reduxjs/toolkit"

const distSlice = createSlice({
    name: "distributor", 
    initialState: {
        isFetching: null,
        allDistributor: [],
        error: null
    },
    reducers: {
        getAllDistStart: (state) => {
            state.isFetching = true;
        },
        getAllDistSuccess: (state, action) => {
            state.isFetching = false;
            // state.allDistributor = []
            state.allDistributor = action.payload.data;
        },
        getAllDistFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
}); 

export const {
    getAllDistStart,
    getAllDistSuccess,
    getAllDistFailed,
} = distSlice.actions;

export default distSlice.reducer;