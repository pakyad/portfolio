import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#061b3a", color: "#f5f0e8", fontSize: 68, fontWeight: 700, letterSpacing: "-6px" }}>
      II
    </div>,
    { ...size }
  );
}
