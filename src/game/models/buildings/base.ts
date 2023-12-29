import { Building } from "../building";
import { HexCoordinates } from "../hex";

export default class Base extends Building {
    constructor(postion: HexCoordinates, level: number = 1) {
        super(postion, "base", "base", level, 1, true);
    }
}
