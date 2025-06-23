import { Building } from "./building";

export interface MapTilesSetAttributes {
    type?: string;
    name?: string;
    tiles?: (new (...args: any[]) => Building)[];
    description?: string;
}

export default class MapTilesSet implements MapTilesSetAttributes {
    type?: string;
    name?: string;
    tiles?: (new (...args: any[]) => Building)[];
    description?: string;

    constructor(type?: string, name?: string, tiles?: (new (...args: any[]) => Building)[], description?: string) {
        this.type = type;
        this.name = name;
        this.tiles = tiles;
        this.description = description;
    }

    public clone(): MapTilesSet {
        return new MapTilesSet(this.type, this.name, this.tiles, this.description);
    }
}
