import { Building } from "../building";
import { HexCoordinates } from "../hex";
import { Item } from "../item";
import StoneItem from "../items/stone";
import StoneRecipe from "../recipes/stone";

export default class Rock extends Building {
    constructor(postion?: HexCoordinates, level: number = 1, amount: number = 100) {
        let item = new StoneItem(amount);
        super(
            "rock",
            postion,
            "rock",
            level,
            1,
            true,
            new StoneRecipe(),
            undefined,
            new Map<string, Item>([[item.type, item]])
        );
    }
}
