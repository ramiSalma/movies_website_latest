import React from 'react'

import MoviesGrid from './section2/MoviesGrid'
import TrendingMovies from './section2/TrendingMovies'
import Collection from './section2/Collection'
import MoviesCollection from '../api/MovieCollections'
import Glowline from '../GLOWLINE/Glowline'
import Cards from '../ElectricBorder/Cards'
import SlideCarrousel from './section1/slidecarrousel';
import moviesData from '../api/movies';
import MovieGenres from '../api/MovieGenre'


const Page1 = () => {
  return (
    <div>
      <SlideCarrousel slides={moviesData} />

      <MoviesGrid />
      <Glowline />

      <TrendingMovies title="TOP TRENDING" trendKey="trend" />
      <TrendingMovies title="NEW RELEASES" trendKey="latest" />
      <Collection title="Popular Movie Collections" items={MoviesCollection} />
      <Collection title="movies genre" items={MovieGenres} />

      <Cards />
    </div>
  )
}

export default Page1
