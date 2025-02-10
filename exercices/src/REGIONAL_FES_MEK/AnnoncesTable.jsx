import React from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
const AnnoncesTable = () => {
    const liste = useSelector(state => state.annonces.annonces)
  return (
    <div className='container'>
      <table className='table table-info'>
        <thead>
            <tr>
                <th>email</th>
                <th>ville</th>
                <th>code postale</th>
                <th>details</th>
            </tr>
        </thead>
        <tbody>
            {liste.map((e)=>{
                
                return (
                
                <tr key={e.id}>
                    <td>{e.email}</td>
                    <td>{e.ville}</td>
                    <td>{e.codepostal}</td>
                    <td><Link to={'/detailannonce/'+e.id} className='btn btn-primary'>details</Link></td>
                </tr>
            )})}
        </tbody>
      </table>
    </div>
  )
}

export default AnnoncesTable
