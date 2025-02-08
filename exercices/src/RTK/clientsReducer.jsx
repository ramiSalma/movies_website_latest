import { createSlice } from "@reduxjs/toolkit";

const init = {
    clients : [
        {id: 1 ,nom: 'John', age: 25},
        {id:2 ,nom: 'Jane', age: 30},
        {id:3 ,nom: 'Bob', age: 35}
    ]
}
export const ClientsSlice = createSlice({
    name : 'clients',
    initialeState : init.clients  , 
    reducers : {
        onadd : (state,action) => state.push(action.payload),
        onremove : (state,action) => state.filter((e)=> e.id !== action.payload),
        onupdate : (state,action) => state.map((e)=> e.id === action.payload.id ? 
        {...e , ...action.payload} : e)
    }
})
export const {onadd , onremove , onupdate} = ClientsSlice.actions
export default ClientsSlice.reducer