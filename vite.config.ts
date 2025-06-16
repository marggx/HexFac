import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
    base: "/HexFac/",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src/assets"),
        },
    },
});
