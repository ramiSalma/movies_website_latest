


// import { UsersReducer } from "../REDUX_USERS/USersReducer";
// import { ClientsReducer } from "../REDUX_CLIENTS/ClientsReducer";
import {  applyMiddleware, createStore } from "redux";
import { ThunkReducer } from "../API_WITH_REDUX_THUNK/Thunk_Reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// const rootreducer = combineReducers({
//     ClientsReducer ,
//     UsersReducer ,
//     ThunkReducer
// })
export const Store = createStore(
    ThunkReducer
    ,composeWithDevTools(applyMiddleware(thunk)) 
);