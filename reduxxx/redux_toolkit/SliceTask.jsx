import { createSlice } from "@reduxjs/toolkit";
const initialeState = {value : 0}
export const ReducerTask = createSlice({
    name: "task",
    initialeState , 
    reducers : {
        increment : (state) => state.value + 1 , 
        decrement : (state) => state.value - 1 ,
    }
})
export const {increment , decrement}  = ReducerTask.actions ;
export default ReducerTask.reducer ; 