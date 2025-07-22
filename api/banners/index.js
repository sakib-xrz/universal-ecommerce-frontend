import { BASE_URL } from "@/utils/constant";

export async function getBanners() {
  const res = await fetch(`${BASE_URL}/banners`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch banners");
  }
  return res.json();
}
