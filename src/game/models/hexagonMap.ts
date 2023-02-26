import alea from "alea";
import { createNoise2D } from "simplex-noise";
import Layout from "../../core/models/layout";
import { Vector2, Vector2Attributes } from "../../core/models/vector";
import { Building } from "./building";
import Hex, { HexCoordinates } from "./hex";
import { clearCanvas, drawImage, drawLines, drawPolygon, resizeCanvas } from "./../../core/render/canvas";

let imgs = [
    "./../../../src/img/grass_12.png",
    "./../../../src/img/grass_13.png",
    "./../../../src/img/grass_14.png",
    "./../../../src/img/grass_15.png",
    "./../../../src/img/grass_16.png",
    "./../../../src/img/dirt_13.png",
    "./../../../src/img/dirt_14.png",
    "./../../../src/img/dirt_15.png",
    "./../../../src/img/dirt_16.png",
    "./../../../src/img/dirt_17.png",
];

export class HexagonMap {
    private hexagons: Building[] = [];
    private directions: HexCoordinates[] = [
        { q: 1, r: 0, s: -1 },
        { q: 1, r: -1, s: 0 },
        { q: 0, r: -1, s: 1 },
        { q: -1, r: 0, s: 1 },
        { q: -1, r: 1, s: 0 },
        { q: 0, r: 1, s: -1 },
    ];

    private PI2: number = Math.PI * 2;
    private anglesCosSin = [
        new Vector2(Math.cos((this.PI2 * 0.5) / 6), Math.sin((this.PI2 * 0.5) / 6)),
        new Vector2(Math.cos((this.PI2 * -0.5) / 6), Math.sin((this.PI2 * -0.5) / 6)),
        new Vector2(Math.cos((this.PI2 * -1.5) / 6), Math.sin((this.PI2 * -1.5) / 6)),
        new Vector2(Math.cos((this.PI2 * -2.5) / 6), Math.sin((this.PI2 * -2.5) / 6)),
        new Vector2(Math.cos((this.PI2 * -3.5) / 6), Math.sin((this.PI2 * -3.5) / 6)),
        new Vector2(Math.cos((this.PI2 * -4.5) / 6), Math.sin((this.PI2 * -4.5) / 6)),
    ];

    constructor(radius: number) {
        let prng = alea("HarryPotter");
        let noise2D = createNoise2D(prng);
        for (let q = -radius; q <= radius; q++) {
            const r1 = Math.max(-radius, -q - radius);
            const r2 = Math.min(radius, -q + radius);
            for (let r = r1; r <= r2; r++) {
                let imgn = imgs[Math.floor(Math.abs(noise2D(-q, r)) * 10)];
                this.hexagons.push(new Building({ q: q, r: r, s: -q - r }, imgn));
            }
        }
    }

    public update(deltaTime: number) {
        for (let i = 0; i < this.hexagons.length; i++) {
            this.hexagons[i].update(deltaTime);
        }
    }

    public draw(layout: Layout) {
        for (let i = 0; i < this.hexagons.length; i++) {
            drawImage(this.hexToPixel(layout, this.hexagons[i]), layout.size.x, layout.size.y, this.hexagons[i].type);
            drawPolygon(this.polygonCorners(layout, this.hexagons[i]), null, "darkgray", 1);
        }
    }

    public getHexagons(): Building[] {
        return this.hexagons;
    }

    public getHexagon(id: string): Building | undefined {
        for (let i = 0; i < this.hexagons.length; i++) {
            const hex = this.hexagons[i];
            if (hex.id === id) {
                return hex;
            }
        }
        return undefined;
    }

    public getHexagonByCords(cords: HexCoordinates): Building | undefined {
        for (let i = 0; i < this.hexagons.length; i++) {
            const hex = this.hexagons[i];
            if (this.equals(hex, cords)) {
                return hex;
            }
        }
        return undefined;
    }

    public axialToCube(axial: Vector2): HexCoordinates {
        const q = axial.x;
        const r = axial.y;
        const s = -q - r;
        return { q, r, s };
    }

    public cubeToAxial(cube: HexCoordinates): Vector2 {
        const x = cube.q;
        const y = cube.r;
        return new Vector2(x, y);
    }

    public add(a: Hex | HexCoordinates, b: Hex | HexCoordinates, create: boolean = false): Hex | undefined {
        let hex: Hex | undefined = this.getHexagonByCords({ q: a.q + b.q, r: a.r + b.r, s: a.s + b.s });
        if (!hex && create) {
            hex = new Hex(a.q + b.q, a.r + b.r, a.s + b.s, false);
        }
        return hex;
    }

    public subtract(a: Hex | HexCoordinates, b: Hex | HexCoordinates, create: boolean = false): Hex | undefined {
        let hex: Hex | undefined = this.getHexagonByCords({ q: a.q - b.q, r: a.r - b.r, s: a.s - b.s });
        if (!hex && create) {
            hex = new Hex(a.q - b.q, a.r - b.r, a.s - b.s, false);
        }
        return hex;
    }

