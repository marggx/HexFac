export function ranMinMax(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function subtractWithWrapAround(num1: number, num2: number, max: number): number {
    let result = num1 - num2;
    if (result < 0) {
        result = max + result;
    }
    return result;
}

export function safeModulo(n: number, m: number): number {
    return ((n % m) + m) % m;
}

export function smoothPulse(time: number): number {
    return Math.sin(time * 4) * 0.5 + 0.5;
}

export function roundToDigit(n: number, digits: number): number {
    const factor = Math.pow(10, digits);
    return Math.round(n * factor) / factor;
}

export function floorToDigit(n: number, digits: number): number {
    const factor = Math.pow(10, digits);
    return Math.floor(n * factor) / factor;
}

export function lerp(a: number, b: number, x: number) {
    return a * (1 - x) + b * x;
}

export function clamp(v: number, min: number = 0, max: number = 1) {
    return Math.max(min, Math.min(max, v));
}

export function round1DigitLocalized(speed: number, separator: string = ","): string {
    return roundToDigit(speed, 1).toString().replace(".", separator);
}

export function isPositive(n: number): boolean {
    return n > 0;
}
