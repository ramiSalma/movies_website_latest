import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { add_user } from './usersActions';

const Adduser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector(state => state.UsersReducer)
  const [data, setData] = useState({
    name: '',
    age : ''
  });
  const handleChange =(e)=>{
    const {name , value} = e.target 
    setData({...data, [name]: value})
  }
  const handleAdd = (e) => {
      e.preventDefault()
      if(!data.name || !data.age){
        alert('Please fill all fields')
      }else{

        dispatch(add_user({ id: users.length + 1, name: data.name , age: data.age}));
        navigate("/users")
      }
      
    };
  return (
    <div className='container'>
       <form action="" className='col-4'>
        <div class="form-group">
          <label for="">name: </label>
          <input type="text" class="form-control" name="name" value={data.name} onChange={(e)=>handleChange(e)} placeholder=""/>
        
        </div>
        <div class="form-group">
          <label for="">age: </label>
          <input type="number" class="form-control" name="age" value={data.age} onChange={(e)=>handleChange(e)} placeholder=""/>
        </div>
        <button className='btn btn-primary my-4' onClick={handleAdd}>add user</button>
       </form>
    </div>
  )
}

export default Adduser
