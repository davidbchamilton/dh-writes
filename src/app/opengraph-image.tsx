import { ImageResponse } from "next/og";

export const alt =
  "David Hamilton — Author & Novelist. Discover Bois, a Caribbean young adult fantasy.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
