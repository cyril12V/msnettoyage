import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      /*
        Les tests s'exécutent sous jsdom, où `server-only` résout sa variante
        navigateur, dont le seul rôle est de lever. Le neutraliser ici permet de
        tester les modules serveur ; la garantie de production est inchangée,
        puisque c'est le build de Next.js, et non Vitest, qui refuse un import
        de ces modules depuis un composant client.
      */
      "server-only": fileURLToPath(new URL("./tests/server-only.ts", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
  },
});
