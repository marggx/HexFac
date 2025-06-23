import Tree from "../buildings/tree";
import MapTilesSet from "../mapTileSet";

export default class DefaultTileSet extends MapTilesSet {
    constructor() {
        super("default", "Default Tileset", [Tree], "A basic set of map tiles for testing and development purposes.");
    }
}
