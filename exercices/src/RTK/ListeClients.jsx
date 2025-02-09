import React from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { removeClient } from './ReducerSlice';
import { Link } from 'react-router-dom';
const ListeClients = () => {
    const clients = useSelector(state => state.clients.customers)
    console.log(clients);
    const dispatch = useDispatch()
    const handleDelete = (id)=>{
        dispatch(removeClient(id))
    }
  return (
    <div className='container'>
        <h1 className="text-success">clients table</h1>
        <Link to={'/addClient'} className="btn btn-primary" >add client</Link>
      <div className="row">
         {clients.map((client)=>(
                <div className='col-3 p-4 border border-2 border-success m-4' key={client.id}>
                    <h4>id : {client.id}</h4>
                    <h4>name: {client.nom}</h4>
                    <h4>age : {client.age}</h4>
                    <h4><button onClick={()=>handleDelete(client.id)} className="btn btn-danger">delete</button>
                    <Link to={'/updateClient/'+client.id} className="btn btn-success">update</Link></h4>
                </div>
            ))}
      </div>
           
      
    </div>
  )
}

export default ListeClients
