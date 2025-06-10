import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const API_KEY = "10d83876919fd2325e0c543bd5cd7748";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const FeaturedMovies = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMovies(data.results);
      });
  }, []);
  return (
    <section className="  w-[95%] mx-auto">
      <h1 className=" text-3xl font-extrabold my-10">Popular Movies</h1>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={4}
        spaceBetween={30}
        autoplay={{ delay: 2000 }}
        loop={true}
        className=""
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="p-2 bg-gray-800 rounded-2xl shadow-lg hover:scale-110 hover:ring-2 hover:ring-orange-500 transition-transform duration-300">
              <img
                src={`${IMG_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="h-96 w-full object-fit rounded-xl "
              />
              <p className="text-white text-lg font-semibold">
                Movie: {movie.title}
              </p>
              <p className="text-gray-400 text-sm">
                Release: {movie.release_date}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedMovies;
