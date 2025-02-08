import { produce } from "immer";
import { ADD_USER, DELETE_USER, UPDATE_USER } from "./usersActions";

const initialState =[
  { id: 1, name: "salma", age: 22 },
  { id: 2, name: "ali", age: 25 },
  { id: 3, name: "mohamed", age: 30 },
]


export const UsersReducer = (state = initialState, action) => 
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_USER:
         draft.push(action.payload); 
        break
      case UPDATE_USER:
        return draft.map((e)=> e.id === action.payload.id ? {...e , ...action.payload}: e)
      case DELETE_USER:
        return draft.filter((e) => e.id !== action.payload);

      default:
        break;
    }
  });










//++++++++++++++++   without immer ++++++++++++
// export   const UsersReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case ADD_USER:
//         return [...state, action.payload];
//       case UPDATE_USER:
//         return state.map((item) => (item.id === action.payload.id ? { ...item, ...action.payload } : item));
//       case DELETE_USER:
//         return state.filter((item) => item.id !== action.payload);
//       default:
//         return state;
//     }
//   };
  