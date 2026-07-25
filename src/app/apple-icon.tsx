import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Icône d'écran d'accueil iOS — fond plein, sans transparence ni coins arrondis. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b4edb",
        color: "#ffffff",
        fontSize: 78,
        fontWeight: 800,
        letterSpacing: "-0.04em",
      }}
    >
      MS
    </div>,
    size,
  );
}
