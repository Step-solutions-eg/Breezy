export interface Breadcrumb {
  name: string;
  item: string;
}

export function hotelSchema(url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "Breezy Island — Siwa Oasis Retreat",
    description:
      "A hidden sanctuary in the heart of Siwa Oasis, where desert silence meets unparalleled luxury and timeless Egyptian hospitality.",
    url,
    telephone: "+20 1278792538",
    email: "breezyislandresort@gmail.com",
    priceRange: "$$$",
    image: "https://www.breezyhotel.online/images/3.webp",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Siwa Oasis",
      addressLocality: "Siwa",
      addressRegion: "Matrouh",
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 29.2032,
      longitude: 25.5195,
    },
    starRating: {
      "@type": "Rating",
      ratingValue: "5",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Swimming Pool" },
      { "@type": "LocationFeatureSpecification", name: "Spa" },
      { "@type": "LocationFeatureSpecification", name: "Restaurant" },
      { "@type": "LocationFeatureSpecification", name: "Free WiFi" },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning" },
    ],
  };
}

export function localBusinessSchema(url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Breezy Island — Siwa Oasis Retreat",
    description:
      "Luxury desert retreat in the heart of Siwa Oasis, Egypt.",
    url,
    telephone: "+20 1278792538",
    email: "breezyislandresort@gmail.com",
    priceRange: "$$$",
    image: "https://www.breezyhotel.online/images/3.webp",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Siwa Oasis",
      addressLocality: "Siwa",
      addressRegion: "Matrouh",
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 29.2032,
      longitude: 25.5195,
    },
    openingHours: "Mo-Su 00:00-23:59",
    sameAs: [
      "https://instagram.com/breezyisland",
      "https://facebook.com/breezyisland",
    ],
  };
}

export function breadcrumbSchema(items: Breadcrumb[], baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${baseUrl}${item.item}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function productSchema(
  name: string,
  description: string,
  image: string,
  url: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    url,
    brand: {
      "@type": "Brand",
      name: "Breezy Island",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EGP",
      url,
    },
  };
}
