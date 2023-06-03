export function randomChoice(arr: Array<any>) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function fastArrayDelete(arr: Array<any>, index: number) {
    if (index < 0 || index >= arr.length) {
        return;
    }

    if (index !== arr.length - 1) {
        const last = arr[arr.length - 1];
        arr[index] = last;
    }
    arr.length -= 1;
}

export function fastArrayDeleteValue(arr: Array<any>, value: any) {
    if (arr == null) {
        return;
    }
    const index = arr.indexOf(value);
    if (index < 0) {
        return;
    }
    fastArrayDelete(arr, index);
}

export function arrayDeleteValue(arr: Array<any>, value: any) {
    if (arr == null) {
        return;
    }
    const index = arr.indexOf(value);
    if (index < 0) {
        return;
    }
    arr.splice(index, 1);
}
