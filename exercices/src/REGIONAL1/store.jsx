import { createSlice } from "@reduxjs/toolkit";
import Userreducer from "./userreducer";

export const Store = createSlice({
    reducer: {
        users : Userreducer
    }
});