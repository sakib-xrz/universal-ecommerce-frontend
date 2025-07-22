"use client";

import Container from "@/components/shared/container";
import ProductCard from "@/components/shared/product-card";
import ProductCardSkeleton from "@/components/shared/product-card-skeleton";
import Label from "@/components/ui/label";
import { useGetProductByCategoryQuery } from "@/redux/features/product/productApi";
import { formatText, generateQueryString, sanitizeParams } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Category(params) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { slug } = params.params;
  const categorySlug = slug[slug.length - 1];

  const [queryParams, setQueryParams] = useState({
    sort_by: searchParams.get("sort_by") || "created_at",
    sort_order: searchParams.get("sort_order") || "desc",
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 40,
  });

  const updateURL = () => {
    const queryString = generateQueryString(queryParams);
    router.push(
      `/category/${decodeURIComponent(slug.join("/"))}${queryString}`,
      undefined,
      {
        shallow: true,
      },
    );
  };

  const debouncedUpdateURL = useDebouncedCallback(updateURL, 500);

  useEffect(() => {
    debouncedUpdateURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  const { data, isLoading } = useGetProductByCategoryQuery(
    {
      slug: categorySlug,
      query: sanitizeParams(queryParams),
    },
    {
      skip: !categorySlug,
    },
  );

  const products = data?.data || [];
  const meta = data?.meta || {};

  const totalPages = Math.ceil(meta.total / meta.limit);

  const handlePageChange = (page) => {
    setQueryParams((prev) => {
      return { ...prev, page };
    });
  };

  return (
    <Container>
      <div className="mb-6 flex max-xs:flex-col xs:items-center xs:justify-between">
        <h1 className="text-3xl font-semibold uppercase">{formatText(slug)}</h1>
        <div className="flex flex-col gap-1 max-xs:mt-2">
          <Label>Sort By:</Label>
          <Select
            value={
              queryParams.sort_by === "created_at"
                ? "created_at"
                : queryParams.sort_order === "asc"
                  ? "sell_price"
                  : "-sell_price"
            }
            onValueChange={(value) => {
              if (value === "created_at") {
                setQueryParams({
                  ...queryParams,
                  sort_by: "created_at",
                  sort_order: "desc",
                });
              } else if (value === "sell_price") {
                setQueryParams({
                  ...queryParams,
                  sort_by: "sell_price",
                  sort_order: "asc",
                });
              } else if (value === "-sell_price") {
                setQueryParams({
                  ...queryParams,
                  sort_by: "sell_price",
                  sort_order: "desc",
                });
              }
            }}
          >
            <SelectTrigger className="xs:w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={"created_at"}>Newest Arrivals</SelectItem>
                <SelectItem value={"sell_price"}>Price Low to High</SelectItem>
                <SelectItem value={"-sell_price"}>Price High to Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-2.5 xs:gap-5 md:grid-cols-3 xl:grid-cols-4">
            {[...Array(12)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-2.5 xs:gap-5 md:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  {/* Previous Button */}
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (queryParams.page > 1) {
                          setQueryParams((prev) => ({
                            ...prev,
                            page: prev.page - 1,
                          }));
                        }
                      }}
                      className={
                        queryParams.page === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {/* Page Numbers */}
                  {Array.from({ length: 5 }, (_, index) => {
                    const pageNumber = queryParams.page - 2 + index;
                    if (pageNumber > 0 && pageNumber <= totalPages) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(pageNumber);
                            }}
                            className={
                              queryParams.page === pageNumber
                                ? "bg-primary text-white"
                                : ""
                            }
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}

                  {/* Next Button */}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (queryParams.page < totalPages) {
                          setQueryParams((prev) => ({
                            ...prev,
                            page: prev.page + 1,
                          }));
                        }
                      }}
                      className={
                        queryParams.page === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        ) : (
          <div className="mb-6 h-[calc(100svh-570px)] w-full text-center">
            <h1 className="text-3xl font-medium text-primary">
              No Products Found
            </h1>
            <p className="text-lg text-muted-foreground">
              There are no products in this category.
            </p>
          </div>
        )}
      </div>
    </Container>
  );
}
