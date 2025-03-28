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
  base: "./",
  // 加入server配置
  server: {
    port: 2000,
  },

  build: {
    target: "chrome89",
  },
  plugins: [
    react(), // 配置react
    federation({
      filename: "remoteEntry.js", // 遠端入口檔名
      name: "remoteA", // 這個名稱會成為全域變數的名稱
      exposes: {
        ".": "./src/main.tsx",
      },
      shared: ["react", "react-dom"],
    }),
    logManifestUrl(),
  ],
});
