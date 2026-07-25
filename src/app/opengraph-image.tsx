import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Image de partage social, générée au build.
 *
 * `ImageResponse` ne rend qu'un sous-ensemble de CSS : flexbox uniquement, pas
 * de grid, et chaque conteneur à plusieurs enfants doit déclarer `display:flex`.
 */
export const alt = `${site.name} — Nettoyage professionnel en Île-de-France et à ${site.address.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "linear-gradient(135deg, #063aab 0%, #0b4edb 62%, #0741b8 100%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "76px",
            height: "76px",
            borderRadius: "18px",
            background: "#ffffff",
            color: "#0b4edb",
            fontSize: "32px",
            fontWeight: 800,
          }}
        >
          MS
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "26px", fontWeight: 800, letterSpacing: "0.04em" }}>MS</div>
          <div style={{ fontSize: "16px", letterSpacing: "0.28em", color: "#c6d6ff" }}>
            NETTOYAGE
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: "70px",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
          }}
        >
          Nettoyage professionnel
        </div>
        <div
          style={{
            fontSize: "70px",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            color: "#c6d6ff",
          }}
        >
          en Île-de-France
        </div>
        {/* Un seul nœud texte : satori exige `display: flex` dès qu'un div a plusieurs enfants. */}
        <div style={{ marginTop: "26px", fontSize: "28px", color: "#dce6ff" }}>
          {`${site.address.city} (${site.address.postalCode}) · Devis gratuit sous ${site.delaiReponse}`}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "28px",
          paddingTop: "26px",
          borderTop: "1px solid rgba(255,255,255,0.25)",
          fontSize: "26px",
          fontWeight: 600,
        }}
      >
        <span>{site.contact.phoneInternational}</span>
        <span style={{ color: "rgba(255,255,255,0.45)" }}>|</span>
        <span>{site.contact.email}</span>
      </div>
    </div>,
    size,
  );
}
