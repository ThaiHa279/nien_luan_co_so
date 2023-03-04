import axios from 'axios'; 
import { 
    loginFailed,
    loginStart,
    loginSuccess,
    logoutFailed, 
    logoutSuccess,
    logoutStart, 
    registerFailed, 
    registerStart, 
    registerSuccess }
from './authSlice';

import {    
    getItemsStart, 
    getItemsSuccess,
    getItemsFailed }
from './materialSlice';

export const loginUser = async(user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await axios.post("http://localhost:8080/api/v1/auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/seller");
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
export const logoutUser = async(accessToken, id, dispatch, navigate, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post("/v1/auth/logout/", id, {
            headers: {token: `Bearer ${accessToken}`}, 
        })
        dispatch(logoutSuccess());
        navigate('/');
    } catch (err) {
        dispatch(logoutFailed());
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

export const nhaphang = async(data, accessToken) => {
    try {
        await axios.put("http://localhost:8080/api/v1/auth/marterial/details",{
            headers: {token: `Bearer ${accessToken}`}, 
        }, data);
    } catch(err) {
        console.log(err);
    }
}