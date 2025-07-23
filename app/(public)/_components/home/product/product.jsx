"use client";

import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import Link from "next/link";

import Container from "@/components/shared/container";
import ProductCard from "@/components/shared/product-card";
import SectionHeading from "@/components/shared/section-heading";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import YoutubeVideo from "@/components/shared/youtube-video";

export default function Product({
  banner,
  title,
  slug,
  products,
  youtube_video_link,
}) {
  console.log(slug);

  return (
    <Container className={"space-y-3 pb-0 lg:pb-0"}>
      {banner && (
        <Link href={`/category/${slug}`} aria-label={title}>
          <Image
            src={banner}
            alt=""
            quality={100}
            height={840}
            width={2500}
            placeholder="empty"
            className="rounded-md"
          />
        </Link>
      )}

      <SectionHeading
        title={title}
        linkText="See All"
        link={`/category/${slug}`}
      />

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
          {products?.map((product, index) => (
            <SwiperSlide key={index}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {youtube_video_link && (
        <div className="mx-auto mt-5 max-w-5xl rounded-lg bg-white p-3 shadow-md lg:mt-10">
          <YoutubeVideo youtube_video_link={youtube_video_link} />
        </div>
      )}
    </Container>
  );
}
