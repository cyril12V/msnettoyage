import { ImageResponse } from "next/og";

/**
 * Favicon généré au build.
 *
 * Généré plutôt qu'importé : le logo vectoriel définitif n'a pas été fourni.
 * Dès qu'il le sera, remplacer ce fichier par `icon.png` dans `src/app/` —
 * Next.js prend alors automatiquement le fichier statique.
 */
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
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
        fontSize: 88,
        fontWeight: 800,
        letterSpacing: "-0.04em",
      }}
    >
      MS
    </div>,
    size,
  );
}
