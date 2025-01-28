import React from 'react'
import { applyMiddleware, createStore } from 'redux'
import ReducerDoc from './ReducerDoc'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';

    const Store = createStore(ReducerDoc , composeWithDevTools(
        applyMiddleware(logger)
      ))
      
      //,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      // Store.subscribe(()=>{
      //     console.log('state changed');
      // })
      // Store.dispatch()



export default Store
