import { getProductBySlug } from "@/api/products";
import ProductDetails from "./_components/product-details";

export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params.slug);

  return {
    title: product?.data?.name,
    description:
      product?.data?.short_description ||
      "A clothing based e-commerce website. Buy your favorite clothes at affordable prices. We have a wide range of clothing products. Shop now!",
    keywords: "clothing, e-commerce, shop, buy, clothes",
    openGraph: {
      images:
        product?.data?.images && product?.data?.images.length > 0
          ? product?.data?.images.find((image) => image.type === "PRIMARY")
              ?.image_url
          : "/default-product.jpg",
    },
  };
}

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug);

  return <ProductDetails product={product?.data} />;
}
