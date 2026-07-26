import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Image de partage social, générée au build.
 *
 * `ImageResponse` ne rend qu'un sous-ensemble de CSS : flexbox uniquement, pas
 * de grid, et tout élément à plusieurs enfants — les fragments de texte comptent —
 * doit déclarer `display: flex`.
 *
 * Le logo est lu depuis le disque et intégré en data URI : les URL distantes ne
 * sont pas résolues au moment de la génération statique.
 */
export const alt = `${site.name} — Nettoyage professionnel en Île-de-France et à ${site.address.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function logoDataUri(): Promise<string> {
  const fichier = await readFile(join(process.cwd(), "public", "logo-ms-nettoyage.png"));

  return `data:image/png;base64,${fichier.toString("base64")}`;
}

export default async function OpengraphImage() {
  const logo = await logoDataUri();

  return new ImageResponse(
    (
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
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "18px 28px",
              borderRadius: "18px",
              background: "#ffffff",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt="" width={260} height={129} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "68px",
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
              fontSize: "68px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              color: "#c6d6ff",
            }}
          >
            en Île-de-France
          </div>
          <div style={{ marginTop: "24px", fontSize: "28px", color: "#dce6ff" }}>
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
      </div>
    ),
    size,
  );
}
