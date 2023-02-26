export default class LoadingScreen {
    private initSteps: number;
    private step: number = 0;

    private loadingScreen: HTMLDivElement;
    private loadingText: HTMLDivElement;
    private loadingProgress: HTMLProgressElement;

    constructor(initSteps: number) {
        this.initSteps = initSteps;
        this.loadingScreen = document.querySelector<HTMLDivElement>("#loadingScreen")!;
        this.loadingText = document.querySelector<HTMLDivElement>("#loadingText")!;
        this.loadingProgress = document.querySelector<HTMLProgressElement>("#loadingProgress")!;
    }

    public stepLoadingScreen(steps: number, nextStepText: string) {
        if (this.step === 0) {
            this.loadingProgress.max = this.initSteps;
        }
        this.step += steps;

        if (this.step >= this.initSteps) {
            this.loadingScreen.style.display = "none";
            return;
        }

        this.loadingProgress.value = this.step;
        this.loadingText.innerHTML = nextStepText;
    }
}
