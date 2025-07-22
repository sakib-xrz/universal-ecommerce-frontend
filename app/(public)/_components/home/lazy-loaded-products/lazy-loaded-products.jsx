"use client";

import { useMemo } from "react";
import Product from "../product/product";
import { Loader2 } from "lucide-react";
import { useGetProductByCategoryQuery } from "@/redux/features/product/productApi";

export default function LazyLoadedProducts({ categories }) {
  const categoryQueries = categories.map(({ slug }) => ({
    slug,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    query: useGetProductByCategoryQuery({ slug }),
  }));

  const isLoading = categoryQueries.some(({ query }) => query.isLoading);

  const allHomeProducts = useMemo(() => {
    if (isLoading) return [];

    return categories.map((category, index) => ({
      title: category.title,
      slug: category.slug,
      banner: category.banner,
      products: categoryQueries[index].query.data?.data || [],
    }));
  }, [categories, categoryQueries, isLoading]);

  if (isLoading) {
    return (
      <div className="my-10 flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      {allHomeProducts
        ?.filter((product) => product?.products?.length > 0)
        ?.map((product, index) => (
          <Product
            key={index}
            banner={product?.banner}
            title={product.title}
            slug={product.slug}
            products={product.products}
          />
        ))}
    </>
  );
}
