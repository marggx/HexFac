const canvas = <HTMLCanvasElement>document.getElementById("game")!;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

if (window.devicePixelRatio > 1) {
	resizeCanvas(canvas, ctx);
}

addEventListener("resize", () => resizeCanvas(canvas, ctx));

export function resizeCanvas(
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D
) {
	const canvasWidth = innerWidth;
	const canvasHeight = innerHeight;

	canvas.width = canvasWidth * window.devicePixelRatio;
	canvas.height = canvasHeight * window.devicePixelRatio;
	canvas.style.width = canvasWidth + "px";
	canvas.style.height = canvasHeight + "px";

	ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

export default canvas;
