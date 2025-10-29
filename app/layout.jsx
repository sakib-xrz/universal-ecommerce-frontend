import "./globals.css";
import dynamic from "next/dynamic";
import { getSettings } from "@/api/settings";
import GlobalProvider from "@/components/shared/global-provider";
import { GoogleTagManager } from "@next/third-parties/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { FB_PIXEL_ID } from "@/lib/fpixel";
import { FacebookPixel } from "@/components/globals/analytics";
const TikTokPixel = dynamic(
  () => import("@/components/globals/analytics/tiktok-pixel"),
  { ssr: false },
);

export async function generateMetadata() {
  const settingData = await getSettings();

  const settings = settingData?.data;

  return {
    title: settings.title || "",
    description: settings.description || "",
    keywords: settings.keywords || "",
    icons: {
      icon: settings.favicon || "/favicon.ico",
    },
    openGraph: {
      title: settings.title || "",
      description: settings.description || "",
      images: [settings.favicon || "/favicon.ico"],
    },
  };
}

export default async function RootLayout({ children }) {
  const settingData = await getSettings();
  const settings = settingData?.data;

  const googleTagManagerId = settings?.google_tag_manager_id;
  const googleAnalyticsId = settings?.google_analytics_id;

  const tiktokPixelId = "D3GK1TBC77U65TC5RQ0G";

  return (
    <html lang="en">
      <body>
        {googleTagManagerId && <GoogleTagManager gtmId={googleTagManagerId} />}
        {googleAnalyticsId && <GoogleAnalytics gaId={googleAnalyticsId} />}
        {FB_PIXEL_ID && <FacebookPixel />}
        {tiktokPixelId && <TikTokPixel pixelId={tiktokPixelId} />}
        <GlobalProvider settings={settings}>{children}</GlobalProvider>
      </body>
    </html>
  );
}
