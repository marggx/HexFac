export interface Vector2Attributes {
    x: number;
    y: number;
    maxY?: number;
    minY?: number;
    maxX?: number;
    minX?: number;
}
export class Vector2 implements Vector2Attributes {
    public x: number;
    public y: number;
    public maxY?: number;
    public minY?: number;
    public maxX?: number;
    public minX?: number;

    constructor(x: number, y: number, max?: number, min?: number) {
        this.x = x;
        this.y = y;
        this.maxX = max;
        this.maxY = max;
        this.minX = min;
        this.minY = min;
    }

    public add(v: Vector2 | Vector2Attributes): Vector2 {
        this.x = this.maxX ? Math.min(this.x + v.x, this.maxX) : this.x + v.x;
        this.y = this.maxY ? Math.min(this.y + v.y, this.maxY) : this.y + v.y;
        this.x = this.minX ? Math.max(this.x, this.minX) : this.x;
        this.y = this.minY ? Math.max(this.y, this.minY) : this.y;
        return this;
    }

    public subtract(v: Vector2 | Vector2Attributes): Vector2 {
        this.x = this.minX ? Math.max(this.x - v.x, this.minX) : this.x - v.x;
        this.y = this.minY ? Math.max(this.y - v.y, this.minY) : this.y - v.y;
        this.x = this.maxX ? Math.min(this.x, this.maxX) : this.x;
        this.y = this.maxY ? Math.min(this.y, this.maxY) : this.y;
        return this;
    }

    public multiply(k: number): Vector2 {
        this.x *= k;
        this.y *= k;
        return this;
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

    public difference(v: Vector2 | Vector2Attributes): Vector2 {
        return new Vector2(Math.abs(this.x - v.x), Math.abs(this.y - v.y));
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
