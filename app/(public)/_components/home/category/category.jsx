"use client";

import "swiper/css";
import "swiper/css/navigation";

import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import Image from "next/image";
import Link from "next/link";

export default function Category({ categories }) {
  return (
    <Container className={"pb-0 lg:pb-0"}>
      {categories.length > 0 && <SectionHeading title="Browse Categories" />}
      <div className="mt-5">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2000,
            pauseOnMouseEnter: true,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          breakpoints={{
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
          }}
        >
          {categories?.map((category, index) => (
            <SwiperSlide
              key={index}
              className="h-[725px] w-[1200px] select-none rounded-md"
            >
              <Link
                href={`/category/${category?.slug}`}
                className="group relative block"
                aria-label={category?.name}
              >
                <Image
                  src={category?.image}
                  alt=""
                  quality={100}
                  height={725}
                  width={1200}
                  placeholder="empty"
                  className="rounded-md"
                />

                <div className="absolute inset-0 hidden items-center justify-center rounded-md bg-black bg-opacity-0 group-hover:flex group-hover:bg-opacity-40 group-hover:transition group-hover:duration-200 group-hover:ease-in-out">
                  <h3 className="scale-95 transform text-sm font-medium text-white transition duration-200 ease-in-out group-hover:scale-100 lg:text-xl">
                    {category?.name}
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
}
