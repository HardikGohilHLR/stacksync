// Sitemap
import type { MetadataRoute } from 'next';

const sitemap = (): MetadataRoute.Sitemap => {
  const URL = process.env.NEXT_PUBLIC_SITE_URL!;

  return [
    {
      url: URL,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${URL}/compare`,
      lastModified: new Date(),
      priority: 0.9,
    },
  ];
};

export default sitemap;
