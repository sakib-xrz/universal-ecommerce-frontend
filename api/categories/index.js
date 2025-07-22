import { BASE_URL } from "@/utils/constant";

export async function getParentCategories() {
  const res = await fetch(`${BASE_URL}/categories/list/parent`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch parent categories");
  }
  return res.json();
}
