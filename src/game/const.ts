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

interface BuildingType {
    [index: string]: string[];
}


export const buildingTypeToImage: BuildingType = {
    forest: ["./../assets/img/forest.png"],
    rock: ["rock.png"],
    furnace: ["rock.png"],
};

export function loadImages(images: string[]) {
    let imgs: HTMLImageElement[] = [];
    for (let i = 0; i < images.length; i++) {
        let img = new Image();
        img.src = images[i];
        imgs.push(img);
    }
    return imgs;
}
