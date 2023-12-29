import Coal from "../items/coal";
import Wood from "../items/wood";
import { Recipe } from "../recipe";

export default class WoodToCoal extends Recipe {
    constructor() {
        super("WoodToCoal", "Wood to Coal", "coal", [new Wood()], [new Coal()]);
    }
}
