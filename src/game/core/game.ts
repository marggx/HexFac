import { loadObject, saveObject } from "../../core/save";
import { getSetting, loadSettings } from "../../core/settings";
import { Building } from "../models/building";
import Hex from "../models/hex";
import HexagonMap from "../models/hexagonMap";
import { Vector2, Vector2Attributes } from "../models/vector";
import { clearCanvas, drawLines, drawPolygon, resizeCanvas } from "./../../core/render/canvas";
import { initialize } from "./../../game/core/events";
import Layout, { orientation } from "./layout";
import LoadingScreen from "./loadingScreen";
import { setStorageDisplayFromItemMap, uiInitialize, updateStorageDispaly } from "./ui";

const FPS: number = 59;
const FPSInterval: number = 1000 / FPS;
const UPS: number = 10;
const UPSInterval: number = 1000 / UPS;
const UIPS: number = 4;
const UIPSInterval: number = 1000 / UIPS;

export default class Game {
    public canvas: HTMLCanvasElement = document.querySelector<HTMLCanvasElement>("#game")!;
    public ctx: CanvasRenderingContext2D = this.canvas.getContext("2d")!;
    public layout: Layout;
    private hexMap = new HexagonMap(10);
    private FPSOldTimeStamp: number = 0;
    private UPSOldTimeStamp: number = 0;
    private UIPSOldTimeStamp: number = 0;
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

        uiInitialize();

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

    private draw() {
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
        let FPSDeltaTime = timeStamp - this.FPSOldTimeStamp;
        let UPSDeltaTime = timeStamp - this.UPSOldTimeStamp;
        let UIPSDeltaTime = timeStamp - this.UIPSOldTimeStamp;

        if (FPSDeltaTime > FPSInterval) {
            clearCanvas();
            this.draw();
            this.FPSOldTimeStamp = timeStamp - (FPSDeltaTime % FPSInterval);
            this.layout.changed = false;
        }

        if (UPSDeltaTime > UPSInterval) {
            this.UPSOldTimeStamp = timeStamp - (UPSDeltaTime % UPSInterval);
            this.update(UPSDeltaTime / 1000);
        }

        if (UIPSDeltaTime > UIPSInterval) {
            this.UIPSOldTimeStamp = timeStamp - (UIPSDeltaTime % UIPSInterval);
            updateStorageDispaly();
            //this.uiUpdate(UPSDeltaTime / 1000);
        }
        window.requestAnimationFrame((t) => this.gameLoop(t));
    }

    public update(deltaTime: number) {
        this.hexMap.update(deltaTime);
    }

    public async save() {
        let save = {
            layout: this.layout,
            hexMap: this.hexMap,
        };
        saveObject("save", save);
    }

    public async load() {
        let save = loadObject("save");
    }

    public zoom(factor: Vector2) {
        let hexAtCenter = this.hexMap.pixelToHex(this.layout, this.layout.center);
        this.layout.setSize(factor, true);
        if (hexAtCenter) {
            let newPosition = this.hexMap.hexToPixel(this.layout, hexAtCenter);
            this.layout.setOrigin(
                {
                    x: this.layout.center.x - newPosition.x,
                    y: this.layout.center.y - newPosition.y,
                },
                true
            );
        }
    }

    public async tapDown(position: Vector2 | Vector2Attributes | undefined) {
        this.tap = performance.now();
        if (!position) return;
        this.layout.changed = true;
        if (this.tapedHex) this.tapedHex.isHighlighted = false;
        this.tapedHex = this.hexMap.pixelToHex(this.layout, position) as Building;
        let position2 = this.hexMap.hexToPixel(this.layout, this.tapedHex);
        this.layout.setOrigin(
            {
                x: this.layout.center.x - position2.x,
                y: this.layout.center.y - position2.y,
            },
            true
        );
        this.tapedHex.isHighlighted = true;
        setStorageDisplayFromItemMap(this.tapedHex.publicStorage, this.tapedHex.publicStoragePS);
    }

    public async tapUp(position: Vector2 | Vector2Attributes | undefined) {
        this.tap = 0;
        if (!this.tapedHex) return;
        this.highlightedHex = this.tapedHex;
    }

    public async tapMove(position: Vector2 | Vector2Attributes | undefined) {
        if (!this.tap) return;
        if (!position) return;
        this.layout.setOrigin({ x: position.x, y: position.y }, true);

        if (performance.now() - this.tap < 100) return;
        this.tapedHex = undefined;
    }

    public debug(position: Vector2 | Vector2Attributes | undefined) {}
}
