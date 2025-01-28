// App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDelete, fetchUsers } from './Thunk_Reducer';
import { Link } from 'react-router-dom';


export const DataApi = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.ThunkReducer);
    console.log(data);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id)=>{
    dispatch(fetchDelete(id))
  }

  return (
    <div className='container'>
      <h1>Users from api to store state</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Link to="/create" className="btn btn-primary my-3">Create User</Link>
      <table className='table table-success'>
        <thead>
            <tr>
                <th>Id</th>
                <th>full name</th>
                <th>email</th>
                <th>phone number</th>
                <th>delete</th>
            </tr>
            
        </thead>
        <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name.firstname} {user.name.lastname} </td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td><button onClick={()=>handleDelete(user.id)} className='btn btn-danger'>delete</button></td>
            </tr>
        ))}
        </tbody>
      </table>
      
    </div>
  );
};

