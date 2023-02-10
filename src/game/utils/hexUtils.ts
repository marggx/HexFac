import Layout from "../../core/models/layout";
import Hex, { HexCoordinates } from "../models/hex";
import { Vector2 } from "../../core/models/vector";

let hexagons: Hex[] = [];

export const directions: HexCoordinates[] = [
    { q: 1, r: 0, s: -1 },
    { q: 1, r: -1, s: 0 },
    { q: 0, r: -1, s: 1 },
    { q: -1, r: 0, s: 1 },
    { q: -1, r: 1, s: 0 },
    { q: 0, r: 1, s: -1 },
];

export function getOrCreateHexagon(cords: HexCoordinates, create: Boolean = false): Hex | undefined {
    let hex = getHexagonByCords(cords);
    if (hex !== undefined) {
        return hex;
    }

    if (create) {
        return new Hex(cords.q, cords.r, cords.s);
    }

    return undefined;
}

export function getHexagon(id: string): Hex | undefined {
    for (let i = 0; i < hexagons.length; i++) {
        const hex = hexagons[i];
        if (hex.id === id) {
            return hex;
        }
    }
    return undefined;
}

export function getHexagons(): Hex[] {
    return hexagons;
}

export function getHexagonByCords(cords: HexCoordinates): Hex | undefined {
    for (let i = 0; i < hexagons.length; i++) {
        const hex = hexagons[i];
        if (equals(hex, cords)) {
            return hex;
        }
    }
    return undefined;
}

export function axialToCube(axial: Vector2): HexCoordinates {
    const q = axial.x;
    const r = axial.y;
    const s = -q - r;
    return { q, r, s };
}

export function cubeToAxial(cube: HexCoordinates): Vector2 {
    const x = cube.q;
    const y = cube.r;
    return new Vector2(x, y);
}

export function add(a: Hex | HexCoordinates, b: Hex | HexCoordinates): Hex {
    return getOrCreateHexagon({ q: a.q + b.q, r: a.r + b.r, s: a.s + b.s }, true)!;
}

export function subtract(a: Hex | HexCoordinates, b: Hex | HexCoordinates): Hex {
    return getOrCreateHexagon({ q: a.q - b.q, r: a.r - b.r, s: a.s - b.s }, true)!;
}

export function multiply(a: Hex | HexCoordinates, k: number): Hex {
    return getOrCreateHexagon({ q: a.q * k, r: a.r * k, s: a.s * k }, true)!;
}

export function equals(a: Hex | HexCoordinates, b: Hex | HexCoordinates): boolean {
    return a.q === b.q && a.r === b.r && a.s === b.s;
}

export function length(a: Hex | HexCoordinates): number {
    return (Math.abs(a.q) + Math.abs(a.r) + Math.abs(a.s)) / 2;
}

export function distance(a: Hex | HexCoordinates, b: Hex | HexCoordinates): number {
    return length(subtract(a, b));
}

export function getNeighbor(hex: Hex, direction: HexCoordinates | number): Hex {
    if (typeof direction === "number") {
        direction = directions[direction];
    }
    return add(hex, direction);
}

export function getNeighbors(hex: Hex): Hex[] {
    let results: Hex[] = [];
    for (let i = 0; i < directions.length; i++) {
        results.push(getNeighbor(hex, i));
    }
    return results;
}

export function isNeighbor(a: Hex | HexCoordinates, b: Hex | HexCoordinates): boolean {
    return distance(a, b) === 1;
}

export function ring(hex: Hex, radius: number): Hex[] {
    let results: Hex[] = [];
    let current = add(hex, multiply(directions[4], radius));
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < radius; j++) {
            results.push(current);
            current = getNeighbor(current, i);
        }
    }
    return results;
}

export function range(hex: Hex, radius: number): Hex[] {
    let results: Hex[] = [];
    for (let i = 0; i <= radius; i++) {
        results = results.concat(ring(hex, i));
    }
    return results;
}

export function hexToPixel(layout: Layout, hex: Hex | HexCoordinates): Vector2 {
    const M = layout.orientation;
    const size = layout.size;
    const origin = layout.origin;
    const x = (M.f0 * hex.q + M.f1 * hex.r) * size.x;
    const y = (M.f2 * hex.q + M.f3 * hex.r) * size.y;
    return new Vector2(x + origin.x, y + origin.y);
}

