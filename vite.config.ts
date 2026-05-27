import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    target: ["chrome89", "edge89", "firefox89", "safari14"],
  },
  server: {
    port: 5173,
    host: "localhost",
  },
});
