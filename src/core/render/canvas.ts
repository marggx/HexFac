import { Vector2 } from "../utils/vector";

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

export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function drawPolygon(
    points: Vector2[],
    fillStyle: string,
    strokeStyle: string,
    lineWidth: number
) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
}

export default canvas;
