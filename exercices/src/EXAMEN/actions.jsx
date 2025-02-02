export const ADD_USER = 'add_user'
export const REMOVE_USER = 'remove_user'
export const UPDATE_USER = 'update_user'

export const onAdd = (user)=>({
    type : ADD_USER,
    payload : user
})
export const onDelte = (id)=>({
    type : REMOVE_USER,
    payload : id
})
export const onUpdate = (user)=>({
    type : UPDATE_USER,
    payload : user
})