import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  const appTitle = env.VITE_APP_TITLE || "Active";
  const appDescription =
    env.VITE_APP_DESCRIPTION || "City of Ottawa Drop-in Activity Schedules";
  const authorName = env.VITE_AUTHOR_NAME || "Emrah Kinay";

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "html-env-inject",
        transformIndexHtml(html) {
          return html
            .replace(/%VITE_APP_TITLE%/g, appTitle)
            .replace(/%VITE_APP_DESCRIPTION%/g, appDescription)
            .replace(/%VITE_AUTHOR_NAME%/g, authorName);
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
