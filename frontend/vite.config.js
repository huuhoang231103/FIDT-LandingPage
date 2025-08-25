import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
export default defineConfig({
  // base: "/test-fidt/",
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "../backend/**/*",
          dest: "services",
        },
      ],
    }),
  ],
  build: {
    outDir: "./dist",
    emptyOutDir: true,
  },
  // server: {
  //   proxy: {
  //     '/services': {
  //       target: 'https://thinhvuongtaichinh.net/backend',
  //       changeOrigin: true,
  //       secure: false,
  //     }
  //   }
  // }
});
