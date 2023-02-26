import Hex from "./hex";
import { Item } from "./iterm";

export interface BuildingAttributes {
    type: string;
    level: number;
    range: number;
    conenctToSameType: boolean;
    outputs?: Item;
    outputPerSec?: number;
    input?: Item;
    inputPerSec?: number;
    placableOn?: [Building | Hex];
}

export class Building extends Hex implements BuildingAttributes {
    type: string;
    level: number;
    range: number;
    conenctToSameType: boolean;
    outputs?: Item;
    outputPerSec?: number;
    input?: Item;
    inputPerSec?: number;
    placableOn?: [Building | Hex];

    constructor(
        position: { q: number; r: number; s: number },
        type: string,
        level?: number,
        range?: number,
        conenctToSameType?: boolean,
        outputs?: Item,
        outputPerSec?: number,
        input?: Item,
        inputPerSec?: number,
        placableOn?: [Building | Hex]
    ) {
        super(position.q, position.r, position.s);
        this.type = type;
        this.level = level ?? 1;
        this.range = range ?? 0;
        this.conenctToSameType = conenctToSameType ?? true;
        this.outputs = outputs;
        this.outputPerSec = outputPerSec;
        this.input = input;
        this.inputPerSec = inputPerSec;
        this.placableOn = placableOn;
    }
}
