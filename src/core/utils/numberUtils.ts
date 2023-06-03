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

export function lerp(a: number, b: number, x: number) {
    return a * (1 - x) + b * x;
}

export function clamp(v: number, min: number = 0, max: number = 1) {
    return Math.max(min, Math.min(max, v));
}

export function round1DigitLocalized(speed: number, separator: string = ","): string {
    return roundToDigit(speed, 1).toString().replace(".", separator);
}

export function formatItemsPerSecond(speed: number, double = false, separator: string = ","): string {
    return (
        T.ingame.buildingPlacement.infoTexts.itemsPerSecond.replace(
            "<x>",
            round2Digits(speed).toString().replace(".", separator)
        ) + (double ? "  " + T.ingame.buildingPlacement.infoTexts.itemsPerSecondDouble : "")
    );
}

export function formatSecondsToTimeAgo(secs: number) {
    const seconds = Math.floor(secs);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        if (seconds === 1) {
            return T.global.time.oneSecondAgo;
        }
        return T.global.time.xSecondsAgo.replace("<x>", "" + seconds);
    } else if (minutes < 60) {
        if (minutes === 1) {
            return T.global.time.oneMinuteAgo;
        }
        return T.global.time.xMinutesAgo.replace("<x>", "" + minutes);
    } else if (hours < 24) {
        if (hours === 1) {
            return T.global.time.oneHourAgo;
        }
        return T.global.time.xHoursAgo.replace("<x>", "" + hours);
    } else {
        if (days === 1) {
            return T.global.time.oneDayAgo;
        }
        return T.global.time.xDaysAgo.replace("<x>", "" + days);
    }
}

export function formatSeconds(secs: number) {
    const trans = T.global.time;
    secs = Math.ceil(secs);
    if (secs < 60) {
        return trans.secondsShort.replace("<seconds>", "" + secs);
    } else if (secs < 60 * 60) {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return trans.minutesAndSecondsShort.replace("<seconds>", "" + seconds).replace("<minutes>", "" + minutes);
    } else {
        const hours = Math.floor(secs / 3600);
        const minutes = Math.floor(secs / 60) % 60;
        return trans.hoursAndMinutesShort.replace("<minutes>", "" + minutes).replace("<hours>", "" + hours);
    }
}
