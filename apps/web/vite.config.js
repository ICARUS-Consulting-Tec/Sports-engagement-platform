import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function unityBrotliHeaders() {
  const applyHeaders = (req, res, next) => {
    if (!req.url?.includes("/Build/") || !req.url.endsWith(".br")) {
      next();
      return;
    }

    res.setHeader("Content-Encoding", "br");

    if (req.url.endsWith(".wasm.br")) {
      res.setHeader("Content-Type", "application/wasm");
    } else if (req.url.endsWith(".framework.js.br") || req.url.endsWith(".loader.js.br")) {
      res.setHeader("Content-Type", "application/javascript");
    } else if (req.url.endsWith(".data.br")) {
      res.setHeader("Content-Type", "application/octet-stream");
    }

    next();
  };

  return {
    name: "unity-brotli-headers",
    configureServer(server) {
      server.middlewares.use(applyHeaders);
    },
    configurePreviewServer(server) {
      server.middlewares.use(applyHeaders);
    },
  };
}

export default defineConfig({
  plugins: [react(), unityBrotliHeaders()],
  server: {
    proxy: {
      "/api": {
        target: "http://10.14.255.82:8081",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
