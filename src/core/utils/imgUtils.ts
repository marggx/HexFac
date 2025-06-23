import grass_13 from "@assets/img/grass_13.png";
import grass_14 from "@assets/img/grass_14.png";
import grass_15 from "@assets/img/grass_15.png";
import grass_16 from "@assets/img/grass_16.png";
import dirt_13 from "@assets/img/dirt_13.png";
import dirt_14 from "@assets/img/dirt_14.png";
import dirt_15 from "@assets/img/dirt_15.png";
import dirt_16 from "@assets/img/dirt_16.png";
import dirt_17 from "@assets/img/dirt_17.png";
import Tree from "@assets/img/Tree.png";

const imageMap: Record<string, string> = {
    grass_13,
    grass_14,
    grass_15,
    grass_16,
    dirt_13,
    dirt_14,
    dirt_15,
    dirt_16,
    dirt_17,
    tree: Tree,
};

let imageCache: Record<string, HTMLImageElement> = {};

export function getImage(imageName: string): HTMLImageElement {
    if (imageCache[imageName]) {
        return imageCache[imageName];
    }
    const src = imageMap[imageName];
    if (!src) throw new Error(`Image ${imageName} not found`);
    const img = new Image();
    img.src = src;
    img.onload = () => {
        imageCache[imageName] = img;
    };
    return img;
}
