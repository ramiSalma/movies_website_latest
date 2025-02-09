import React from 'react'
import { Routes , Route, BrowserRouter} from 'react-router-dom'
import Nav from './navbar/nav'
import { ClientsTable } from './RTK/ClientsTable'
// import UsersTable from './REDUX/UsersTable'
// import Adduser from './REDUX/Adduser'
// import { Updateuser } from './REDUX/update'

const App = () => {
  return (
    <div>
      <BrowserRouter >
      <Routes>
        <Route path='/' element={<Nav/>}>
          {/* <Route path='/users' element={<UsersTable/>} />
          <Route path='/add' element={<Adduser/>} />
          <Route path='/update/:id' element={<Updateuser/>} /> */}

     
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

