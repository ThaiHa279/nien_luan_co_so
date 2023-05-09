import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart", 
    initialState: {
        items: {
            item: [] 
        }
    },
    reducers: {
        addItems: (state, action) => {
            const item = {...action.payload, quantity: 1};
            if (state.items.item.length === 0) {
                state.items.item.push(item);
            } else {
                const index = state.items.item.findIndex(i => i.id === item.id);
                if (index === -1) {
                    state.items.item.push(item);
                } else {
                    state.items.item[index].quantity++; 
                }
            }
            // console.log(state.items.item[index].name);
            // state.items.item.push(item);
            // state.items.item = [];
        },
        removeItems: (state, action) => {
            // state.items.item.pop(action.payload);
            
            state.items.item = state.items.item.filter(item => item.id != action.payload.id)
        },
        changeQuantityItem: (state, action) => {
            state.items.item.find(it => it.id === action.payload.id).quantity = action.payload.value;
        }
    }
}); 

export const {
    addItems, 
    removeItems,
    changeQuantityItem,
} = cartSlice.actions;

export default cartSlice.reducer;