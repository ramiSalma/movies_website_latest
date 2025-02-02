
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './NAV_BAR/nav';
import Products from './API/products';
import { Clients } from './REDUX_CLIENTS/table';
import { AddClient } from './REDUX_CLIENTS/Addclient';
import { ClientEdit } from './REDUX_CLIENTS/ClientEdit';
import { Users } from './REDUX_USERS/Table';
import Adduser from './REDUX_USERS/Adduser';
import { UpdateUser } from './REDUX_USERS/iUpdateUser';

import { DataApi } from './API_WITH_REDUX_THUNK/Data_Api';
import { Add_Data_Api } from './API_WITH_REDUX_THUNK/Add_Data_Api';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />} >

            {/* <Route index element={<DataApi/>} />
            <Route path='/create' element={<Add_Data_Api/>} />
            <Route path='/users' element={<Users/>} />
            <Route path='/users/adduser' element={<Adduser/>} />
            <Route path='/users/update/:id' element={<UpdateUser/>}/>

            <Route path='/clients' element={<Clients/>} />
            <Route path='/clients/addclient' element={<AddClient/>} />
            <Route path='/clients/edit/:id' element={<ClientEdit/>} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
