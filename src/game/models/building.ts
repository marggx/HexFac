import { buildingTypeToImage } from "../const";
import Hex from "./hex";
import { Item } from "./item";

export interface BuildingAttributes {
    type: string;
    level: number;
    image: string[];
    range: number;
    conenctToSameType: boolean;
    outputs?: Item;
    outputPerSec?: number;
    input?: Item;
    inputPerSec?: number;
    placableOn?: string[];
}

export class Building extends Hex implements BuildingAttributes {
    type: string;
    level: number;
    image: string[];
    range: number;
    conenctToSameType: boolean;
    outputs?: Item;
    outputPerSec?: number;
    input?: Item;
    inputPerSec?: number;
    placableOn?: string[];

    constructor(
        position: { q: number; r: number; s: number },
        type: string,
        image?: string | string[],
        level?: number,
        range?: number,
        conenctToSameType?: boolean,
        outputs?: Item,
        outputPerSec?: number,
        input?: Item,
        inputPerSec?: number,
        placableOn?: string[]
    ) {
        super(position.q, position.r, position.s);
        this.type = type;
        if (typeof image === "string") {
            this.image = [image];
        } else {
            this.image = image ?? buildingTypeToImage[type];
        }
        this.level = level ?? 1;
        this.range = range ?? 0;
        this.conenctToSameType = conenctToSameType ?? true;
        this.outputs = outputs;
        this.outputPerSec = outputPerSec;
        this.input = input;
        this.inputPerSec = inputPerSec;
        this.placableOn = placableOn;
    }

    public toJSON() {
        return {
            q: this.q,
            r: this.r,
            s: this.s,
            type: this.type,
            level: this.level,
        };
    }
}
