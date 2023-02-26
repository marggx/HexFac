import { Vector2 } from "../../core/models/vector";
import Game from "./game";

export function initialize(args: { game: Game }) {
    const { game } = args;

    addEventListener("pointerup", (e) => game.tapUp({ x: e.clientX, y: e.clientY }));

    addEventListener("pointerdown", (e) => game.tapDown({ x: e.clientX, y: e.clientY }));

    addEventListener("pointermove", (e) => game.tapMove({ x: e.movementX, y: e.movementY }));

    addEventListener("wheel", (e) => game.zoom(new Vector2((e.deltaY * -1) / 50, (e.deltaY * -1) / 50)));
}
