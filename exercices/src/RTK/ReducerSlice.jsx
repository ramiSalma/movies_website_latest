import { createSlice } from "@reduxjs/toolkit";

const list = {
    customers: [  // Keep the key name consistent (customers or clients)
        { id: 1, nom: 'Jumana', age: 25 },
        { id: 2, nom: 'Jabrane', age: 30 },
        { id: 3, nom: 'Bilena', age: 35 }
    ]
};

const ReducerSlice = createSlice({
    name : 'clients',
    initialState : list,
    reducers : {
        addClient : (state,action) => {state.customers.push(action.payload)},
        removeClient : (state,action) =>  { 
            state.customers =  state.customers.filter((e)=> e.id !== action.payload)
        },
        updateClient : (state,action)=>{
            state.customers = state.customers.map((e)=> e.id === action.payload.id ? 
        {...e , ...action.payload} : e)
        }
    }
})
export const {addClient , removeClient , updateClient}  = ReducerSlice.actions
export default ReducerSlice.reducer;