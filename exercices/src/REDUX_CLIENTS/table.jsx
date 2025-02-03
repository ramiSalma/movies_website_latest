import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { delete_client } from "./clinetsActions";


export const Clients = () => {
  const clients = useSelector((state) => state.clients);
  const dispatch = useDispatch();
  const handleClick =(id)=>{
    dispatch(delete_client(id))
  }
  
  return (
    <div className="container">
      <h2>List clients</h2>
      <Link to="/clients/addclient" className="btn btn-primary my-4" >add user</Link>
      <div className="row">
            {clients && clients.map((user) => (
            <div className="col-3 p-3 border border-2 border-primary m-2" key={user.id}>
                <h4>{user.id}</h4>
                <h4>name: {user.name.firstname} {user.name.lastname}</h4>
                <h4>age : {user.age}</h4>
                <h4>skills: 
                  {user &&  user.skills.length > 0 ? user.skills.map((s)=>  s ).join(" , ") : "no skills"}
                </h4>
                <h4><Link to={'/clients/edit/'+user.id} className="btn btn-outline-primary" >Edit</Link>
                <button className="btn btn-outline-danger mx-2" onClick={() => handleClick(user.id)}>Delete</button></h4>
            </div>
            ))}

      </div>
     
    </div>
  );
};
