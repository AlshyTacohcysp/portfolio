import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0b",
          color: "#edebe6",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "#c8f14f",
              color: "#0a0a0b",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 22,
            }}
          >
            MR
          </div>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 3, color: "#97958e", fontFamily: "monospace" }}>
            {site.location.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", fontSize: 44, fontStyle: "italic", color: "#c8f14f", marginTop: 10 }}>
            {site.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(237,235,230,0.15)",
            paddingTop: 28,
            fontSize: 22,
            color: "#97958e",
            fontFamily: "monospace",
          }}
        >
          <span>{site.availability}</span>
          <span style={{ color: "#edebe6" }}>{site.url.replace("https://", "")}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
