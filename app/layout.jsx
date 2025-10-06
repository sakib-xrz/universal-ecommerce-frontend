import "./globals.css";
import dynamic from "next/dynamic";
import { getSettings } from "@/api/settings";
import GlobalProvider from "@/components/shared/global-provider";
import { GoogleTagManager } from "@next/third-parties/google";
import { GoogleAnalytics } from "@next/third-parties/google";
const FacebookPixel = dynamic(
  () => import("@/components/globals/analytics/facebook-pixel"),
  { ssr: false },
);
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
  const facebookPixelId = settings?.facebook_pixel_id;
  const tiktokPixelId = "D3GK1TBC77U65TC5RQ0G";

  return (
    <html lang="en">
      <body>
        {googleTagManagerId && <GoogleTagManager gtmId={googleTagManagerId} />}
        {googleAnalyticsId && <GoogleAnalytics gaId={googleAnalyticsId} />}
        {facebookPixelId && <FacebookPixel pixelId={facebookPixelId} />}
        {tiktokPixelId && <TikTokPixel pixelId={tiktokPixelId} />}
        <GlobalProvider settings={settings}>{children}</GlobalProvider>
      </body>
    </html>
  );
}
