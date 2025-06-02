import React, { useState } from "react";
import { latestReviews } from "../data/reviews";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const LatestReviews = () => {
  const [reviews, setReviews] = useState(latestReviews);
  return (
    <section className="  w-[95%] mx-auto">
      <h1 className=" text-3xl font-extrabold my-10">Latest Reviews</h1>
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
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className=" p-4  rounded-lg shadow-md bg-gray-700 border-2 border-orange-500 h-80">
              <h2 className="text-2xl font-semibold">{review.movieTitle}</h2>
              <p className="text-sm  mb-2 text-orange-300 font-mono">
                Reviewed by <strong>{review.reviewer}</strong> on {review.date}
              </p>
              <p className="mb-2 text-orange-300 font-mono">
                Rating: ⭐ {review.rating.toFixed(1)}
              </p>
              <p className=" text-amber-50 font-mono">{review.review}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default LatestReviews;
