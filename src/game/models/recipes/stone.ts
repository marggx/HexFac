import Stone from "../items/stone";
import { Recipe } from "../recipe";

export default class StoneRecipe extends Recipe {
    constructor() {
        super("stone", "Stone", "stone", [], [new Stone(0)]);
    }
}
