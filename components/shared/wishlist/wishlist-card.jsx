import { removeFromWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

export default function WishlistCard({ item, setOpen }) {
  const dispatch = useDispatch();

  const primaryImage =
    item?.images?.find((image) => image.type === "PRIMARY")?.image_url ||
    "/default-product.jpg";
  return (
    <div className="flex w-full gap-2 border-b border-gray-200 py-2 last:border-b-0">
      <Image
        src={primaryImage}
        alt={item.name}
        width={64}
        height={64}
        className="aspect-square"
      />
      <div className="flex-1">
        <div className="flex w-full items-center justify-between gap-3">
          <h3 className="line-clamp-1 text-sm font-semibold">{item.name}</h3>

          <div>
            <Trash2
              onClick={() => dispatch(removeFromWishlist({ id: item.id }))}
              size={16}
              className="cursor-pointer text-destructive"
            />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          TK. {item.discounted_price ? item.discounted_price : item.price}{" "}
          {item.discounted_price > 0 && (
            <span className="text-xs text-gray-400 line-through sm:text-sm">
              TK. {item.price}
            </span>
          )}
        </p>
        <Link
          href={`/product/${item.slug}`}
          onClick={() => setOpen(false)}
          className="cursor-pointer text-sm font-medium text-primary underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
