import { useEffect } from "react";

interface Review {
  author: string;
  rating: number;
  text: string;
  datePublished?: string;
}

interface ReviewSchemaProps {
  reviews: Review[];
  businessName?: string;
  businessUrl?: string;
}

export function ReviewSchema({ reviews, businessName = "Commercial Shot Blasting", businessUrl = "https://commercialshotblasting.co.uk" }: ReviewSchemaProps) {
  useEffect(() => {
    // Calculate aggregate rating
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    const reviewCount = reviews.length;

    // Create aggregate rating schema
    const aggregateSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": businessName,
      "url": businessUrl,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": averageRating.toFixed(1),
        "reviewCount": reviewCount,
        "bestRating": "5",
        "worstRating": "1"
      }
    };

    // Create individual review schemas
    const reviewSchemas = reviews.map((review) => ({
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": businessName,
        "url": businessUrl
      },
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.text,
      ...(review.datePublished && { "datePublished": review.datePublished })
    }));

    // Insert aggregate schema
    const aggregateScript = document.createElement("script");
    aggregateScript.type = "application/ld+json";
    aggregateScript.id = "aggregate-rating-schema";
    aggregateScript.text = JSON.stringify(aggregateSchema);
    document.head.appendChild(aggregateScript);

    // Insert individual review schemas
    const reviewScripts = reviewSchemas.map((schema, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = `review-schema-${index}`;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      return script;
    });

    // Cleanup function
    return () => {
      document.getElementById("aggregate-rating-schema")?.remove();
      reviewScripts.forEach((_, index) => {
        document.getElementById(`review-schema-${index}`)?.remove();
      });
    };
  }, [reviews, businessName, businessUrl]);

  return null; // This component doesn't render anything visible
}
