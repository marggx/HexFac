import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
    base: "/HexFac/",
    resolve: {
        alias: {
            "@assets": path.resolve(__dirname, "src/assets"),
            "@core": path.resolve(__dirname, "src/core"),
            "@utils": path.resolve(__dirname, "src/core/utils"),
            "@render": path.resolve(__dirname, "src/core/render"),
            "@game": path.resolve(__dirname, "src/game"),
            "@models": path.resolve(__dirname, "src/game/models"),
            "@gamecore": path.resolve(__dirname, "src/game/core"),
        },
    },
});
