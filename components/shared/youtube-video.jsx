"use client";

export default function YoutubeVideo({ youtube_video_link }) {
  console.log(youtube_video_link);
  // Convert standard YouTube URLs to embed format
  const getEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      let videoId;

      // Handle youtu.be short URLs
      if (urlObj.hostname === "youtu.be") {
        videoId = urlObj.pathname.slice(1); // Remove leading slash and get video ID
      }
      // Handle standard youtube.com URLs
      else if (
        urlObj.hostname === "www.youtube.com" ||
        urlObj.hostname === "youtube.com"
      ) {
        videoId = urlObj.searchParams.get("v"); // Extract video ID from query parameter
      }

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
