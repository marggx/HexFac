import { clearCanvas, drawImage, drawLines, drawPolygon, drawText, resizeCanvas } from "./../../core/render/canvas";
import Layout, { orientation } from "./../../core/models/layout";
import { Vector2, Vector2Attributes } from "../../core/models/vector";
import { initialize } from "./../../game/core/events";
import { getSetting, loadSettings } from "./settings";
import LoadingScreen from "./loadingScreen";
import HexagonMap from "../models/hexagonMap";
import Hex from "../models/hex";

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
        drawText("FPS: " + Math.round(1 / deltaTime));
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
        // Calculate how much time has passed
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
    }

    public async tapUp(position: Vector2 | Vector2Attributes | undefined) {
        this.tap = 0;
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
