export interface HexCoordinates {
    q: number;
    r: number;
    s: number;
}

export interface HexAttributes {
    id: string;
    type: string | null;
}

export class Hex implements HexCoordinates, HexAttributes {
    q: number;
    r: number;
    s: number;

    id: string;
    type: string | null;

    constructor(q: number, r: number, s: number, type: string | null = null) {
        if (Math.round(q + r + s) !== 0) throw "q + r + s must be 0";
        this.q = q;
        this.r = r;
        this.s = s;
        this.id = `${q}${r}${s}`;
        this.type = type;
    }
}

export let hexagons: Hex[] = [];

export default Hex;
