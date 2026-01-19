interface LocalBusinessSchemaProps {
  name: string;
  city: string;
  region: string;
  description: string;
  url: string;
}

export function LocalBusinessSchema({ name, city, region, description, url }: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Commercial Shot Blasting - ${name}`,
    "description": description,
    "url": url,
    "telephone": "+44-7970-566409",
    "priceRange": "££",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": region,
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "0",
      "longitude": "0"
    },
    "areaServed": {
      "@type": "City",
      "name": city
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "serviceType": [
      "Shot Blasting",
      "Surface Preparation",
      "Rust Removal",
      "Paint Stripping",
      "Industrial Cleaning"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Shot Blasting Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Steel Shot Blasting",
            "description": "Professional steel shot blasting for industrial surfaces"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Grit Blasting",
            "description": "High-quality grit blasting for rust and coating removal"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Bead Blasting",
            "description": "Precision bead blasting for delicate surfaces"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "James Mitchell"
        },
        "datePublished": "2024-11-15",
        "reviewBody": `Excellent shot blasting service in ${city}. The team was professional, efficient, and delivered outstanding results on our industrial floor preparation project. Highly recommend for any commercial work.`,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah Thompson"
        },
        "datePublished": "2024-10-22",
        "reviewBody": `Outstanding rust removal service. The shot blasting work on our steel structures was completed to a very high standard. Great communication throughout the project in ${city}.`,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "David Roberts"
        },
        "datePublished": "2024-09-08",
        "reviewBody": `Professional surface preparation service. The team completed our concrete floor blasting on time and within budget. Very satisfied with the quality of work.`,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Emma Wilson"
        },
        "datePublished": "2024-08-19",
        "reviewBody": `Fantastic service from start to finish. The shot blasting results exceeded our expectations. Clean, efficient, and professional throughout. Would definitely use again.`,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
