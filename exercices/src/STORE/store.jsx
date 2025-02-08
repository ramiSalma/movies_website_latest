import {createStore} from 'redux'
import {usersReducer} from '../REDUX/usersReducer'
export const Store =  createStore(usersReducer,
     window.__REDUX_DEVTOOLS_SESSION && window.__REDUX_DEVTOOLS_SESSION())