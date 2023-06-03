import { Building } from "../building";
import { HexCoordinates } from "../hex";
import WoodToPlanks from "../recipes/woodToPlanks";

export default class Sawmill extends Building {
    constructor(postion: HexCoordinates, level: number = 1) {
        super(postion, "sawmill", "sawmill", level, 1, true, new WoodToPlanks(), ["forest"], 10);
    }
}
