export interface HexCoordinates {
    q: number;
    r: number;
    s: number;
}

export interface HexAttributes {
    id: string;
    exists: boolean;
    update(deltaTime: number): void;
}

export class Hex implements HexCoordinates, HexAttributes {
    q: number;
    r: number;
    s: number;

    id: string;
    exists: boolean;

    constructor(q: number, r: number, s: number, exists: boolean = true) {
        if (Math.round(q + r + s) !== 0) throw "q + r + s must be 0";
        this.q = q;
        this.r = r;
        this.s = s;
        this.id = `${q}${r}${s}`;
        this.exists = exists;
    }

    public update(deltaTime: number) {}
}

export default Hex;
