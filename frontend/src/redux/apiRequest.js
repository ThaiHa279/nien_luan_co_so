import axios from 'axios'; 
import { 
    loginFailed,
    loginStart,
    loginSuccess,
    registerFailed, 
    registerStart, 
    registerSuccess,
}
from './authSlice';

import {    
    getItemsStart, 
    getItemsSuccess,
    getItemsFailed,
    getListItemsStart, 
    getListItemsSuccess,
    getListItemsFailed, 
    getTypeItemsStart,
    getTypeItemsSuccess,
    getTypeItemsFailed,
}
from './materialSlice';

import {
    getAllStoreStart,
    getAllStoreSuccess,
    getAllStoreFailed
} from './storeSlice.js'

import {
    getAllDistStart,
    getAllDistSuccess,
    getAllDistFailed
} from './distributorSlice.js'

import {
    getAllOrderStart,
    getAllOrderSuccess,
    getAllOrderFailed,
} from './orderSlice'


import {
    getAllStatisticStart,
    getAllStatisticSuccess,
    getAllStatisticFailed,
    getDetailStatisticSuccess,
} from './statisticSlice';


export const loginUser = async(user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await axios.post("http://localhost:8080/api/v1/auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch(err) {
        dispatch(loginFailed());
    }
}
export const registerUser = async(user, dispatch, navigate) => {
    dispatch(registerStart())
    try {
        await axios.post("http://localhost:8080/api/v1/auth/register", user);
        dispatch(registerSuccess());
        navigate("/sign-in");
    } catch(err) {
        dispatch(registerFailed());
    }
}

export const getAllItems = async(dispatch) => {
    dispatch(getItemsStart())
    try {
        const items = await axios.get("http://localhost:8080/api/v1/material");
        dispatch(getItemsSuccess(items));
    } catch(err) {
        dispatch(getItemsFailed());
    }
}

export const ImportStore = async(data, accessToken) => {
    try {
        console.log(data);
        await axios.post("http://localhost:8080/api/v1/grn",data,{
            headers: {authorization: `Bearer ${accessToken}`}, 
        });
    } catch(err) {
        console.log(err);
    }
}

export const ExportStore = async(data, accessToken) => {
    try {
        console.log(data);
        await axios.post("http://localhost:8080/api/v1/bill",data,{
            headers: {authorization: `Bearer ${accessToken}`}, 
        });
    } catch(err) {
        console.log(err);
    }
}

export const getListItems = async(type_id, dispatch) => {
    dispatch(getListItemsStart());
    try {
        const res = await axios.get(`http://localhost:8080/api/v1/material/${type_id}`);
        dispatch(getListItemsSuccess(res.data));
    } catch(err) {
        dispatch(getListItemsFailed(err.response.data));
    }
}


export const getTypeItems = async(dispatch) => {
    dispatch(getTypeItemsStart());
    try {
        const res = await axios.get(`http://localhost:8080/api/v1/material/type`);
        dispatch(getTypeItemsSuccess(res.data));
    } catch(err) {
        dispatch(getTypeItemsFailed(err.response.data));
    }
}

export const orderItems = async(user_id, items, payment, delivery , accessToken) => {
    const data = {
        user_id: user_id, 
        items: items,
        payment: payment,
        delivery_to: delivery,
    }
    try {
        await axios.post("http://localhost:8080/api/v1/order", data, {
            headers: {authorization: `Bearer ${accessToken}`}, 
        });
        alert(`Đặt hàng thành công!`);
    } catch(err) {
        console.log(err);
    }
}

export const getAllStore = async(dispatch) => {
    dispatch(getAllStoreStart());
    try {
        const list_store = await axios.get("http://localhost:8080/api/v1/store");
        dispatch(getAllStoreSuccess(list_store));
    } catch (error) {
        dispatch(getAllStoreFailed());
    }
}

export const getAllDistributor = async(dispatch) => {
    dispatch(getAllDistStart());
    try {
        const list_Dist = await axios.get("http://localhost:8080/api/v1/distributor");
        dispatch(getAllDistSuccess(list_Dist));
    } catch (error) {
        dispatch(getAllDistFailed());
    }
}
export const getAllOrder = async(dispatch, accessToken) => {
    dispatch(getAllOrderStart());
    try {
        const list_order = await axios.get("http://localhost:8080/api/v1/order", {
            headers: {authorization: `Bearer ${accessToken}`}, 
        });
        dispatch(getAllOrderSuccess(list_order));
    } catch (error) {
        dispatch(getAllOrderFailed());
    }
}


export const getAllStatistic = async(dispatch, accessToken) => {
    dispatch(getAllStatisticStart());
    try {
        const all_statistic = await axios.get("http://localhost:8080/api/v1/statistic", {
            headers: {authorization: `Bearer ${accessToken}`}, 
        });
        dispatch(getAllStatisticSuccess(all_statistic));
    } catch (error) {
        dispatch(getAllStatisticFailed());
    }
}
export const monthStatistic = async(dispatch, date, accessToken) => {
    dispatch(getAllStatisticStart());
    try {
        const list_item = await axios.get(`http://localhost:8080/api/v1/statistic/${date}`, {
            headers: {authorization: `Bearer ${accessToken}`}, 
        });
        dispatch(getDetailStatisticSuccess(list_item));
    } catch (error) {
        dispatch(getAllStatisticFailed());
    }
}