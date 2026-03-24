import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://ak-rahul.vercel.app/sitemap.xml",
    host: "https://ak-rahul.vercel.app",
  };
}
