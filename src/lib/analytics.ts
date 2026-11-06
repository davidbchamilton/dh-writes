export const measurementId = "G-0JBYL3J2YD";

export function isAnalyticsHost(hostname: string) {
  return ["davidhamiltonwrites.com", "www.davidhamiltonwrites.com"].includes(hostname);
}

type LinkEvent = {
  name: "substack_subscribe_click" | "contact_click" | "book_link_click";
  params: Record<string, string>;
};

// Classify links without sending link text, email addresses, or URL queries.
export function analyticsLinkEvent(
  href: string,
  pageUrl: string,
  category?: string,
  bookTitle?: string,
): LinkEvent | undefined {
  let url: URL;
  try {
    url = new URL(href, pageUrl);
  } catch {
    return;
  }
  const page = new URL(pageUrl);
  if (url.protocol === "mailto:" || url.protocol === "tel:") {
    return { name: "contact_click", params: { contact_method: url.protocol.slice(0, -1) } };
  }
  if (!["https:", "http:"].includes(url.protocol)) return;

  if (category === "substack" || url.hostname === "substack.com" || url.hostname.endsWith(".substack.com")) {
    return { name: "substack_subscribe_click", params: { destination: url.hostname } };
  }
  if (category === "contact" || (url.origin === page.origin && /^\/contact\/?$/.test(url.pathname))) {
    return {
      name: "contact_click",
      params: { contact_method: url.origin === page.origin ? "contact_page" : url.hostname },
    };
  }
  if (category === "book" || (url.origin === page.origin && /^\/books(?:\/|$)/.test(url.pathname))) {
    return {
      name: "book_link_click",
      params: {
        link_url: `${url.origin}${url.pathname}`,
        link_type: url.origin === page.origin ? "book_page" : "retailer",
        ...(bookTitle ? { book_title: bookTitle } : {}),
      },
    };
  }
}
