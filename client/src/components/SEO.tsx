import { useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

interface SEOProps {
  title?: string;
  description?: string;
  h1?: string;
  image?: string;
  type?: "website" | "article";
}

export function SEO({ title, description, h1, image, type = "website" }: SEOProps) {
  const [location] = useLocation();
  const { data: seoData } = trpc.seo.getByUrl.useQuery({ pageUrl: location });

  // Use database values if available, otherwise fall back to props
  const finalTitle = seoData?.metaTitle || title || "Commercial Shot Blasting - Professional Surface Preparation";
  const finalDescription = seoData?.metaDescription || description || "Specialist precision shot blasting company in the UK, removing rust, scale, and coatings from all types of surfaces.";
  const finalH1 = seoData?.h1 || h1;
  const finalImage = image || "/images/shot-blasting-hero.jpg";
  const siteUrl = window.location.origin;
  const fullUrl = `${siteUrl}${location}`;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute("content", content);
    };

    // Standard meta tags
    updateMetaTag("description", finalDescription);

    // Open Graph tags
    updateMetaTag("og:title", finalTitle, true);
    updateMetaTag("og:description", finalDescription, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:url", fullUrl, true);
    updateMetaTag("og:image", `${siteUrl}${finalImage}`, true);
    updateMetaTag("og:site_name", "Commercial Shot Blasting", true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", finalTitle);
    updateMetaTag("twitter:description", finalDescription);
    updateMetaTag("twitter:image", `${siteUrl}${finalImage}`);

    // Update H1 if provided and element exists
    if (finalH1) {
      const h1Element = document.querySelector("h1");
      if (h1Element && !h1Element.hasAttribute("data-seo-managed")) {
        h1Element.textContent = finalH1;
        h1Element.setAttribute("data-seo-managed", "true");
      }
    }
  }, [finalTitle, finalDescription, finalH1, finalImage, type, fullUrl, siteUrl]);

  return null;
}