export function pixelToHex(layout: Layout, p: Vector2): Hex | undefined {
    const M = layout.orientation;
    const size = layout.size;
    const origin = layout.origin;
    const pt = new Vector2((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
    const q = M.b0 * pt.x + M.b1 * pt.y;
    const r = M.b2 * pt.x + M.b3 * pt.y;
    return roundHex({ q: q, r: r, s: -q - r });
}

export function roundHex(hex: Hex | HexCoordinates): Hex | undefined {
    let q = Math.round(hex.q);
    let r = Math.round(hex.r);
    let s = Math.round(hex.s);
    const qDiff = Math.abs(q - hex.q);
    const rDiff = Math.abs(r - hex.r);
    const sDiff = Math.abs(s - hex.s);
    if (qDiff > rDiff && qDiff > sDiff) {
        q = -r - s;
    } else if (rDiff > sDiff) {
        r = -q - s;
    } else {
        s = -q - r;
    }
    return getOrCreateHexagon({ q: q, r: r, s: s })!;
}

/** Preload Angles Data for performance.
 	Because we are using a lot of Math.cos and Math.sin and they are expensive operations, we precalculate them and store them in an array.
 	We also only use the Pointy Orientation, so we dont need to recalculate them on the fly.
	##################################################################################################*/
const PI2: number = Math.PI * 2;

export const anglesCosSin = [
    new Vector2(Math.cos((PI2 * 0.5) / 6), Math.sin((PI2 * 0.5) / 6)),
    new Vector2(Math.cos((PI2 * -0.5) / 6), Math.sin((PI2 * -0.5) / 6)),
    new Vector2(Math.cos((PI2 * -1.5) / 6), Math.sin((PI2 * -1.5) / 6)),
    new Vector2(Math.cos((PI2 * -2.5) / 6), Math.sin((PI2 * -2.5) / 6)),
    new Vector2(Math.cos((PI2 * -3.5) / 6), Math.sin((PI2 * -3.5) / 6)),
    new Vector2(Math.cos((PI2 * -4.5) / 6), Math.sin((PI2 * -4.5) / 6)),
];

export function hexCornerOffset(layout: Layout, corner: number): Vector2 {
    const size = layout.size;
    return new Vector2(size.x * anglesCosSin[corner].x, size.y * anglesCosSin[corner].y);
}

/** ################################################################################################# */

export function polygonCorners(layout: Layout, hex: Hex | HexCoordinates): Vector2[] {
    const corners: Vector2[] = [];
    const center = hexToPixel(layout, hex);
    for (let i = 0; i < 6; i++) {
        const offset = hexCornerOffset(layout, i);
        corners.push(new Vector2(center.x + offset.x, center.y + offset.y));
    }
    return corners;
}

export function isHexInViewport(layout: Layout, hex: Hex | HexCoordinates): boolean {
    const corners = polygonCorners(layout, hex);
    for (let i = 0; i < corners.length; i++) {
        if (layout.isVectorInViewport(corners[i])) {
            return true;
        }
    }

    return false;
}

export function hexagonMap(mapRadius: number): Hex[] {
    let hexas: Hex[] = [];
    for (let q = -mapRadius; q <= mapRadius; q++) {
        let r1 = Math.max(-mapRadius, -q - mapRadius);
        let r2 = Math.min(mapRadius, -q + mapRadius);
        for (let r = r1; r <= r2; r++) {
            hexas.push(new Hex(q, r, -q - r));
        }
    }
    hexagons = hexas;
    return hexas;
}

export function outlineHexGroup(layout: Layout, hexagons: Hex[]): [Vector2, Vector2][] {
    let lines: [Vector2, Vector2][] = [];
    for (let i = 0; i < hexagons.length; i++) {
        let hex = hexagons[i];
        let neighbors = getNeighbors(hex);

        for (let j = 0; j < neighbors.length; j++) {
            let neighbor = neighbors[j];

            if (hexagons.indexOf(neighbor) === -1) {
                let hexCenter = hexToPixel(layout, hex);
                let offset = hexCornerOffset(layout, j);
                let offset1 = hexCornerOffset(layout, (j + 1) % 6);
                let p1 = new Vector2(hexCenter.x + offset.x, hexCenter.y + offset.y);
                let p2 = new Vector2(hexCenter.x + offset1.x, hexCenter.y + offset1.y);
                lines.push([p1, p2]);
            }
        }
    }
    return lines;
}
