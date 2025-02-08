// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import {Provider} from 'react-redux'
import { createSlice } from "@reduxjs/toolkit";
import { ClientsSlice } from "./RTK/clientsReducer";

export const  Store = createSlice({
     reducer :{
          clients : ClientsSlice
     }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <App/>

  </Provider>
 );
reportWebVitals();
