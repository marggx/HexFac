import { Vector2 } from "./vector";

const sqrt3 = Math.sqrt(3);

interface Orientation {
    f0: number;
    f1: number;
    f2: number;
    f3: number;
    b0: number;
    b1: number;
    b2: number;
    b3: number;
    startAngle: number;
}

interface LayoutAttributes {
    orientation: Orientation;
    size: Vector2;
    origin: Vector2;
    viewport: Vector2;
}

export const orientation: Orientation = {
    f0: sqrt3,
    f1: sqrt3 / 2.0,
    f2: 0.0,
    f3: 3.0 / 2.0,
    b0: sqrt3 / 3.0,
    b1: -1.0 / 3.0,
    b2: 0.0,
    b3: 2.0 / 3.0,
    startAngle: 0.5,
};

export class Layout implements LayoutAttributes {
    public orientation: Orientation;
    public size: Vector2;
    public origin: Vector2;
    public viewport: Vector2;
    public changed: boolean = true;

    private maxSize: Vector2 = new Vector2(100, 100);
    private minSize: Vector2 = new Vector2(0, 0);

    constructor(orientation: Orientation, size: Vector2, maxSize?: number, minSize?: number) {
        this.orientation = orientation;
        this.size = size;

        if (maxSize) {
            this.maxSize = new Vector2(maxSize, maxSize);
        }

        if (minSize) {
            this.minSize = new Vector2(minSize, minSize);
        }

        let x = window.innerWidth;
        let y = window.innerHeight;

        this.origin = new Vector2(x / 2, y / 2);
        this.viewport = new Vector2(x + 10, y + 10);
    }

    public setOrigin(origin: Vector2): void {
        this.changed = true;
        this.origin = origin;
    }

    public setSize(size: Vector2): void {
        if (size.greaterThan(this.maxSize)) {
            return;
        } else if (size.lessThan(this.minSize)) {
            return;
        }
        this.changed = true;
        this.size = size;
    }

    public setOrientation(orientation: Orientation): void {
        this.changed = true;
        this.orientation = orientation;
    }

    public isVectorInViewport(vector: Vector2): boolean {
        return vector.greaterThan({ x: -10, y: -10 }) && vector.lessThan(this.viewport);
    }
}

export default Layout;
