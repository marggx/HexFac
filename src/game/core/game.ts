import { clearCanvas, drawImage, drawPolygon, resizeCanvas } from "./../../core/render/canvas";
import { hexagonMap, hexToPixel, polygonCorners, isHexInViewport } from "./../../game/utils/hexUtils";
import Layout, { orientation } from "./../../core/models/layout";
import { Vector2 } from "../../core/models/vector";
import { initialize } from "./../../game/core/events";
import alea from "alea";
import { createNoise2D } from "simplex-noise";
import { getSetting, loadSettings } from "./settings";

export default class Game {
    private initSteps: number = 15;
    private step: number = 0;
    private layout: Layout;
    private prng;
    private hexas = hexagonMap(20);
    private noise2D;
    private secondsPassed: number = 0;
    private oldTimeStamp: number = 0;

    constructor() {
        loadSettings();
        this.stepLoadingScreen(5, "Loading settings");
        this.layout = new Layout(
            orientation,
            new Vector2(20, 20),
            getSetting("layout.maxSize"),
            getSetting("layout.minSize")
        );

        this.stepLoadingScreen(1, "Layout");

        this.prng = alea("HarryOuter");
        this.noise2D = createNoise2D(this.prng);

        this.stepLoadingScreen(1, "noise");

        initialize({ layout: this.layout });

        this.stepLoadingScreen(15, "start");

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
        for (let i = 0; i < this.hexas.length; i++) {
            if (isHexInViewport(this.layout, this.hexas[i])) {
                drawImage(
                    hexToPixel(this.layout, this.hexas[i]),
                    this.layout.size.x,
                    this.layout.size.y,
                    this.noise2D(-this.hexas[i].q, this.hexas[i].r)
                );
                drawPolygon(polygonCorners(this.layout, this.hexas[i]), null, "darkgray", 1);
            }
        }
    }

    public gameLoop(timeStamp: DOMHighResTimeStamp) {
        // Calculate how much time has passed
        this.secondsPassed = Math.min(timeStamp - this.oldTimeStamp, 100) / 1000;
        this.oldTimeStamp = timeStamp;

        if (this.layout.changed) {
            clearCanvas();

            this.layout.changed = false;
            this.draw();
        }
        window.requestAnimationFrame((t: DOMHighResTimeStamp) => this.gameLoop(t));
    }

    private stepLoadingScreen(steps: number, nextStepText: string) {
        if (this.step === 0) {
            document.querySelector<HTMLDivElement>("#loadingProgress")!.max = this.initSteps;
        }
        this.step += steps;

        if (this.step >= this.initSteps) {
            const loadingScreen = document.querySelector<HTMLDivElement>("#loadingScreen")!;
            loadingScreen.style.display = "none";
            return;
        }

        const loadingScreen = document.querySelector<HTMLDivElement>("#loadingText")!;
        const loadingProgress = document.querySelector<HTMLDivElement>("#loadingProgress")!;
        loadingProgress.value = this.step;
        loadingScreen.innerHTML = nextStepText;
    }
}
