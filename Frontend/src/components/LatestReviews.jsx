import React, { useState } from 'react'
import { latestReviews } from '../data/reviews'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const LatestReviews = () => {
  const [reviews] = useState(latestReviews)

  return (
    <section
      aria-label="Latest movie reviews"
      className="w-[95%] mx-auto my-10"
    >
      <h1 className="text-3xl font-extrabold mb-8 text-white">
        Latest Reviews
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
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <article
              tabIndex={0}
              className="p-5 rounded-lg shadow-md bg-gray-700 border-2 border-orange-500 h-80 flex flex-col justify-between hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <h2 className="text-2xl font-semibold text-white mb-2 truncate">
                {review.movieTitle}
              </h2>
              <p className="text-sm mb-2 text-orange-300 font-mono">
                Reviewed by <strong>{review.reviewer}</strong> on {review.date}
              </p>
              <p className="mb-3 text-orange-300 font-mono">
                Rating: ⭐ {review.rating.toFixed(1)}
              </p>
              <p className="text-amber-50 font-mono overflow-hidden text-ellipsis">
                {review.review}
              </p>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default LatestReviews
