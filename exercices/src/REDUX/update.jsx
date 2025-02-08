import React, { useState , useEffect } from 'react'
import {useDispatch , useSelector} from 'react-redux'

import { useNavigate, useParams } from 'react-router-dom'
import { onUpdate } from './usersReducer'
export const Updateuser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data,setData] = useState({
        id : '',
        nom : '',
        age : ''

    })
    const handleChange = (e)=>{
        const {name , value} = e.target
        setData({...data , [name] : value})
    }
    const {id} = useParams()
    const user = useSelector(state => state.users.find((u)=> u.id === Number(id) ))
    useEffect(()=>{
        if(user){
            setData(user)
        }
    },[user])


    const handleClick = (e)=>{
        e.preventDefault()
        if(!data.id || !data.nom || !data.age){
            alert('fill all the inputs')
        }else{
            dispatch(onUpdate({
                id : data.id , 
                nom : data.nom ,
                age : data.age
            }))
            navigate('/users')
        }
        
    }
  return (
    <div className='col-4 container'>
      <div class="form-group">
        <label for="">id</label>
        <input type="number" class="form-control" name="id" value={data.id} onChange={(e)=>handleChange(e)}/>
        
      </div>
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


