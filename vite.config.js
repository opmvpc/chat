import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    proxy: {
      "/ws": {
        target: "ws://localhost:4444/",
        ws: true,
      },
    },
  },
});
