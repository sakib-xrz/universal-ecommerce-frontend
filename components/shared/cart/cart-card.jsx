import { Button } from "@/components/ui/button";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/redux/features/cart/cartSlice";
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";

export default function CartCard({ item, setLocalCart }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    setLocalCart((prev) => prev.filter((i) => i.id !== item.id));
    dispatch(removeFromCart({ id: item.id }));
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      setLocalCart((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i,
        ),
      );
      dispatch(decrementQuantity({ id: item.id }));
    }
  };

  const handleIncrement = () => {
    if (item.quantity < item.variant?.stock) {
      setLocalCart((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      );
      dispatch(incrementQuantity({ id: item.id }));
    }
  };

  return (
    <div className="flex w-full gap-2 border-b border-gray-200 py-2 last:border-b-0">
      <div className="relative">
        <Image
          src={item.image_url || "/default-product.jpg"}
          alt={item.name || "Product"}
          width={96}
          height={96}
          className="aspect-square size-24 object-cover"
        />
        {item.has_stock === false && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <span className="rounded-full bg-red-500 px-2 pb-1 pt-0.5 text-xs font-semibold leading-none text-white">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex w-full items-center justify-between gap-3">
          <h3 className="line-clamp-1 text-sm font-semibold">
            {item.name || "Unnamed Product"}
          </h3>

          <div>
            <Trash2
              onClick={handleRemove}
              size={16}
              className="cursor-pointer text-destructive"
            />
          </div>
        </div>

        <div className="flex w-full items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            TK. {item.unit_price || 0}
          </p>
        </div>

        <div className="flex w-full items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Size:{" "}
            <span className="font-medium">
              {item.variant?.size?.name || "N/A"}
            </span>
          </p>

          <p className="text-sm text-muted-foreground">
            Stock available:{" "}
            <span className="font-medium">{item.variant?.stock || 0}</span>
          </p>
        </div>

        <div className="mt-1.5 flex items-center justify-between gap-4">
          <div className="flex items-center border">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDecrement}
              className="size-7 rounded-none border-r"
              disabled={item.quantity <= 1}
            >
              <MinusIcon className="size-4" />
            </Button>
            <span className="w-8 text-center leading-none">
              {item.quantity || 0}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleIncrement}
              className="size-7 rounded-none border-l"
              disabled={
                item.has_stock === false ||
                item.quantity >= (item.variant?.stock || 0)
              }
            >
              <PlusIcon className="size-4" />
            </Button>
          </div>

          <div className="text-sm">
            Total:{" "}
            <span className="font-medium">TK. {item.total_price || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
