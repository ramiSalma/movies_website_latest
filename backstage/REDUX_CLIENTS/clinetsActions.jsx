export const ADD_CLIENT = "add_client"
export const DELETE_CLIENT = "delete_client"
export const UPDATE_CLIENT = "update_client"
export const add_client = (client) => ({
    type: ADD_CLIENT,
    payload: client,
  });
  
  export const update_client = (client) => ({
    type: UPDATE_CLIENT,
    payload: client,
  });
  
  export const delete_client = (id) => ({
    type: DELETE_CLIENT,
    payload: id,
  });
  