import React from 'react'
import { Routes , Route, BrowserRouter} from 'react-router-dom'
import Nav from './navbar/nav'
// import UsersTable from './REDUX/UsersTable'
// import Adduser from './REDUX/Adduser'
// import { Updateuser } from './REDUX/update'
import { ClientsTable } from './RTK/ClientsTable'
const App = () => {
  return (
    <div>
      <BrowserRouter >
      <Routes>
        <Route path='/' element={<Nav/>}>
          {/* <Route path='/users' element={<UsersTable/>} />
          <Route path='/add' element={<Adduser/>} />
          <Route path='/update/:id' element={<Updateuser/>} /> */}

          <Route path='/clients' element={<ClientsTable/>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

