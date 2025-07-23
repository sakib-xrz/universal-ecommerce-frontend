import { BASE_URL } from "@/utils/constant";

export async function getFeaturedCategories() {
  const res = await fetch(`${BASE_URL}/featured-categories`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch featured categories");
  }
  return res.json();
}
