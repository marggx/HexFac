import { Building } from "../building";
import { HexCoordinates } from "../hex";
import { Item } from "../item";
import WoodRecipe from "../recipes/wood";
import WoodItem from "../items/wood";

export default class Tree extends Building {
    constructor(postion?: HexCoordinates, level: number = 1, woodAmount?: number) {
        super(
            "tree",
            postion,
            "tree",
            level,
            1,
            true,
            new WoodRecipe(),
            undefined,
            new Map<string, Item>([["wood", new WoodItem(woodAmount)]])
        );
    }
}
