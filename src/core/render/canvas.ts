import { Vector2 } from "../../game/models/vector";

const sqrt3 = Math.sqrt(3);

const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("game")!;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";

resizeCanvas(canvas, ctx);

addEventListener("resize", () => resizeCanvas(canvas, ctx));

export function resizeCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
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

let imgs = [
    "./../../../src/assets/img/grass_12.png",
    "./../../../src/assets/img/grass_13.png",
    "./../../../src/assets/img/grass_14.png",
    "./../../../src/assets/img/grass_15.png",
    "./../../../src/assets/img/grass_16.png",
    "./../../../src/assets/img/dirt_13.png",
    "./../../../src/assets/img/dirt_14.png",
    "./../../../src/assets/img/dirt_15.png",
    "./../../../src/assets/img/dirt_16.png",
    "./../../../src/assets/img/dirt_17.png",
];
let imgr = [];
for (let i = 0; i < imgs.length; i++) {
    let img = new Image();
    img.src = imgs[i];
    imgr.push(img);
}

export function drawPolygon(
    points: Vector2[],
    fillStyle: string | null,
    strokeStyle: string | null,
    lineWidth: number
) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    if (fillStyle !== null) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
    }
    ctx.lineWidth = lineWidth;
    if (strokeStyle !== null) {
        ctx.strokeStyle = strokeStyle;
    }

    ctx.stroke();
}

export function drawText(text: string) {
    ctx.font = "30px Arial";
    ctx.fillText(text, 10, 50);
}

export function drawImage(point: Vector2, x: number, y: number, img: string) {
    let imgn = imgr[imgs.indexOf(img)];
    if (!imgn) return;
    ctx.drawImage(imgn, point.x - (sqrt3 * x) / 2, point.y - (2 * y) / 2, sqrt3 * x, 2 * y);
}

export function drawLines(lines: [Vector2, Vector2][], strokeStyle: string, lineWidth: number) {
    ctx.beginPath();
    for (let i = 0; i < lines.length; i++) {
        ctx.moveTo(lines[i][0].x, lines[i][0].y);
        ctx.lineTo(lines[i][1].x, lines[i][1].y);
    }
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
}

export function writeText(text: string, point: Vector2) {
    ctx.font = "30px Arial";
    ctx.fillText(text, point.x, point.y);
}
