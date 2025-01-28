export const ADD_USER = "add_user"
export const DELETE_USER = "delete_user"
export const UPDATE_USER = "update_user"
export const add_user = (user) => ({
    type: ADD_USER,
    payload: user,
  });
  
  export const update_user = (user) => ({
    type: UPDATE_USER,
    payload: user,
  });
  
  export const delete_user = (id) => ({
    type: DELETE_USER,
    payload: id,
  });
  