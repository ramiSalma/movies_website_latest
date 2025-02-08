import React from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { onremove } from './clientsReducer'


export const ClientsTable = () => {
    const clients = useSelector(state => state)
    console.log(clients);
    const dispatch = useDispatch()
    const handleDelete = (id)=>{
        dispatch(onremove(id))
    }
  return (
    <div className='container'>
        <h1 className="text-success">client table</h1>
        <Link to={'/add'} className="btn btn-primary" >add client</Link>
      <table className=' table table-success my-5'>
        <thead>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>age</th>
                <th>delete</th>
                <th>update</th>
            </tr>
        </thead>
        <tbody>
            {clients && clients.map((client)=>(
                <tr key={client.id}>
                    <td>{client.id}</td>
                    <td>{client.nom}</td>
                    <td>{client.age}</td>
                    <td><button onClick={()=>handleDelete(client.id)} className="btn btn-danger">delete</button></td>
                    <td><Link to={'/update/'+client.id} className="btn btn-success">update</Link></td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}


