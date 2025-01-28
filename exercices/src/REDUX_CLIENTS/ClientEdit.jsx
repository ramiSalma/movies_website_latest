import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { update_client } from './clinetsActions';

export const ClientEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams()
  const user = useSelector(state => state.ClientsReducer.clients.find((u)=>u.id == Number(id)))
  const [data, setData] = useState({
    name: {firstname : ''},
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
        dispatch(update_client({id :Number(id) , name : {firstname : data.name} , age : data.age}))
        navigate("/clients")
      }
      
    };
  return (
    <div className='container'>
       <form action="" className='col-4'>
        <div class="form-group">
          <label for="">name: </label>
          <input type="text" class="form-control" name="name" value={data.name.firstname} onChange={(e)=>handleChange(e)} placeholder=""/>
        
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


