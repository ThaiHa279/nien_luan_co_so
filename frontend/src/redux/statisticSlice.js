import { createSlice } from "@reduxjs/toolkit"

const statisticSlice = createSlice({
    name: "statistic", 
    initialState: {
        isFetching: null,
        allStatistic: [],
        detailStatistic: [],
        error: null
    },
    reducers: {
        getAllStatisticStart: (state) => {
            state.isFetching = true;
        },
        getAllStatisticSuccess: (state, action) => {
            state.isFetching = false;
            // state.allStatistic = []
            state.allStatistic = action.payload.data;
        },
        getDetailStatisticSuccess: (state, action) => {
            state.isFetching = false;
            // state.allStatistic = []
            state.detailStatistic = action.payload.data;
        },
        getAllStatisticFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
}); 

export const {
    getAllStatisticStart,
    getAllStatisticSuccess,
    getAllStatisticFailed,
    getDetailStatisticSuccess,
} = statisticSlice.actions;

export default statisticSlice.reducer;