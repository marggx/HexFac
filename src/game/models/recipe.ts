import { Item } from "./item";

export interface RecipeAttributes {
    id: string;
    name: string;
    icon?: string;
    inputs: Item[];
    outputs: Item[];
}

export class Recipe implements RecipeAttributes {
    id: string;
    name: string;
    icon?: string;
    inputs: Item[];
    outputs: Item[];

    constructor(
        id: string,
        name: string,
        icon?: string,
        inputs?: Item[],
        outputs?: Item[]
    ) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.inputs = inputs ?? [];
        this.outputs = outputs ?? [];
    }
}
