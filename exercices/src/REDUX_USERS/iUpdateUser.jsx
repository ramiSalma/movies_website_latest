import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { update_user } from './usersActions';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams()
  const user = useSelector(state => state.find((u)=>u.id == Number(id)))
  const [data, setData] = useState({
    name: '',
    age : ''
  });
  useEffect(()=>{
    if(user){
        setData(user)
    }
  },[user])

  const handleChange =(e)=>{
    const {name , value} = e.target 
    setData({...data, [name]: value})
  }


  const handleupdate = (e) => {
      e.preventDefault()
      if(!data.name || !data.age){
        alert('Please fill all fields')
      }else{
        dispatch(update_user({id :Number(id) , name : data.name , age : data.age}))
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
        <button className='btn btn-primary my-4' onClick={handleupdate}>update user</button>
       </form>
    </div>
  )
}


