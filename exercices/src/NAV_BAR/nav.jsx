import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Nav = () => {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark p-3 justify-content-center">
          <li className="nav-item">
              <Link to='/' className='nav-link text-warning'  >Active link</Link>
          </li>
          <li className="nav-item">
              <Link to={'/users'} className="nav-link text-warning" >users store</Link>
          </li>
          <li className="nav-item">
              <Link to={'/clients'} className="nav-link text-warning" >clients </Link>
          </li>
          
      </ul>
      <Outlet/>
    </div>
  )
}

export default Nav



