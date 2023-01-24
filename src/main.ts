import "./normalize.css";
import "./main.css";
import { resizeCanvas } from "./core/render/canvas";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
  </div>
`;

resizeCanvas(
	document.querySelector<HTMLCanvasElement>("#game")!,
	document.querySelector<HTMLCanvasElement>("#game")!.getContext("2d")!
);
