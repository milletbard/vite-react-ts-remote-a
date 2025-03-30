import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

function logManifestUrl(): Plugin {
  return {
    name: "log-manifest-url",
    configureServer(server) {
      server.httpServer?.once("listening", () => {
        console.log(server);
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
  base: "/",
  // 加入server配置
  server: {
    port: 2000,
    origin: "http://localhost:2000", // 配置跨域
  },

  build: {
    target: "chrome89",
  },
  plugins: [
    react(), // 配置react
    federation({
      filename: "remoteEntry.js", // 遠端入口檔名
      manifest: true, // 生成遠端入口檔案
      name: "remoteA", // 遠端入口檔案名稱
      exposes: {
        "./App": "./src/main.tsx", // 暴露的模組
      },
      shared: ["react", "react-dom"], // 共享的模組
    }),
    logManifestUrl(), // 打印遠端入口檔案連結
  ],
});
