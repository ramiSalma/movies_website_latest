// import {createStore} from 'redux'
// import {usersReducer} from '../REDUX/usersReducer'
// export const Store =  createStore(usersReducer,
//      window.__REDUX_DEVTOOLS_SESSION && window.__REDUX_DEVTOOLS_SESSION())

import { createSlice } from "@reduxjs/toolkit";
import { ClientsSlice } from "../RTK/clientsReducer";

export const  Store = createSlice({
     reducer :{
          clients : ClientsSlice
     }
})