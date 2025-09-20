import React from 'react'
import Banner from './section1/banner'
import MoviesGrid from './section2/MoviesGrid'
import TrendingMovies from './section2/TrendingMovies'
import Collection from './section2/Collection'
import MoviesCollection from './section2/MovieCollections'
import MoviesGenre from './section2/MovieGenre'
import Glowline from '../GLOWLINE/Glowline'
import Cards from '../ElectricBorder/Cards'
import SlideCarrousel from '../slidescroll/slidecarrousel';
import moviesData from '../api/movies';
const Page1 = () => {
  return (
    <div>
      <SlideCarrousel slides={moviesData} />
     
       <MoviesGrid />
      <Glowline />

      <TrendingMovies title="TOP TRENDING" trendKey="trend" />
      <TrendingMovies title="NEW RELEASES" trendKey="latest" />
      <Collection title="Popular Movie Collections" items={MoviesCollection} />
     
      <Cards />
    </div>
  )
}

export default Page1
