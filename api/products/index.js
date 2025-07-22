import { BASE_URL } from "@/utils/constant";

const baseUrl = BASE_URL;

export async function getProductBySlug(slug) {
  const url = `${baseUrl}/products/${slug}`;

  const res = await fetch(url, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${slug} product`);
  }
  return res.json();
}