    public multiply(a: Hex | HexCoordinates, k: number, create: boolean = false): Hex | undefined {
        let hex: Hex | undefined = this.getHexagonByCords({ q: a.q * k, r: a.r * k, s: a.s * k });
        if (!hex && create) {
            hex = new Hex(a.q * k, a.r * k, a.s * k, false);
        }
        return hex;
    }

    public equals(a: Hex | HexCoordinates, b: Hex | HexCoordinates): boolean {
        return a.q === b.q && a.r === b.r && a.s === b.s;
    }

    public length(a: Hex | HexCoordinates): number {
        return (Math.abs(a.q) + Math.abs(a.r) + Math.abs(a.s)) / 2;
    }

    public distance(a: Hex | HexCoordinates, b: Hex | HexCoordinates): number {
        let sub = this.subtract(a, b);
        if (sub) {
            return this.length(sub);
        }
        return 1;
    }

    public getNeighbor(hex: Hex, direction: HexCoordinates | number, create: boolean = false): Hex | undefined {
        if (typeof direction === "number") {
            direction = this.directions[direction];
        }
        return this.add(hex, direction, create);
    }

    public getNeighbors(hex: Hex): (Hex | undefined)[] {
        let results: (Hex | undefined)[] = [];
        for (let i = 0; i < this.directions.length; i++) {
            let neighbor = this.getNeighbor(hex, i);
            results.push(neighbor);
        }
        return results;
    }

    public isNeighbor(a: Hex | HexCoordinates, b: Hex | HexCoordinates): boolean {
        return this.distance(a, b) === 1;
    }

    public ring(hex: Hex, radius: number): Hex[] {
        let results: Hex[] = [];
        let current = this.add(hex, this.multiply(this.directions[4], radius, true)!, true)!;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < radius; j++) {
                if (current.exists) {
                    results.push(current);
                    current = this.getNeighbor(current, i, true)!;
                } else {
                    current = this.getNeighbor(current, i, true)!;
                }
            }
        }
        return results;
    }

    public range(hex: Hex, radius: number): Hex[] {
        let results: Hex[] = [];
        for (let i = 0; i <= radius; i++) {
            results = results.concat(this.ring(hex, i));
        }
        return results;
    }

    public hexToPixel(layout: Layout, hex: Hex | HexCoordinates): Vector2 {
        const M = layout.orientation;
        const size = layout.size;
        const origin = layout.origin;
        const x = (M.f0 * hex.q + M.f1 * hex.r) * size.x;
        const y = (M.f2 * hex.q + M.f3 * hex.r) * size.y;
        return new Vector2(x + origin.x, y + origin.y);
    }

    public pixelToHex(layout: Layout, p: Vector2 | Vector2Attributes): Hex | undefined {
        const M = layout.orientation;
        const size = layout.size;
        const origin = layout.origin;
        const pt = new Vector2((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
        const q = M.b0 * pt.x + M.b1 * pt.y;
        const r = M.b2 * pt.x + M.b3 * pt.y;
        return this.roundHex({ q: q, r: r, s: -q - r });
    }

    public roundHex(hex: Hex | HexCoordinates): Hex | undefined {
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
        return this.getHexagonByCords({ q: q, r: r, s: s });
    }

    public hexCornerOffset(layout: Layout, corner: number): Vector2 {
        const size = layout.size;
        return new Vector2(size.x * this.anglesCosSin[corner].x, size.y * this.anglesCosSin[corner].y);
    }

    public polygonCorners(layout: Layout, hex: Hex | HexCoordinates): Vector2[] {
        const corners: Vector2[] = [];
        const center = this.hexToPixel(layout, hex);
        for (let i = 0; i < 6; i++) {
            const offset = this.hexCornerOffset(layout, i);
            corners.push(offset.add(center));
        }
        return corners;
    }

    public isHexInViewport(layout: Layout, hex: Hex | HexCoordinates): boolean {
        const corners = this.polygonCorners(layout, hex);
        for (let i = 0; i < corners.length; i++) {
            if (layout.isVectorInViewport(corners[i])) {
                return true;
            }
        }

        return false;
    }

    public outlineHexGroup(layout: Layout, hexagons: Hex[]): [Vector2, Vector2][] {
        let lines: [Vector2, Vector2][] = [];
        for (let i = 0; i < hexagons.length; i++) {
            let hex = hexagons[i];
            let neighbors = this.getNeighbors(hex);

            for (let j = 0; j < neighbors.length; j++) {
                let neighbor = neighbors[j];

                if (!neighbor || hexagons.indexOf(neighbor) === -1) {
                    let hexCenter = this.hexToPixel(layout, hex);
                    let offset = this.hexCornerOffset(layout, j);
                    let offset1 = this.hexCornerOffset(layout, (j + 1) % 6);
                    let p1 = new Vector2(hexCenter.x + offset.x, hexCenter.y + offset.y);
                    let p2 = new Vector2(hexCenter.x + offset1.x, hexCenter.y + offset1.y);
                    lines.push([p1, p2]);
                }
            }
        }
        return lines;
    }
}

export default HexagonMap;
