import { configureStore } from '@reduxjs/toolkit'
import { ReducerTask } from './SliceTask'


const  StoreToolkit = configureStore({
    reducer : {
        task : ReducerTask 
    }
})
export default StoreToolkit
