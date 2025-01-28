import { ADD_USER, DELETE_USER, UPDATE_USER } from "./usersActions";

const initialState = [
    {id:1,name:"salma",age:22},
    {id:2,name:"ali",age:25},
    {id:3,name:"mohamed",age:30}
  ];
  
export   const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_USER:
        return [...state, action.payload];
      case UPDATE_USER:
        return state.map((item) => (item.id === action.payload.id ? { ...item, ...action.payload } : item));
      case DELETE_USER:
        return state.filter((item) => item.id !== action.payload);
      default:
        return state;
    }
  };
  