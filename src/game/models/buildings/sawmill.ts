import { Building } from "../building";
import { HexCoordinates } from "../hex";

export default class Sawmill extends Building {
    constructor(postion: HexCoordinates, level: number = 1) {
        super(postion, "sawmill", "sawmill", level, 1, true, undefined, undefined, undefined, undefined, ["forest"]);
    }
}
