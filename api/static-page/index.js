import { BASE_URL } from "@/utils/constant";

export async function getStaticPage(kind) {
  const res = await fetch(`${BASE_URL}/static-pages/kind/${kind}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch static page");
  }
  return res.json();
}
