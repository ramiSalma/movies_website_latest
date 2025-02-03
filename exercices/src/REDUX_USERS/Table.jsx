import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delete_user } from "./usersActions";
import { Link } from "react-router-dom";

export const Users = () => {
  const users = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleClick =(id)=>{
    dispatch(delete_user(id))
  }
  
  return (
    <div className="container">
      <h2>List users</h2>
      <Link to="/users/adduser" className="btn btn-primary my-4" >add user</Link>
      <table className="table table-dark">
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
            {users.map((user) => (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td><Link to={'/users/update/'+user.id} className="btn btn-outline-primary" >Edit</Link></td>
                <td><button className="btn btn-outline-danger" onClick={() => handleClick(user.id)}>Delete</button></td>
            </tr>
            ))}

        </tbody>
      </table>
     
    </div>
  );
};
