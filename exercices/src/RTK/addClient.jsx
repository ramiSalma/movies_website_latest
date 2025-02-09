import React, { useState } from 'react'
import {useDispatch , useSelector} from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { addClient } from './ReducerSlice'
export const AddClient = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const users = useSelector(state => state.clients.customers)
    const [data,setData] = useState({
        id : users[users.length -1].id + 1,
        nom : '',
        age : ''

    })
    const handleChange = (e)=>{
        const {name , value} = e.target
        setData({...data , [name] : value})
    }
    const handleClick = (e)=>{
        e.preventDefault()
        if( !data.nom || !data.age){
            alert('fill all the inputs')
        }else{
            dispatch(addClient(data))
            navigate('/clients')
        }
        
    }
  return (
    <div className='col-4 container'>
      
      <div class="form-group">
        <label for="">name</label>
        <input type="text" class="form-control" name="nom" value={data.nom} onChange={(e)=>handleChange(e)}/>
        
      </div>
      <div class="form-group">
        <label for="">age</label>
        <input type="number" class="form-control" name="age" value={data.age} onChange={(e)=>handleChange(e)}/>
        
      </div>
      <button onClick={handleClick}  className='btn btn-primary'>add user</button>
    </div>
  )
}
