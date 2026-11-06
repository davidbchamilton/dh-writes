import { ImageResponse } from "next/og";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const size = { width: 1200, height: 630 };

function openGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: "#101412",
        color: "#dfe4de",
        padding: "72px 84px",
        borderLeft: "8px solid #e89a1b",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 25, letterSpacing: 4, color: "#ffb959" }}>
          DAVID HAMILTON
        </span>
        <span style={{ fontSize: 20, marginTop: 12, color: "#d7c3ae" }}>
          Author & Novelist
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 110, letterSpacing: -4 }}>BOIS</span>
        <span style={{ fontSize: 30, color: "#dabce8", marginTop: 12 }}>
          Contemporary Caribbean young adult fantasy
        </span>
      </div>
    </div>,
    size,
  );
}

const response = openGraphImage();
await sharp(Buffer.from(await response.arrayBuffer()))
  .webp({ quality: 90, effort: 6 })
  .toFile(fileURLToPath(new URL("../public/opengraph-image.webp", import.meta.url)));
console.log("Generated the WebP social sharing image.");
