import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { addUser, fetchadd } from './Thunk_Reducer';



export const Add_Data_Api = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector(state => state.ThunkReducer.data)
  const [data, setData] = useState({
    name: '',
    email : '',
    phone : ''
  });
  const handleChange =(e)=>{
    const {name , value} = e.target 
    setData({...data, [name]: value})
  }
  const handleAdd = (e) => {
      e.preventDefault()
      if(!data.name || !data.email || !data.phone){
        alert('Please fill all fields')
      }else{
          dispatch(addUser({
            id : users.length + 1 ,
            name : {firstname : data.name},
            email : data.email ,
            phone : data.phone
            }));
        
          navigate("/")
      }
      
    };
  return (
    <div className='container'>
       <form action="" className='col-4'>
        <div className="form-group">
          <label htmlFor="">name: </label>
          <input type="text" className="form-control" name="name" value={data.name} onChange={(e)=>handleChange(e)} placeholder=""/>
        
        </div>
        <div className="form-group">
          <label htmlFor="">age: </label>
          <input type="email" className="form-control" name="email" value={data.email} onChange={(e)=>handleChange(e)} placeholder=""/>
        </div>
        <div className="form-group">
          <label htmlFor="">phone number: </label>
          <input type="tel" className="form-control" name="phone" value={data.phone} onChange={(e)=>handleChange(e)} placeholder=""/>
        </div>
        <button className='btn btn-primary my-4' onClick={handleAdd}>add client</button>
       </form>
    </div>
  )
}

