export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CloudAI Enterprise",
    url: "https://cloudaienterprise.com",
    logo: "https://cloudaienterprise.com/og-image.png",
    description:
      "AI adoption and training consultancy helping CEOs and business owners adopt AI strategically.",
    email: "hello@cloudaienterprise.com",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "AI Consulting",
    provider: {
      "@type": "Organization",
      name: "CloudAI Enterprise",
      url: "https://cloudaienterprise.com",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Consulting Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Readiness Assessment",
            description:
              "Comprehensive audit of operations, tech stack, and team capabilities with a 90-day AI implementation roadmap.",
          },
          price: "4500",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Strategy & Implementation",
            description:
              "End-to-end AI adoption including tool selection, workflow integration, and team training.",
          },
          price: "12000",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Transformation Program",
            description:
              "6-month engagement transforming entire organizations into AI-powered operations.",
          },
          price: "35000",
          priceCurrency: "USD",
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
