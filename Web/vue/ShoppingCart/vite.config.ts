import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      src: resolve(__dirname, "src"),
      styles: resolve(__dirname, "src/styles"),
      router: resolve(__dirname, "src/router"),
      views: resolve(__dirname, "src/views"),
      pages: resolve(__dirname, "src/pages"),
      cp: resolve(__dirname, "src/components"),
      data: resolve(__dirname, "src/data"),
      utils: resolve(__dirname, "src/utils"),
      assets: resolve(__dirname, "src/assets"),
    },
    extensions: [".ts", ".js", ".vue", ".json"],
  },
  base: "./", // 设置打包路径
  server: {
    port: 1026, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
  },
});

