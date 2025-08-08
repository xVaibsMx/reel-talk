import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const API_KEY = '10d83876919fd2325e0c543bd5cd7748'
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500'

const FeaturedMovies = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch movies')
        }
        return res.json()
      })
      .then((data) => {
        setMovies(data.results)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading)
    return (
      <section
        aria-label="Popular Movies"
        className="w-[95%] mx-auto my-10 text-white text-center text-xl"
      >
        Loading popular movies...
      </section>
    )

  if (error)
    return (
      <section
        aria-label="Popular Movies"
        className="w-[95%] mx-auto my-10 text-red-500 text-center text-xl"
      >
        {error}
      </section>
    )

  return (
    <section aria-label="Popular Movies" className="w-[95%] mx-auto my-10">
      <h1 className="text-3xl font-extrabold mb-8 text-white">
        Popular Movies
      </h1>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={4}
        spaceBetween={24}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
          1280: { slidesPerView: 4, spaceBetween: 30 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="p-3 bg-gray-800 rounded-2xl shadow-lg hover:scale-105 hover:ring-2 hover:ring-orange-500 transition-transform duration-300">
              <img
                src={`${IMG_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
                className="h-96 w-full object-cover rounded-xl"
              />
              <p className="text-white text-lg font-semibold mt-3 truncate">
                {movie.title}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Release: {movie.release_date}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default FeaturedMovies
