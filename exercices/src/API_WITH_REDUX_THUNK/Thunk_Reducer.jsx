import axios from "axios";

// userActions.js
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'
const FETCH_DELETE = "FETCH_DELETE"
const FETCH_ADD = "FETCH_ADD"
const FETCH_UPDATE = "FETCH_UPDATE"


export const fetchUsersStart = () => ({ 
    type:  FETCH_USERS_REQUEST
});
export const fetchUsersSuccess = (users) => ({ 
    type: FETCH_USERS_SUCCESS, 
    payload: users 
});
export const fetchUsersError = (error) => ({
     type: FETCH_USERS_FAILURE, 
     payload: error 
    });
export const fetchDelete = (id)=>({
    type : FETCH_DELETE,
    payload : id
})
export const fetchadd = (user)=>({
    type : FETCH_ADD,
    payload : user
})
export const fetchupdate = (user)=>({
    type : FETCH_UPDATE,
    payload : user
})




export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUsersStart());
    try {
      const response = await axios.get('https://fakestoreapi.com/users');
      dispatch(fetchUsersSuccess(response.data));
    } catch (error) {
      dispatch(fetchUsersError(error.message));
    }
  };
};


export const addUser = (newUser) => async (dispatch) => {
    try {
      const response = await axios.post("https://fakestoreapi.com/users", newUser);
      dispatch(fetchadd(response.data)); // Ensure the API returns the user object
    } catch (error) {
      console.error("Failed to add user:", error.message);
    }
  };
  

// userReducer.js
const initialState = {
    data: [],
    loading: false,
    error: null,
  };
  
  export const ThunkReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USERS_REQUEST:
        return { ...state, loading: true, error: null };

      case FETCH_USERS_SUCCESS:
        return { ...state, loading: false, data: action.payload };

      case FETCH_USERS_FAILURE:
        return { ...state, loading: false, error: action.payload };

      case  FETCH_DELETE :
        return {...state , data : state.data.filter((item) => item.id !== action.payload)};


        case FETCH_ADD:
            return { ...state, data: [...state.data, action.payload] };
    

        case FETCH_UPDATE:
        return {
            ...state,
            data: state.data.map((client) =>
                client.id === action.payload.id ? { ...client, ...action.payload } : client
            ),
            };  

      default:
        return state;
    }
  };
  