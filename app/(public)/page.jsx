import { getBanners } from "@/api/banners";
import { getParentCategories } from "@/api/categories";

import Hero from "./_components/home/hero/hero";
import Category from "./_components/home/category/category";
import { getFeaturedCategories } from "@/api/feature-categories";
import LazyLoadedProducts from "./_components/home/lazy-loaded-products/lazy-loaded-products";
// import YoutubeVideo from "@/components/shared/youtube-video";

export default async function Home() {
  const categories = await getParentCategories();
  const banners = await getBanners();
  const featuredCategories = await getFeaturedCategories();

  return (
    <div>
      <Hero banners={banners?.data} />
      <Category categories={categories?.data} />
      <LazyLoadedProducts categories={featuredCategories?.data} />
      <div className="mt-10 lg:mt-20"></div>
    </div>
  );
}
