import { Building } from "../building";
import { HexCoordinates } from "../hex";
import { Recipe } from "../recipe";
import WoodToCoal from "../recipes/woodToCoal";

export default class Furnace extends Building {
    constructor(postion?: HexCoordinates, level: number = 1, recipe?: Recipe) {
        super("furnace", postion, "furnace", level, 1, true, recipe ?? new WoodToCoal());
    }
}
