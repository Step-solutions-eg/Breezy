"use client";

import { useEffect } from "react";

export type SeoData = {
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  hreflang?: { lang: string; url: string }[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: "summary" | "summary_large_image";
  jsonLd?: Record<string, unknown>[];
};

const BASE_URL = "https://www.breezyhotel.online";

function upsertTag(
  tagName: string,
  attributes: Record<string, string>,
  id: string,
) {
  const existing = document.head.querySelector(`[data-seo-id="${id}"]`);
  if (existing) {
    Object.entries(attributes).forEach(([key, value]) =>
      existing.setAttribute(key, value),
    );
    return existing;
  }
  const el = document.createElement(tagName);
  el.setAttribute("data-seo-id", id);
  Object.entries(attributes).forEach(([key, value]) =>
    el.setAttribute(key, value),
  );
  document.head.appendChild(el);
  return el;
}

function upsertLink(
  attributes: Record<string, string>,
  id: string,
) {
  return upsertTag("link", attributes, id);
}

function upsertMeta(
  attributes: Record<string, string>,
  id: string,
) {
  return upsertTag("meta", attributes, id);
}

function upsertScript(
  content: string,
  id: string,
) {
  const existing = document.head.querySelector(`[data-seo-id="${id}"]`);
  if (existing) {
    existing.textContent = content;
    return existing;
  }
  const el = document.createElement("script");
  el.setAttribute("data-seo-id", id);
  el.setAttribute("type", "application/ld+json");
  el.textContent = content;
  document.head.appendChild(el);
  return el;
}

function removeStaleTags(activeIds: Set<string>) {
  document.head
    .querySelectorAll("[data-seo-id]")
    .forEach((el) => {
      const id = el.getAttribute("data-seo-id");
      if (id && !activeIds.has(id)) {
        el.remove();
      }
    });
}

export default function SeoHead({ data }: { data: SeoData }) {
  useEffect(() => {
    const activeIds = new Set<string>();

    // Title
    const titleId = "seo-title";
    activeIds.add(titleId);
    let titleEl = document.head.querySelector(
      `[data-seo-id="${titleId}"]`,
    ) as HTMLTitleElement | null;
    if (titleEl) {
      titleEl.textContent = data.title;
    } else {
      titleEl = document.createElement("title");
      titleEl.setAttribute("data-seo-id", titleId);
      titleEl.textContent = data.title;
      document.head.appendChild(titleEl);
    }

    // Canonical
    const canonicalId = "seo-canonical";
    activeIds.add(canonicalId);
    upsertLink(
      { rel: "canonical", href: `${BASE_URL}${data.canonical}` },
      canonicalId,
    );

    // Description
    const descId = "seo-description";
    activeIds.add(descId);
    upsertMeta(
      { name: "description", content: data.description },
      descId,
    );

    // Keywords
    if (data.keywords) {
      const kwId = "seo-keywords";
      activeIds.add(kwId);
      upsertMeta(
        { name: "keywords", content: data.keywords },
        kwId,
      );
    }

    // Hreflang
    if (data.hreflang) {
      data.hreflang.forEach((hl) => {
        const hlId = `seo-hreflang-${hl.lang}`;
        activeIds.add(hlId);
        upsertLink(
          { rel: "alternate", hreflang: hl.lang, href: `${BASE_URL}${hl.url}` },
          hlId,
        );
      });
      // x-default
      const xdefId = "seo-hreflang-x-default";
      activeIds.add(xdefId);
      upsertLink(
        { rel: "alternate", hreflang: "x-default", href: `${BASE_URL}${data.canonical}` },
        xdefId,
      );
    }

    // OG
    const ogTitleId = "seo-og-title";
    activeIds.add(ogTitleId);
    upsertMeta(
      { property: "og:title", content: data.ogTitle ?? data.title },
      ogTitleId,
    );

    const ogDescId = "seo-og-description";
    activeIds.add(ogDescId);
    upsertMeta(
      { property: "og:description", content: data.ogDescription ?? data.description },
      ogDescId,
    );

    const ogUrlId = "seo-og-url";
    activeIds.add(ogUrlId);
    upsertMeta(
      { property: "og:url", content: `${BASE_URL}${data.canonical}` },
      ogUrlId,
    );

    const ogTypeId = "seo-og-type";
    activeIds.add(ogTypeId);
    upsertMeta(
      { property: "og:type", content: data.ogType ?? "website" },
      ogTypeId,
    );

    if (data.ogImage) {
      const ogImgId = "seo-og-image";
      activeIds.add(ogImgId);
      upsertMeta(
        { property: "og:image", content: `${BASE_URL}${data.ogImage}` },
        ogImgId,
      );
      const ogImgWidthId = "seo-og-image-width";
      activeIds.add(ogImgWidthId);
      upsertMeta(
        { property: "og:image:width", content: "1200" },
        ogImgWidthId,
      );
      const ogImgHeightId = "seo-og-image-height";
      activeIds.add(ogImgHeightId);
      upsertMeta(
        { property: "og:image:height", content: "630" },
        ogImgHeightId,
      );

      // Twitter uses same image
      const twImgId = "seo-twitter-image";
      activeIds.add(twImgId);
      upsertMeta(
        { name: "twitter:image", content: `${BASE_URL}${data.ogImage}` },
        twImgId,
      );
    }

    // Twitter Card
    const twCardId = "seo-twitter-card";
    activeIds.add(twCardId);
    upsertMeta(
      { name: "twitter:card", content: data.twitterCard ?? "summary_large_image" },
      twCardId,
    );

    const twTitleId = "seo-twitter-title";
    activeIds.add(twTitleId);
    upsertMeta(
      { name: "twitter:title", content: data.ogTitle ?? data.title },
      twTitleId,
    );

    const twDescId = "seo-twitter-description";
    activeIds.add(twDescId);
    upsertMeta(
      { name: "twitter:description", content: data.ogDescription ?? data.description },
      twDescId,
    );

    // JSON-LD
    if (data.jsonLd) {
      data.jsonLd.forEach((schema, i) => {
        const ldId = `seo-jsonld-${i}`;
        activeIds.add(ldId);
        upsertScript(JSON.stringify(schema), ldId);
      });
    }

    // Remove stale tags
    removeStaleTags(activeIds);
  }, [data]);

  return null;
}

export { BASE_URL };
