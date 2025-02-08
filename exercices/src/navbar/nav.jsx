import React from 'react'
import {Link , Outlet} from 'react-router-dom'
const Nav = () => {
  return (
    <div>
      <ul className="nav nav-tabs bg-success p-4 justify-content-around">
          <li className="nav-item">
              <Link to='/' className="nav-link  fs-5 text-warning"  >home</Link>
          </li>
          <li className="nav-item">
              <Link to={'/clients'} className="nav-link fs-5 text-warning"  >clients</Link>
          </li>
          <li className="nav-item">
              <Link to={'/users'} className="nav-link fs-5 text-warning " >users</Link>
          </li>
      </ul>
        <Outlet/>
    </div>
  )
}

export default Nav
