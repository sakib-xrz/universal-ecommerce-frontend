import { BASE_URL } from "@/utils/constant";

export async function getSettings() {
  const res = await fetch(`${BASE_URL}/settings`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch settings");
  }
  return res.json();
}
