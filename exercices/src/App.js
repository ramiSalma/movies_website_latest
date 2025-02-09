import React from 'react'
import { Routes , Route, BrowserRouter} from 'react-router-dom'
import Nav from './navbar/nav'
import ListeClients from './RTK/ListeClients'
import { AddClient } from './RTK/addClient'
import { UpdateComp } from './RTK/updateClient'
import Products from './API/Products'
import UsersTable from './API/DataThunk'
// import UsersTable from './REDUX/UsersTable'
// import Adduser from './REDUX/Adduser'
// import { Updateuser } from './REDUX/update'

const App = () => {
  return (
    <div>
      <BrowserRouter >
      <Routes>
        <Route path='/' element={<Nav/>}>
        <Route index element={<Products/>} />
        <Route path='/users' element={<UsersTable/>} />
          {/* <Route path='/users' element={<UsersTable/>} />
          <Route path='/add' element={<Adduser/>} />
          <Route path='/update/:id' element={<Updateuser/>} /> */}
          <Route path='/clients' element={<ListeClients/>} />
          <Route path='/addclient' element={<AddClient/>} />
          <Route path='/updateclient/:id' element={<UpdateComp/>} />

        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

