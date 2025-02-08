//====== actions 
 const ADD_USER = 'ADD_USER'
 const REMOVE_USER = 'REOVE_USER'
 const UPDATE_USER = 'UPDATE_USER'
 export const onAdd = (user)=>({
    type : ADD_USER , 
    payload : user
})
 export const onRemove = (user)=>({
    type : REMOVE_USER , 
    payload : user
})
 export const onUpdate = (user)=>({
    type : UPDATE_USER , 
    payload : user
})
//=============reucer
const init = {
    users : [
        {id: 1 ,nom: 'John', age: 25},
        {id:2 ,nom: 'Jane', age: 30},
        {id:3 ,nom: 'Bob', age: 35}
    ]
}

export const usersReduer = (state=init , action)=>{
    switch(action.type){
        case ADD_USER :
            return {...state , users : [...state.users , action.payload]}
        case REMOVE_USER :
            return {...state , users : state.users.filter((u)=>u.id !== action.payload)}
        case UPDATE_USER :
            return {...state , users : state.users.map((u)=> u.id === action.payload.id 
            ? {...u , ...action.payload} : u)}
        default : 
            return state
    }
}