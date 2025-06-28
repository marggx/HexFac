const imageModules = import.meta.glob<{ default: string }>("@assets/img/*.{png,jpg,jpeg,gif,webp}", { eager: true });

const imageMap: Record<string, string[]> = {};

for (const path in imageModules) {
    const fileName = path.split("/").pop()!;
    const nameWithoutExt = fileName.replace(/\.[^/.]+$/, "");
    const baseName = nameWithoutExt.split("_")[0].toLowerCase();
    if (!imageMap[baseName]) imageMap[baseName] = [];
    imageMap[baseName].push(imageModules[path].default);
}

let imageCache: Record<string, HTMLImageElement> = {};

export function getImage(imageName: string): HTMLImageElement {
    const baseName = imageName.toLowerCase();
    const variants = imageMap[baseName];
    if (!variants || variants.length === 0) throw new Error(`Image ${imageName} not found`);
    const src = variants[Math.floor(Math.random() * variants.length)];
    if (imageCache[src]) {
        return imageCache[src];
    }
    const img = new Image();
    img.src = src;
    img.onload = () => {
        imageCache[src] = img;
    };
    return img;
}
