import { Vector2, Vector2Attributes } from "../../core/models/vector";
import { loadObject, saveObject } from "../../core/save";
import { getSetting, loadSettings } from "../../core/settings";
import Hex from "../models/hex";
import HexagonMap from "../models/hexagonMap";
import { clearCanvas, drawLines, drawPolygon, resizeCanvas } from "./../../core/render/canvas";
import { initialize } from "./../../game/core/events";
import Layout, { orientation } from "./layout";
import LoadingScreen from "./loadingScreen";

export default class Game {
    private layout: Layout;
    private hexMap = new HexagonMap(20);
    private secondsPassed: number = 0;
    private oldTimeStamp: number = 0;
    private tapedHex: Hex | undefined = undefined;
    private highlightedHex: Hex | undefined = undefined;
    private tap: DOMHighResTimeStamp = 0;

    constructor() {
        let loading = new LoadingScreen(15);

        loadSettings();
        loading.stepLoadingScreen(5, "Loading settings");
        this.layout = new Layout(
            orientation,
            new Vector2(20, 20),
            getSetting("layout.maxSize"),
            getSetting("layout.minSize")
        );

        loading.stepLoadingScreen(1, "Layout");

        loading.stepLoadingScreen(1, "noise");

        initialize({ game: this });

        loading.stepLoadingScreen(15, "start");

        this.init();
    }

    private init() {
        resizeCanvas(
            document.querySelector<HTMLCanvasElement>("#game")!,
            document.querySelector<HTMLCanvasElement>("#game")!.getContext("2d")!
        );
        this.gameLoop(0);
    }

    private draw(deltaTime) {
        this.hexMap.draw(this.layout);
        if (this.highlightedHex) {
            let ring = this.hexMap.range(this.highlightedHex, 1);
            drawLines(this.hexMap.outlineHexGroup(this.layout, ring), "darkgreen", 2);
            for (let hex of ring) {
                drawPolygon(
                    this.hexMap.polygonCorners(this.layout, hex),
                    "rgba(0, 200, 0, 0.5)",
                    "rgba(0, 0, 200, 0)",
                    1
                );
            }
            drawPolygon(
                this.hexMap.polygonCorners(this.layout, this.highlightedHex),
                "rgba(0, 0, 200, 0.5)",
                "rgba(0, 0, 200, 0)",
                1
            );
        }
    }

    public gameLoop(timeStamp: DOMHighResTimeStamp) {
        let deltaTime = Math.min(timeStamp - this.oldTimeStamp, 100) / 1000;

        this.secondsPassed += deltaTime;
        if (this.secondsPassed > 0.03) {
            this.secondsPassed = 0.001;
            clearCanvas();
            this.draw(deltaTime);
        }

        this.oldTimeStamp = timeStamp;

        window.requestAnimationFrame((t) => this.gameLoop(t));
    }

    public async save() {
        let now = performance.now();
        let save = {
            layout: this.layout,
            hexMap: this.hexMap,
        };
        saveObject("save", save);
        console.log("save took " + (performance.now() - now) + "ms");
    }

    public async load() {
        let now = performance.now();
        let save = loadObject("save");
        console.log(save);
        console.log("save took " + (performance.now() - now) + "ms");
    }

    public zoom(factor: Vector2) {
        let hexAtCenter = this.hexMap.pixelToHex(this.layout, this.layout.center);
        this.layout.size.add(factor);
        if (hexAtCenter) {
            let newPosition = this.hexMap.hexToPixel(this.layout, hexAtCenter);
            this.layout.origin.add({
                x: this.layout.center.x - newPosition.x,
                y: this.layout.center.y - newPosition.y,
            });
        }
    }

    public async tapDown(position: Vector2 | Vector2Attributes | undefined) {
        this.tap = performance.now();
        if (!position) return;
        this.tapedHex = this.hexMap.pixelToHex(this.layout, position);
        this.save();
    }

    public async tapUp(position: Vector2 | Vector2Attributes | undefined) {
        this.tap = 0;
        this.load();
        if (!this.tapedHex) return;
        this.highlightedHex = this.tapedHex;
    }

    public async tapMove(position: Vector2 | Vector2Attributes | undefined) {
        if (!this.tap) return;
        if (!position) return;
        this.layout.origin.add({ x: position.x, y: position.y });

        if (performance.now() - this.tap < 100) return;
        this.tapedHex = undefined;
    }
}
