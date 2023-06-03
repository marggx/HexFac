import Plank from "../items/plank";
import Wood from "../items/wood";
import { Recipe } from "../recipe";

export default class WoodToPlanks extends Recipe {
    constructor() {
        super("woodToPlanks", "Wood to Planks", "Converts 1 wood to 1 plank", "wood", 0, [new Wood()], [new Plank()]);
    }
}
