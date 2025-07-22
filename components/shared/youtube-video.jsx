"use client";

export default function YoutubeVideo({ youtube_video_link }) {
  // Convert standard YouTube URLs to embed format
  const getEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get("v"); // Extract video ID
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url; // Convert to embed URL
    } catch (error) {
      console.error("Invalid YouTube URL", error);
      return "";
    }
  };

  const embedUrl = getEmbedUrl(youtube_video_link);

  return (
    embedUrl && (
      <iframe
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full"
      ></iframe>
    )
  );
}
