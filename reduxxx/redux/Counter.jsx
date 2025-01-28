import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from './Action'

const Counter = () => {
    
    const Counter = useSelector((state) => state.value)
    const dispatch = useDispatch()
  return (
    <div className='container bg-dark p-5 m-5'>
        <h1 className="text-info my-4">counter exemple</h1>
        <button type="button" onClick={()=>dispatch(decrement())} 
        className='btn btn-info mx-3 text-white' >-
        </button>
        
        <label htmlFor="" className='text-info'><h4>{Counter} </h4></label>

        <button type="button"  onClick={()=>dispatch(increment())} 
        className='btn btn-info mx-3 text-white'>+
        </button>
  
    </div>
  )
}
export default Counter


