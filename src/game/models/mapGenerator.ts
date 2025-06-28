import alea from "alea";
import { createNoise2D } from "simplex-noise";
import HexagonMap from "./hexagonMap";
import MapTilesSet from "./mapTileSet";
import { Building } from "./building";
const tileSetModules = import.meta.glob<{ default: typeof MapTilesSet }>("./maps/*.ts", { eager: true });

const mapTileSets: Record<string, typeof MapTilesSet> = {};
for (const path in tileSetModules) {
    const match = path.match(/\.\/maps\/(.*)\.ts$/);

    if (!match) {
        console.warn(`Could not extract name from path: ${path}`);
        continue;
    }
    const name = match[1];
    mapTileSets[name] = tileSetModules[path].default;
}

export default function generateMap(type: string = "default", size: number = 10, seed: string = ""): HexagonMap {
    const TilesetClass = mapTileSets[type];
    if (!TilesetClass) {
        throw new Error(`Tileset "${type}" not found.`);
    }
    const tileset = new TilesetClass();

    let tiles = tileset.tiles;
    if (!tiles || tiles.length === 0) {
        throw new Error(`Tileset "${type}" does not have any start buildings defined.`);
    }
    tiles = extendTileArray(tiles, 10);
    tiles = tiles.sort(() => Math.random() - 0.5);
    console.log(tiles);

    let tilesCount = tiles.length;
    let prng = alea(seed);
    let noise2D = createNoise2D(prng);
    let hexagons = new Map<string, Building>();

    for (let q = -size; q <= size; q++) {
        const r1 = Math.max(-size, -q - size);
        const r2 = Math.min(size, -q + size);
        for (let r = r1; r <= r2; r++) {
            const tileIdx = Math.floor(Math.abs(noise2D(q, r)) * tilesCount) % tilesCount;
            console.log(`Generating tile at q: ${q}, r: ${r}, tileIdx: ${tileIdx}`);
            console.log((Math.abs(noise2D(q, r)) * tilesCount) % tilesCount);
            const Tile = tiles[tileIdx];
            hexagons.set(q + "_" + r + "_" + (-q - r), new Tile({ q, r, s: -q - r }));
        }
    }

    return new HexagonMap(seed, hexagons);
}

function extendTileArray(
    tiles: (new (...args: any[]) => Building)[],
    minSize: number
): (new (...args: any[]) => Building)[] {
    const tilesCount = tiles.length;
    if (tilesCount >= minSize) return tiles;

    const additionalTiles = Math.max(minSize - tilesCount, 0);
    for (let i = 0; i < additionalTiles; i++) {
        const tileIdx = Math.floor(Math.random() * tilesCount) % tilesCount;
        const Tile = tiles[tileIdx];
        tiles.push(Tile);
    }
    return tiles;
}
