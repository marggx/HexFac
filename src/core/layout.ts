import { Vector2 } from "./utils/vector";

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
	changed: boolean;
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
	public changed: boolean = true;

	constructor(orientation: Orientation, size: Vector2, origin: Vector2) {
		this.orientation = orientation;
		this.size = size;
		this.origin = origin;
	}

	public setOrigin(origin: Vector2): void {
		this.changed = true;
		this.origin = origin;
	}

	public setSize(size: Vector2): void {
		this.changed = true;
		this.size = size;
	}

	public setOrientation(orientation: Orientation): void {
		this.changed = true;
		this.orientation = orientation;
	}
}

export default Layout;
