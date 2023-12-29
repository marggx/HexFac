import Coal from "../items/coal";
import Iron from "../items/iron";
import IronOre from "../items/ironOre";
import { Recipe } from "../recipe";

export default class IronOreToIron extends Recipe {
    constructor() {
        super("IronOreToIron", "Iron Ore to Iron", "iron", [new IronOre(), new Coal()], [new Iron()]);
    }
}
