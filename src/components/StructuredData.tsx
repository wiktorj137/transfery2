/**
 * Structured Data (Schema.org JSON-LD)
 * Improves SEO by providing search engines with structured information
 * about the business, services, and content
 */

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://krakowtransfer.com/#business',
    name: 'Krakow Transfer',
    image: 'https://krakowtransfer.com/images/logo.jpg',
    description:
      'Professional airport transfer service in Krakow. We provide reliable transportation from Krakow Airport to city center, hotels, and popular tourist destinations.',
    url: 'https://krakowtransfer.com',
    telephone: '+48123456789',
    email: 'info@krakowtransfer.com',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Krakow',
      addressRegion: 'Małopolska',
      postalCode: '30-000',
      streetAddress: 'ul. Przykładowa 1',
      addressCountry: 'PL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.0647,
      longitude: 19.945,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Krakow',
      },
      {
        '@type': 'City',
        name: 'Warsaw',
      },
      {
        '@type': 'City',
        name: 'Katowice',
      },
      {
        '@type': 'City',
        name: 'Wroclaw',
      },
      {
        '@type': 'City',
        name: 'Zakopane',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Transfer Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Airport Transfer',
            description: 'Professional airport transfer service from/to Krakow Airport',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'City Transfer',
            description: 'Transfer between cities in Poland',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tour Transfer',
            description: 'Transport to tourist attractions like Auschwitz, Wieliczka, Zakopane',
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '247',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://krakowtransfer.com/#website',
    url: 'https://krakowtransfer.com',
    name: 'Krakow Transfer',
    description: 'Professional airport and city transfer service in Krakow',
    publisher: {
      '@type': 'Organization',
      '@id': 'https://krakowtransfer.com/#organization',
      name: 'Krakow Transfer',
      url: 'https://krakowtransfer.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://krakowtransfer.com/images/logo.jpg',
        width: 512,
        height: 512,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://krakowtransfer.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://krakowtransfer.com${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://krakowtransfer.com/#service',
    name: 'Airport Transfer Service',
    description:
      'Professional airport transfer service from Krakow Airport to any destination in Poland',
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://krakowtransfer.com/#business',
    },
    serviceType: 'Transportation Service',
    areaServed: {
      '@type': 'Country',
      name: 'Poland',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Vehicle Types',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Standard Car',
          description: 'Comfortable mid-size car (VW Passat, Toyota Camry)',
          price: 'From 150 PLN',
          priceCurrency: 'PLN',
        },
        {
          '@type': 'Offer',
          name: 'Premium Car',
          description: 'Luxury vehicle (Mercedes E-Class, BMW 5 Series)',
          price: 'From 225 PLN',
          priceCurrency: 'PLN',
        },
        {
          '@type': 'Offer',
          name: 'Van',
          description: 'Spacious van for groups (Mercedes V-Class, VW Caravelle)',
          price: 'From 270 PLN',
          priceCurrency: 'PLN',
        },
        {
          '@type': 'Offer',
          name: 'VIP Car',
          description: 'Exclusive premium vehicle (Mercedes S-Class, BMW 7 Series)',
          price: 'From 375 PLN',
          priceCurrency: 'PLN',
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

/**
 * Combined structured data component
 * Add this to your layout or page
 */
export function StructuredData() {
  return (
    <>
      <LocalBusinessSchema />
      <WebsiteSchema />
      <ServiceSchema />
    </>
  );
}
