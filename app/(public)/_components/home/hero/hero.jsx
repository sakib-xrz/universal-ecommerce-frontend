"use client";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Hero({ banners }) {
  return (
    <Swiper
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000,
        pauseOnMouseEnter: true,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
    >
      {banners?.map((banner, index) => (
        <SwiperSlide key={index}>
          <Image
            src={banner?.image_url}
            alt=""
            quality={100}
            height={840}
            width={2500}
            priority={true}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
