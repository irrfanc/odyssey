'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

const SwiperCarousel = ({ images, city }) => {
  return (
    <div className="w-screen max-w-6xl mx-auto px-4"> 
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20} 
        slidesPerView={3}
        loop={true}
        breakpoints={{
          400: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2, 
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        {images?.map((image, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center w-screen">
            <div className="w-full max-w-[300px] h-auto aspect-[3/4] overflow-hidden rounded-lg shadow-md">
              <Image
                src={image.urls?.raw || '/placeholder-image.png'}
                alt={`${city} image ${index + 1}`}
                layout="fill"
                className="object-cover"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperCarousel;
