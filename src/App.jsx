
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Footer from './footer/Footer';
import Navbar from './navbar/navbar';
import Page1 from './PAGE 1/Page1';
import Page2 from './PAGE 2/PAge2';
function App() {
  return (
    <div className="App">
      {/* <SplashCursor /> */}
      <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Navbar />}>
          
          <Route index element={<Page1 />} />
          <Route path='page2/:id' element={<Page2 />} />
          
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
