export default function sitemap() {
  const now = new Date();

  return [
    {
      url: "https://purplehousebd.com",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://purplehousebd.com/products",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://purplehousebd.com/category/indoor-lighting",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://purplehousebd.com/category/outdoor-lighting",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://purplehousebd.com/category/led-lighting",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://purplehousebd.com/category/decorative-lighting",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://purplehousebd.com/category/smart-lighting",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://purplehousebd.com/about",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: "https://purplehousebd.com/privacy",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: "https://purplehousebd.com/shipping-information",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
