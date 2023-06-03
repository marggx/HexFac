import { roundToDigit } from "./utils/numberUtils";

export function getDeviceDPI(): number {
    return window.devicePixelRatio || 1;
}

export function smoothenDpi(dpi: number): number {
    if (dpi < 0.05) {
        return 0.05;
    } else if (dpi < 0.2) {
        return roundToDigit(Math.round(dpi / 0.04) * 0.04, 2);
    } else if (dpi < 1) {
        return roundToDigit(Math.round(dpi / 0.1) * 0.1, 1);
    } else if (dpi < 4) {
        return roundToDigit(Math.round(dpi / 0.5) * 0.5, 1);
    } else {
        return 4;
    }
}

export function prepareHighDPIContext(context: CanvasRenderingContext2D, smooth: boolean = true) {
    const dpi = getDeviceDPI();
    context.scale(dpi, dpi);

    if (smooth) {
        context.imageSmoothingEnabled = true;
        // @ts-ignore
        context.webkitImageSmoothingEnabled = true;
        context.imageSmoothingQuality =  'low';
    } else {
        context.imageSmoothingEnabled = false;
        // @ts-ignore
        context.webkitImageSmoothingEnabled = false;
    }
}

export function resizeHighDPICanvas(canvas: HTMLCanvasElement, w: number, h: number, smooth: boolean = true) {
    const dpi = getDeviceDPI();

    const wNumber = Math.floor(w);
    const hNumber = Math.floor(h);

    const targetW = Math.floor(wNumber * dpi);
    const targetH = Math.floor(hNumber * dpi);

    if (targetW !== canvas.width || targetH !== canvas.height) {
        // console.log("Resize Canvas from", canvas.width, canvas.height, "to", targetW, targetH)
        canvas.width = targetW;
        canvas.height = targetH;
        canvas.style.width = wNumber + "px";
        canvas.style.height = hNumber + "px";
        prepareHighDPIContext(canvas.getContext("2d")!, smooth);
    }
}

export function resizeCanvas(canvas: HTMLCanvasElement, w: number, h: number, setStyle: boolean = true) {
    const actualW = Math.ceil(w);
    const actualH = Math.ceil(h);
    if (actualW !== canvas.width || actualH !== canvas.height) {
        canvas.width = actualW;
        canvas.height = actualH;
        if (setStyle) {
            canvas.style.width = actualW + "px";
            canvas.style.height = actualH + "px";
        }
    }
}

export function resizeCanvasAndClear(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, w: number, h: number) {
    const actualW = Math.ceil(w);
    const actualH = Math.ceil(h);
    if (actualW !== canvas.width || actualH !== canvas.height) {
        canvas.width = actualW;
        canvas.height = actualH;
        canvas.style.width = actualW + "px";
        canvas.style.height = actualH + "px";
    } else {
        context.clearRect(0, 0, actualW, actualH);
    }
}
