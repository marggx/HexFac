import { Item } from "./item";

export interface RecipeAttributes {
    id: string;
    name?: string;
    description?: string;
    icon?: string;
    time: number;
    inputs: Item[];
    outputs: Item[];
}

export class Recipe implements RecipeAttributes {
    id: string;
    name?: string;
    description?: string;
    icon?: string;
    time: number;
    inputs: Item[];
    outputs: Item[];

    constructor(
        id: string,
        name?: string,
        description?: string,
        icon?: string,
        time?: number,
        inputs?: Item[],
        outputs?: Item[]
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.icon = icon;
        this.time = time ?? 1;
        this.inputs = inputs ?? [];
        this.outputs = outputs ?? [];
    }
}
