import Wood from "../items/wood";
import { Recipe } from "../recipe";

export default class WoodRecipe extends Recipe {
    constructor() {
        super("wood", "Wood", "wood", [], [new Wood()]);
    }
}
