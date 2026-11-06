import art360 from "../../public/images/bois-artwork-360.webp";
import art480 from "../../public/images/bois-artwork-480.webp";
import art640 from "../../public/images/bois-artwork-640.webp";
import art750 from "../../public/images/bois-artwork-750.webp";
import art828 from "../../public/images/bois-artwork-828.webp";
import art960 from "../../public/images/bois-artwork-960.webp";
import art1280 from "../../public/images/bois-artwork-1280.webp";

// Static imports provide content-hashed URLs with immutable framework caching.
export const heroImage = {
  src: art828.src,
  width: art1280.width,
  height: art1280.height,
  srcSet: [art360, art480, art640, art750, art828, art960, art1280]
    .map((image) => `${image.src} ${image.width}w`)
    .join(", "),
  sizes: [
    "(max-width: 469px) calc(100vw - 58px)",
    "(max-width: 767px) 412px",
    "(max-width: 900px) calc(40vw - 69.2px)",
    "(max-width: 1100px) calc(41.667vw - 74.667px)",
    "(max-width: 1199px) calc(41.667vw - 84.667px)",
    "(max-width: 1439px) 415.333px",
    "412px",
  ].join(", "),
};
