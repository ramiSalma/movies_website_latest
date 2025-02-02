import {ADD_USER , REMOVE_USER , UPDATE_USER} from "./actions"
const init = [
    {id:1 , name:"John" , age:25},
    {id:2 , name:"Jane" , age:30},
    {id:3 , name:"Bob" , age:35}
]
export const Reducer = (state= init , action)=>{
    switch(action.type){
        case ADD_USER:
            return [...state , action.payload]
        case REMOVE_USER:
            return state.filter((e)=> e.id === action.payload)
        case UPDATE_USER : 
            return state.map((e) => e.id === action.payload.id ? { ...e , ...action.payload} : e)
        default :
            return state
    }
}