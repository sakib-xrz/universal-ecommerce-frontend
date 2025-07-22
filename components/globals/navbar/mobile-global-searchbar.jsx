import { SearchInput } from "@/components/ui/search";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { useGlobalSearchProductQuery } from "@/redux/features/product/productApi";
import { useDebounce } from "@/hooks/use-debounce";
import Link from "next/link";
import Image from "next/image";

function SearchItem({ product }) {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-gray-100">
        <div className="relative h-14 w-14 flex-shrink-0">
          <Image
            src={product.image || "/default-product.jpg"}
            alt={product.name}
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="line-clamp-1 text-sm font-medium text-gray-900">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">
              TK.{" "}
              {product.discounted_price
                ? product.discounted_price
                : product.price}
            </span>
            {product.discounted_price ? (
              <span className="text-xs text-gray-500 line-through">
                TK. {product.price}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}

function SearchItemSkeleton() {
  return (
    <div className="flex w-full animate-pulse cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-100">
      <div className="relative h-14 w-14 flex-shrink-0 rounded-md bg-gray-300" />
      <div className="flex w-full flex-col">
        <div className="mb-1 h-4 w-3/5 rounded bg-gray-300" />
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 rounded bg-gray-300" />
          <div className="h-3 w-10 rounded bg-gray-300 line-through" />
        </div>
      </div>
    </div>
  );
}

export default function MobileGlobalSearchbar({ showSearch, setShowSearch }) {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useGlobalSearchProductQuery(
    debouncedSearch ? { search: debouncedSearch } : {},
    { skip: !debouncedSearch },
  );

  return (
    <div>
      <div className="flex cursor-pointer items-center border-l p-3">
        {showSearch ? (
          <X size={24} onClick={() => setShowSearch(false)} />
        ) : (
          <Search size={24} onClick={() => setShowSearch(true)} />
        )}
      </div>
      {showSearch && (
        <div className="absolute left-1/2 top-12 w-full -translate-x-1/2 transform border-t bg-white px-4 py-2 shadow-md">
          <SearchInput
            placeholder="Search for products..."
            className={"w-full"}
            extraClassName="w-full"
            showIcon={false}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() =>
              setTimeout(() => {
                setIsFocused(false);
                setShowSearch(false);
              }, 200)
            }
          />
          {/* search result popover */}
          {debouncedSearch.length > 0 && isFocused && (
            <div className="mt-2 w-full bg-white">
              {isLoading ? (
                [...Array(5)].map((_, i) => <SearchItemSkeleton key={i} />)
              ) : data?.data?.length > 0 ? (
                data.data.map((product) => (
                  <SearchItem key={product.id} product={product} />
                ))
              ) : (
                <p className="p-2 text-center text-gray-500">
                  No products found
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
