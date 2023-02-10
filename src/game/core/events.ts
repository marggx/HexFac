import Layout from "../../core/models/layout";
import { drawLines } from "../../core/render/canvas";
import { Vector2 } from "../../core/models/vector";
import { outlineHexGroup, pixelToHex, range } from "../utils/hexUtils";

let tap: Boolean = false;

export function initialize(args: { layout: Layout }) {
    const { layout } = args;

    addEventListener("pointerup", () => (tap = false));

    addEventListener("pointerdown", () => (tap = true));

    addEventListener("pointermove", (e: PointerEvent) => {
        if (tap) {
            layout.setOrigin(layout.origin.add({ x: e.movementX, y: e.movementY }));
        }
    });

    addEventListener("wheel", (e) => {
        layout.setSize(layout.size.add(new Vector2((e.deltaY * -1) / 50, (e.deltaY * -1) / 50)));
    });

    addEventListener("click", (e) => {
        e.preventDefault();
        let hex = pixelToHex(layout, new Vector2(e.clientX, e.clientY));
        if (!hex) return;
        let hexes = range(hex, 10);
        drawLines(outlineHexGroup(layout, hexes), "red", 1);
    });
}
