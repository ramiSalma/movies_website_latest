import React from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { onRemove } from './usersReducer'
import { Link } from 'react-router-dom'
const UsersTable = () => {
    const users = useSelector(state=> state.users)
    const dispatch = useDispatch()
    const handleDelete = (id)=>{
        dispatch(onRemove(id))
    }
  return (
    <div className='container'>
        <h1 className="text-success">users table</h1>
        <Link to={'/add'} className="btn btn-primary" >add user</Link>
      <table className=' table table-dark my-5'>
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
            {users.map((user)=>(
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nom}</td>
                    <td>{user.age}</td>
                    <td><button onClick={()=>handleDelete(user.id)} className="btn btn-danger">delete</button></td>
                    <td><Link to={'/update/'+user.id} className="btn btn-success">update</Link></td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersTable
