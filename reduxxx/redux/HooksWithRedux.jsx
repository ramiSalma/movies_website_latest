import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from './Action'

const HooksCounter = () => {
    
    const Counter = useSelector((state) => state.value)
    const dispatch = useDispatch()
  return (
    <div>
      
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
export default HooksCounter


