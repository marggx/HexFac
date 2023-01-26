import "./normalize.css";
import "./main.css";
import { clearCanvas, drawPolygon, resizeCanvas } from "./core/render/canvas";
import {
	hexagonMap,
	pixelToHex,
	polygonCorners,
	range,
} from "./game/utils/hexUtils";
import Layout, { orientation } from "./core/layout";
import { Vector2 } from "./core/utils/vector";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
  </div>
`;

resizeCanvas(
	document.querySelector<HTMLCanvasElement>("#game")!,
	document.querySelector<HTMLCanvasElement>("#game")!.getContext("2d")!
);

let layout = new Layout(
	orientation,
	new Vector2(20, 20),
	new Vector2(750, 750)
);

function draw() {
	let hexas = hexagonMap(10);
	layout.setOrigin(new Vector2(++layout.origin.x, layout.origin.y));
	for (let i = 0; i < hexas.length; i++) {
		drawPolygon(polygonCorners(layout, hexas[i]), "red", "black", 1);
	}
}

function ran(min: number, max: number) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}

addEventListener("click", (e) => {
	e.preventDefault();
	let hex = pixelToHex(layout, new Vector2(e.clientX, e.clientY));
	let hexes = range(hex, 2);
	for (let i = 0; i < hexes.length; i++) {
		drawPolygon(polygonCorners(layout, hexes[i]), "blue", "black", 1);
	}

	console.log(hex);
});

let secondsPassed = 0;
let oldTimeStamp = 0;

function gameLoop(timeStamp: DOMHighResTimeStamp) {
	// Calculate how much time has passed
	secondsPassed = Math.min(timeStamp - oldTimeStamp, 0.1);
	oldTimeStamp = timeStamp;

	if (layout.changed) {
		clearCanvas();

		layout.changed = false;
		draw();
	}
	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
