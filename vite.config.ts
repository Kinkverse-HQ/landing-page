import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Root custom domain (kinkverse.org) — assets served from /
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
});
