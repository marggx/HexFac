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

export default {};
