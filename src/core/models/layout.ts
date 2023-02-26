import { Vector2, Vector2Attributes } from "./vector";

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
    center: Vector2;
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
    public center: Vector2;

    constructor(orientation: Orientation, size: Vector2Attributes, maxSize?: number, minSize?: number) {
        this.orientation = orientation;

        this.size = new Vector2(size.x, size.y, maxSize, minSize);

        let x = window.innerWidth;
        let y = window.innerHeight;

        this.origin = new Vector2(x / 2, y / 2);
        this.viewport = new Vector2(x, y);
        this.center = new Vector2(x / 2, y / 2);
    }

    public setOrientation(orientation: Orientation): void {
        this.changed = true;
        this.orientation = orientation;
    }

    public isVectorInViewport(vector: Vector2): boolean {
        return (
            vector.greaterThan({ x: -10, y: -10 }) &&
            vector.lessThan({ x: this.viewport.x + 10, y: this.viewport.y + 10 })
        );
    }
}

export default Layout;
