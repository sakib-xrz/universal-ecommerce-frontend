import Container from "@/components/shared/container";
import ProductImages from "./product-images";
import ProductInfo from "./product-info";
import ProductDescription from "./product-description";
import YoutubeVideo from "../../../../../components/shared/youtube-video";

export default function ProductDetails({ product }) {
  return (
    <Container>
      <div className="mb-10 lg:mb-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ProductImages images={product.images} name={product.name} />
          <ProductInfo product={product} />
        </div>
        <ProductDescription
          fullDescription={product.full_description}
          deliveryPolicy={product.delivery_policy}
        />
        {product.youtube_video_link && (
          <div className="mx-auto mt-5 max-w-5xl rounded-lg bg-white p-3 shadow-md lg:mt-10">
            <YoutubeVideo youtube_video_link={product.youtube_video_link} />
          </div>
        )}
      </div>
    </Container>
  );
}
