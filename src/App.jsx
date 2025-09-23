
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Footer from './footer/Footer';
import Navbar from './navbar/navbar';
import Page1 from './PAGE 1/Page1';
import Page2 from './PAGE 2/PAge2';
import CollectionPage from './PAGE 3/CollectionPage';
import AuthPage from './AUTHENTIFICATION/LoginPage';
import SignUpPage from './AUTHENTIFICATION/signUp';
import ErrPAge from './ErrPage/ErrPAge';
import MoviesTypesPAge from './MOVIES&SERIES/MoviesTypesPAge';
import SeriesTypesPage from './MOVIES&SERIES/SeriesTypesPage';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Navbar />}>
          
          <Route index element={<Page1 />} />
          <Route path='page2/:id' element={<Page2 />} />
          <Route path='page3/:id' element={<CollectionPage />} />
          <Route path='/movies' element={<MoviesTypesPAge />} />
          <Route path='/series' element={<SeriesTypesPage />} />
          <Route path="/signin" element={<AuthPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
        
        
        <Route path="*" element={<ErrPAge />} />
      </Routes>
    </BrowserRouter>


     
     
    </div>
  );
}

export default App;
