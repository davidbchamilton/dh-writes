import assert from "node:assert/strict";
import { test } from "node:test";
import { analyticsLinkEvent, isAnalyticsHost } from "../src/lib/analytics";

const page = "https://davidhamiltonwrites.com/books";

test("analytics excludes local development and unrelated hosts", () => {
  for (const host of ["localhost", "127.0.0.1", "preview.example.com", "davidhamiltonwrites.com.example.com"]) {
    assert.equal(isAnalyticsHost(host), false);
  }
  assert.equal(isAnalyticsHost("davidhamiltonwrites.com"), true);
  assert.equal(isAnalyticsHost("www.davidhamiltonwrites.com"), true);
});

test("subscription clicks support Substack and explicitly marked custom domains", () => {
  assert.equal(analyticsLinkEvent("https://writer.substack.com/subscribe", page)?.name, "substack_subscribe_click");
  assert.equal(analyticsLinkEvent("https://newsletter.example.com", page, "substack")?.name, "substack_subscribe_click");
  assert.equal(analyticsLinkEvent("https://substack.com.example.com", page), undefined);
  assert.equal(analyticsLinkEvent("/newsletter", page), undefined);
});

test("contact events exclude email, phone, query strings, and fragments", () => {
  assert.deepEqual(analyticsLinkEvent("mailto:private@example.com?body=secret", page), {
    name: "contact_click", params: { contact_method: "mailto" },
  });
  assert.deepEqual(analyticsLinkEvent("tel:+15555555555", page), {
    name: "contact_click", params: { contact_method: "tel" },
  });
  assert.equal(analyticsLinkEvent("/contact?email=private@example.com#secret", page)?.params.contact_method, "contact_page");
  assert.equal(analyticsLinkEvent("https://www.instagram.com/writer/", page, "contact")?.name, "contact_click");
});

test("book events distinguish internal browsing from retailer interest", () => {
  assert.equal(analyticsLinkEvent("/books/bois", page)?.params.link_type, "book_page");
  assert.deepEqual(analyticsLinkEvent("https://www.amazon.com/dp/B0CLKZ34WP?token=private#secret", page, "book", "Island Voices"), {
    name: "book_link_click",
    params: { link_url: "https://www.amazon.com/dp/B0CLKZ34WP", link_type: "retailer", book_title: "Island Voices" },
  });
  assert.equal(analyticsLinkEvent("/about", page), undefined);
  assert.equal(analyticsLinkEvent("javascript:alert(1)", page, "book"), undefined);
});
