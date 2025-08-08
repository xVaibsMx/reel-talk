import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Movies = () => {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
  const [trendingMovies, setTrendingMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const API_KEY = '10d83876919fd2325e0c543bd5cd7748'

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setTrendingMovies(data.results))
  }, [])

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.results))
  }, [])

  return (
    <main className="px-6 py-4 space-y-12 text-white">
      {/* Trending Movies */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Trending Movies</h2>
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
        >
          {trendingMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
              <p className="text-center mt-2 text-sm font-mono">
                {movie.title}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Popular Movies */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Popular Movies</h2>
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
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop
        >
          {popularMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
              <p className="text-center mt-2 text-sm font-mono">
                {movie.title}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </main>
  )
}

export default Movies
