interface FAQSchemaProps {
  serviceName: string;
  serviceUrl: string;
}

export function FAQSchema({ serviceName, serviceUrl }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is ${serviceName.toLowerCase()}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${serviceName} is a professional surface preparation technique that uses high-velocity abrasive media to clean, strip, and profile surfaces. It's ideal for removing rust, paint, mill scale, and contaminants from metal, concrete, and other industrial surfaces to prepare them for coating or further treatment.`
        }
      },
      {
        "@type": "Question",
        "name": `How much does ${serviceName.toLowerCase()} cost?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The cost of ${serviceName.toLowerCase()} varies depending on the project size, surface type, accessibility, and required finish. Typical commercial projects range from £500 to £5,000+. We provide free, no-obligation quotes with detailed breakdowns. Contact us at 07970 566409 for an accurate estimate for your specific project.`
        }
      },
      {
        "@type": "Question",
        "name": `What surfaces can be treated with ${serviceName.toLowerCase()}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${serviceName} can be applied to a wide range of surfaces including steel structures, concrete floors, automotive parts, machinery, bridges, industrial equipment, and architectural features. We work with metals (steel, iron, aluminum), concrete, stone, and composite materials across industrial, commercial, and heritage sectors.`
        }
      },
      {
        "@type": "Question",
        "name": `How long does ${serviceName.toLowerCase()} take?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Project duration depends on the surface area, material type, and required finish. Small projects (under 50m²) typically take 1-2 days, medium projects (50-200m²) take 3-5 days, and large industrial projects may take 1-2 weeks. We provide realistic timelines during the quotation process and work efficiently to minimize disruption to your operations.`
        }
      },
      {
        "@type": "Question",
        "name": `Is ${serviceName.toLowerCase()} safe for the environment?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, modern ${serviceName.toLowerCase()} is environmentally responsible. We use recyclable abrasive media, contain dust and debris with professional extraction systems, and dispose of waste materials according to environmental regulations. Our processes minimize environmental impact while delivering excellent surface preparation results.`
        }
      },
      {
        "@type": "Question",
        "name": `Do you provide ${serviceName.toLowerCase()} services nationwide?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, we provide ${serviceName.toLowerCase()} services across the UK, with particular coverage in the Midlands, East of England, and surrounding regions. We serve major cities including Birmingham, Manchester, Leeds, Leicester, Nottingham, and Cambridge. For projects outside our primary service area, please contact us to discuss availability.`
        }
      },
      {
        "@type": "Question",
        "name": `What preparation is needed before ${serviceName.toLowerCase()}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Minimal preparation is required from clients. We recommend clearing the work area of loose items, ensuring site access for equipment, and providing power supply if needed. Our team conducts a pre-project site assessment to identify any specific requirements. We handle all setup, containment, and post-project cleanup as part of our comprehensive service.`
        }
      },
      {
        "@type": "Question",
        "name": `Can ${serviceName.toLowerCase()} remove heavy rust and old coatings?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Absolutely. ${serviceName} is highly effective at removing heavy rust, mill scale, old paint, epoxy coatings, and stubborn contaminants. The high-velocity abrasive media penetrates deep into surface irregularities, achieving thorough cleaning down to bare substrate. This creates an ideal anchor pattern for new protective coatings to ensure maximum adhesion and longevity.`
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
