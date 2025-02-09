import { configureStore } from "@reduxjs/toolkit";
import ReducerSlice from "../RTK/ReducerSlice"
//import { combineReducers, createStore } from "redux";

import userSlice from '../API/ReducerThunk'
// const rootreducers = combineReducers(
//     ReducerSlice , usersReduer
// )
// export const Store = createStore(rootreducers)
export const Store = configureStore({
    reducer : {
        clients : ReducerSlice , 
        users : userSlice ,
    }
})