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
	minSize: Vector2;
	maxSize: Vector2;
	origin: Vector2;
	minOrigin: Vector2;
	maxOrigin: Vector2;
}

export const pointyOrientation: Orientation = {
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
	public minSize: Vector2 = new Vector2(0, 0);
	public maxSize: Vector2 = new Vector2(0, 0);
	public minOrigin: Vector2 = new Vector2(0, 0);
	public maxOrigin: Vector2 = new Vector2(0, 0);

	constructor(orientation: Orientation, size: Vector2, origin: Vector2) {
		this.orientation = orientation;
		this.size = size;
		this.origin = origin;
	}

	public setOrigin(origin: Vector2): void {
		this.origin = origin;
	}

	public setSize(size: Vector2): void {
		this.size = size;
	}

	public setOrientation(orientation: Orientation): void {
		this.orientation = orientation;
	}

}

export default Layout;
