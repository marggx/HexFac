import { roundToDigit } from "../../core/utils/numberUtils";
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
    publicStorageCapacity: number = 100;
    privateStorage: Map<string, Item> = new Map();

    constructor(
        position: { q: number; r: number; s: number },
        type: string,
        image?: string | [string],
        level?: number,
        range?: number,
        conenctToSameType?: boolean,
        recipe?: Recipe,
        placableOn?: [string],
        storageCapacity?: number
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
        this.recipe = recipe;
        this.placableOn = placableOn;
        this.publicStorageCapacity = storageCapacity ?? this.publicStorageCapacity;
        if (this.recipe) {
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
    }

    public update(deltaTime: number, nearbyBuildings: Building[]) {
        this.getRecipeInputFromNearbyBuildings(deltaTime, nearbyBuildings);
        this.setStorageBasedOnRecipe(deltaTime);
    }

    setStorageBasedOnRecipe(deltaTime: number) {
        let allInputsAvailable = true;
        for (let i = 0; i < this.recipe!.inputs.length; i++) {
            if (this.privateStorage.get(this.recipe!.inputs[i].type)?.value! >= this.recipe!.inputs[i].value) {
                allInputsAvailable = true;
            } else {
                allInputsAvailable = false;
                break;
            }
        }

        if (!allInputsAvailable) return;

        for (let i = 0; i < this.recipe!.inputs.length; i++) {
            this.privateStorage.get(this.recipe!.inputs[i].type)!.value -= this.recipe!.inputs[i].value;
        }

        for (let i = 0; i < this.recipe!.outputs.length; i++) {
            if (this.recipe!.inputs.length === 0) {
                this.publicStorage.get(this.recipe!.outputs[i].type)!.value += roundToDigit(
                    this.recipe!.outputs[i].value * deltaTime,
                    2
                );
                continue;
            }
            this.publicStorage.get(this.recipe!.outputs[i].type)!.value += this.recipe!.outputs[i].value;
        }
    }

    getRecipeInputFromNearbyBuildings(deltaTime: number, nearbyBuildings: Building[]) {
        for (let i = 0; i < this.recipe!.inputs.length; i++) {
            for (let j = 0; j < nearbyBuildings.length; j++) {
                if (!(nearbyBuildings[j] instanceof Building)) continue;

                let item = this.recipe!.inputs[i];
                let storage = nearbyBuildings[j].publicStorage.get(item.type);
                if (!storage) continue;

                let min = roundToDigit(Math.min(item.value * deltaTime, storage.value * deltaTime), 2);
                this.privateStorage.get(item.type)!.value += min;
                storage.value -= min;

                if (this.privateStorage.get(item.type)!.value >= item.value) {
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
