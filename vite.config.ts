import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
import { resolve } from "path";
import { cssInjectToEntries } from "./src/vite/plugins/cssInjectToEntries";

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
  base: "./", // ✅ 避免出現 /assets 錯誤路
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"), // 添加路徑別名
    },
  },
  // 加入server配置
  server: {
    port: 2000,
    origin: "http://localhost:2000", // 配置跨域
  },

  build: {
    target: "chrome89",
    // 禁用 CSS 代碼分割
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // 禁用 CSS 代碼分割
        manualChunks: undefined,
      },
    },
  },
  plugins: [
    react(), // 配置react
    cssInjectToEntries(["remoteEntry"]), // 只針對 remoteEntry
    federation({
      filename: "remoteEntry.js", // 遠端入口檔名
      manifest: true, // 生成遠端入口檔案
      name: "remoteA", // 遠端入口檔案名稱
      exposes: {
        "./App": "./src/entries/AppEntry.tsx", // 暴露的模組
      },
      shared: {
        react: {
          singleton: true, // 解決前端 runtime 時，react 版本不一致問題
          strictVersion: true, // 嚴格版本
          requiredVersion: "19.0.0", // 指定版本
        },
        "react-dom": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "19.0.0",
        },
        "react/jsx-runtime": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "19.0.0",
        },
        "@tanstack/react-query": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "5.69.0",
        },
        "react-router-dom": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "7.4.1",
        },
      },
    }),
    cssInjectToEntries(["AppEntry"]),
    logManifestUrl(), // 打印遠端入口檔案連結
  ],
});
