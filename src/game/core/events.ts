import { Vector2 } from "../models/vector";
import Game from "./game";

export function initialize(args: { game: Game }) {
    const { game } = args;

    game.canvas.addEventListener("pointerup", (e) => game.tapUp({ x: e.clientX, y: e.clientY }));

    game.canvas.addEventListener("pointerdown", (e) => game.tapDown({ x: e.clientX, y: e.clientY }));

    game.canvas.addEventListener("pointermove", (e) => {
        game.tapMove({ x: e.movementX, y: e.movementY });
    });

    game.canvas.addEventListener("wheel", (e) => game.zoom(new Vector2((e.deltaY * -1) / 50, (e.deltaY * -1) / 50)));

    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey) {
            game.layout.reset();
        }
    });
}
