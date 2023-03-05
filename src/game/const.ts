export default {};

export const defaultSettings = {
    layout: {
        maxSize: 70,
        minSize: 15,
    },
};

export const defaultTiles = [
    "grass",
    "water",
    "sand",
    "stone",
    "dirt",
    "snow",
    "ice",
    "lava",
    "obsidian",
    "mud",
    "clay",
    "sandstone",
    "marble",
    "granite",
    "basalt",
];

export const defaultItems = ["iron", "copper", "coal", "wood", "stone"];

interface BuildingType {
    [index: string]: string[];
}
export const buildingTypeToImage: BuildingType = {
    forest: ["forest.png"],
    rock: ["rock.png"],
};
