export interface Vector2Attributes {
    x: number;
    y: number;
}
export class Vector2 implements Vector2Attributes {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public add(v: Vector2 | Vector2Attributes): Vector2 {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    public subtract(v: Vector2 | Vector2Attributes): Vector2 {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    public multiply(k: number): Vector2 {
        return new Vector2(this.x * k, this.y * k);
    }

    public equal(v: Vector2 | Vector2Attributes): boolean {
        return Math.round(this.x) === Math.round(v.x) && Math.round(this.y) === Math.round(v.y);
    }

    public greaterThan(v: Vector2 | Vector2Attributes): boolean {
        return this.x > v.x && this.y > v.y;
    }

    public lessThan(v: Vector2 | Vector2Attributes): boolean {
        return this.x < v.x && this.y < v.y;
    }

    public toString(): string {
        return `(${this.x}, ${this.y})`;
    }
}

export class Vector3 {
    public x: number;
    public y: number;
    public z: number;
    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
