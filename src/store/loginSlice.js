import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    login: localStorage.getItem("logedIn") ? localStorage.getItem("logedIn") : false,
    customerData: {
        id: localStorage.getItem("id") ? localStorage.getItem("id") : null,
        lat: localStorage.getItem("lat") ? localStorage.getItem("lat") : null,
        long: localStorage.getItem("long") ? localStorage.getItem("long") : null,
        customer_first_name: localStorage.getItem("customer_first_name")
            ? localStorage.getItem("customer_first_name")
            : null,
        customer_role: localStorage.getItem("customer_role")
            ? localStorage.getItem("customer_role")
            : null,
        user_profile_pic: localStorage.getItem("user_profile_pic")
            ? localStorage.getItem("user_profile_pic")
            : null,
        customer_id: localStorage.getItem("customer_id")
            ? localStorage.getItem("customer_id")
            : null,
        api_key: localStorage.getItem("api_key")
            ? localStorage.getItem("api_key")
            : null,
    },
    accessRights: localStorage.getItem("accessRights") ? JSON.parse(localStorage.getItem("accessRights")) : {},
    addonModule:localStorage.getItem("addonModule") ? JSON.parse(localStorage.getItem("addonModule")) : {},
    TransportationGeofence: localStorage.getItem("TransportationGeofence") ? JSON.parse(localStorage.getItem("TransportationGeofence")) : [],
    tripGeofenceChagned:false,
    VtDataFormat:{}
    
}   


export const loginSlice = createSlice({
    name: "loginController",
    initialState,
    reducers: {
        login: (state, action) => {
            state.login = true;
            state.customerData = { ...action.payload }
        },
        signout: (state) => {
            state.login = false;
            state.customerData = {};
            state.accessRights = {};
            state.accessreports = {};
            state.VtDataFormat = {};
            state.TransportationGeofence = {}
        },
        saveSetting: (state, action) => {
            state.TransportationGeofence = { ...action.payload.TransportationGeofence, }
            state.accessRights = { ...action.payload.accessRights }
            state.accessreports = { ...action.payload.accessreports }
        },
        tripGeoFenceChagnes:(state,action)=>{
            state.tripGeofenceChagned=action.payload.status
        },
        dateFormat:(state,action)=>{
            state.VtDataFormat = {...action.payload.VtDataFormat}
        },
        addonSetting: (state, action) => {
            
            state.addonModule = { ...action.payload.addonModule }
        },
      
    },
})
export const { login, signout, saveSetting,setCenterMap,tripGeoFenceChagnes,dateFormat,addonSetting } = loginSlice.actions
export default loginSlice.reducer