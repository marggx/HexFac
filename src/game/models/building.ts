import { floorToDigit } from "../../core/utils/numberUtils";
import { buildingTypeToImage } from "../const";
import Hex from "./hex";
import { Item } from "./item";
import { Recipe } from "./recipe";

export interface BuildingAttributes {
    type: string;
    level: number;
    image: string[];
    range: number;
    conenctToSameType: boolean;
    updateable: boolean;
    outputs?: Item;
    outputPerSec?: number;
    input?: Item;
    inputPerSec?: number;
    placableOn?: string[];
}

export class Building extends Hex implements BuildingAttributes {
    type: string;
    level: number;
    image: [string];
    range: number;
    conenctToSameType: boolean;
    updateable: boolean = false;
    recipe?: Recipe;
    placableOn?: [string];

    publicStorage: Map<string, Item> = new Map();
    publicStorageChange: Map<string, [number, number]> = new Map();
    publicStoragePS: Map<string, number> = new Map();

    privateStorage: Map<string, Item> = new Map();

    isHighlighted: boolean = false;

    constructor(
        position: { q: number; r: number; s: number },
        type: string,
        image?: string | [string],
        level?: number,
        range?: number,
        conenctToSameType?: boolean,
        recipe?: Recipe,
        placableOn?: [string]
    ) {
        super(position.q, position.r, position.s);
        this.type = type;
        if (typeof image === "string") {
            this.image = [image];
        } else {
            // @ts-ignore
            this.image = image ?? buildingTypeToImage[type];
        }
        this.level = level ?? 1;
        this.range = range ?? 0;
        this.conenctToSameType = conenctToSameType ?? true;
        this.recipe = recipe;
        this.placableOn = placableOn;
        if (recipe) {
            this.setRecipe(recipe);
        }
    }

    public setRecipe(recipe: Recipe) {
        this.recipe = recipe;
        this.updateable = true;
        this.recipe.outputs.forEach((item: Item) => {
            let sItem = item.clone();
            sItem.value = 0;
            this.publicStorage.set(sItem.type, sItem);
        });
        this.recipe.inputs.forEach((item: Item) => {
            let sItem = item.clone();
            sItem.value = 0;
            this.privateStorage.set(sItem.type, sItem);
        });
    }

    public update(deltaTime: number, nearbyBuildings: Building[]) {
        this.getRecipeInputFromNearbyBuildings(nearbyBuildings);
        this.setStorageBasedOnRecipe(deltaTime);
    }

    setStorageBasedOnRecipe(deltaTime: number) {
        let allInputsAvailable = true;
        const inputs = this.recipe!.inputs;
        const outputs = this.recipe!.outputs;
        for (let i = 0; i < inputs.length; i++) {
            if (this.privateStorage.get(inputs[i].type)?.value! >= inputs[i].value) {
                allInputsAvailable = true;
            } else {
                allInputsAvailable = false;
                break;
            }
        }

        if (!allInputsAvailable) {
            this.addDeltaToChange(0, deltaTime, null);
            return;
        }

        for (let i = 0; i < outputs.length; i++) {
            let item = outputs[i];
            let storage = this.publicStorage.get(item.type);

            if (!storage) return; // * INFO this should never happen

            let change = deltaTime * item.value;
            storage.value += change;

            this.addDeltaToChange(change, deltaTime, item.type);
        }

        for (let i = 0; i < inputs.length; i++) {
            let item = inputs[i];
            let storage = this.privateStorage.get(item.type);

            if (!storage) return; // * INFO this should never happen

            storage.value -= deltaTime * item.value;
        }
    }

    addDeltaToChange(change: number, deltaTime: number, type: string | null) {
        if (!this.isHighlighted) return;
        if (type) {
            let current = this.publicStorageChange.get(type);
            if (!current) {
                this.publicStorageChange.set(type, [change, deltaTime]);
            } else {
                current[0] += change;
                current[1] += deltaTime;
                if (current[1] >= 1) {
                    this.publicStoragePS.set(type, floorToDigit(current[0], 2));
                    current[0] = 0;
                    current[1] = 0;
                }
            }
        } else {
            for (let i = 0; i < this.recipe!.outputs.length; i++) {
                let item = this.recipe!.inputs[i];
                let current = this.publicStorageChange.get(item.type);
                if (!current) {
                    this.publicStorageChange.set(item.type, [change, deltaTime]);
                } else {
                    current[0] += change;
                    current[1] += deltaTime;
                    if (current[1] >= 1) {
                        this.publicStoragePS.set(item.type, floorToDigit(current[0], 2));
                        current[0] = 0;
                        current[1] = 0;
                    }
                }
            }
        }
    }

    getRecipeInputFromNearbyBuildings(nearbyBuildings: Building[]) {
        for (let i = 0; i < this.recipe!.inputs.length; i++) {
            let item = this.recipe!.inputs[i];
            let privareStorageValue = this.privateStorage.get(item.type)!.value;
            if (privareStorageValue >= this.recipe!.inputs[i].value) continue;

            for (let j = 0; j < nearbyBuildings.length; j++) {
                if (!(nearbyBuildings[j] instanceof Building)) continue;

                let storage = nearbyBuildings[j].publicStorage.get(item.type);
                if (!storage) continue;

                let min = Math.min(item.value, storage.value);
                privareStorageValue += min;
                storage.value -= min;

                this.addDeltaToChange(-min, 0, item.type);

                if (privareStorageValue >= item.value) {
                    break;
                }
            }
        }
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
