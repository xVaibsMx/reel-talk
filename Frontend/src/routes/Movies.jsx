import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const API_KEY = '10d83876919fd2325e0c543bd5cd7748'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

const Movies = () => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [loadingTrending, setLoadingTrending] = useState(true)
  const [loadingPopular, setLoadingPopular] = useState(true)
  const [errorTrending, setErrorTrending] = useState(null)
  const [errorPopular, setErrorPopular] = useState(null)

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch trending movies')
        return res.json()
      })
      .then((data) => {
        setTrendingMovies(data.results)
        setLoadingTrending(false)
      })
      .catch((err) => {
        setErrorTrending(err.message)
        setLoadingTrending(false)
      })
  }, [])

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch popular movies')
        return res.json()
      })
      .then((data) => {
        setPopularMovies(data.results)
        setLoadingPopular(false)
      })
      .catch((err) => {
        setErrorPopular(err.message)
        setLoadingPopular(false)
      })
  }, [])

  const renderMoviesSwiper = (movies) => (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={2}
      breakpoints={{
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
      }}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      loop
      className="py-4"
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <div className="group cursor-pointer">
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="rounded-xl shadow-lg w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <p className="text-center mt-2 text-sm font-mono text-white truncate">
              {movie.title}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 space-y-16 text-white">
      {/* Trending Movies */}
      <section aria-label="Trending Movies">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-orange-500 inline-block pb-1">
          Trending Movies
        </h2>
        {loadingTrending ? (
          <p className="text-center text-gray-400">
            Loading trending movies...
          </p>
        ) : errorTrending ? (
          <p className="text-center text-red-500">{errorTrending}</p>
        ) : (
          renderMoviesSwiper(trendingMovies)
        )}
      </section>

      {/* Popular Movies */}
      <section aria-label="Popular Movies">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-orange-500 inline-block pb-1">
          Popular Movies
        </h2>
        {loadingPopular ? (
          <p className="text-center text-gray-400">Loading popular movies...</p>
        ) : errorPopular ? (
          <p className="text-center text-red-500">{errorPopular}</p>
        ) : (
          renderMoviesSwiper(popularMovies)
        )}
      </section>
    </main>
  )
}

export default Movies
