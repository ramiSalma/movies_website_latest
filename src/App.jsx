
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Footer from './footer/Footer';
import Navbar from './navbar/navbar';
import Page1 from './PAGE 1/Page1';
import Page2 from './PAGE 2/PAge2';
import CollectionPage from './PAGE 3/CollectionPage';
import AuthPage from './AUTHENTIFICATION/LoginPage';
import SignUpPage from './AUTHENTIFICATION/signUp';

function App() {
  return (
    <div className="App">
      {/* <SplashCursor /> */}
      <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Navbar />}>
          
          <Route index element={<Page1 />} />
          <Route path='page2/:id' element={<Page2 />} />
          <Route path='/page3/:id' element={<CollectionPage />} />
          <Route path="/signin" element={<AuthPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
        
        
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>


     {/* <Navbar /> */}
     {/* <Banner />
     <MoviesGrid />
     <TrendingMovies title="TOP TRENDING" trendKey="trend" />
     <TrendingMovies title="LATEST RELEASE" trendKey="latest" />
     <Collection title="Popular Movie Collections" items={movieCollections} />
     <Collection title="Movie Genres" items={MovieGenres}  /> */}
     
     
    </div>
  );
}

export default App;
