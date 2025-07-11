import { Building } from "../building";
import { HexCoordinates } from "../hex";
import { Item } from "../item";
import WoodItem from "../items/wood";
import WoodRecipe from "../recipes/wood";

export default class Tree extends Building {
    constructor(postion?: HexCoordinates, level: number = 1, amount: number = 100) {
        super(
            "tree",
            postion,
            "tree",
            level,
            1,
            true,
            new WoodRecipe(),
            undefined,
            new Map<string, Item>([["wood", new WoodItem(amount)]])
        );
    }
}
