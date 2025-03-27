import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

function logManifestUrl(): Plugin {
  return {
    name: "log-manifest-url",
    configureServer(server) {
      server.httpServer?.once("listening", () => {
        // 在正式開始監聽後，印出連結
        console.log(
          `\n[MF Manifest] ${server.config.server.origin}/remoteEntry.js\n`
        );
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  // 加入server配置
  server: {
    origin: "http://localhost:2000", // 配置跨域
    port: 2000,
  },
  build: {
    target: "chrome89", // esnext 會讓 Vite / esbuild 採用最新可用語法F
  },
  base: "http://localhost:2000", // 配置基础路徑
  plugins: [
    react(), // 配置react
    federation({
      name: "remoteA", // 這個名稱會成為全域變數的名稱
      filename: "remoteEntry.js", // 遠端入口檔名
      exposes: {
        ".": "./src/main.tsx",
      },
      shared: ["react", "react-dom"],
    }),
    logManifestUrl(),
  ],
});
