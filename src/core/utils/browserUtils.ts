export function timeoutPromise(promise: Promise<any>, timeout: number = 30000) {
    return Promise.race([
        new Promise((_resolve, reject) => {
            setTimeout(() => reject("timeout " + timeout + " ms exceeded"), timeout);
        }),
        promise,
    ]);
}

export function waitOneFrame() {
    return new Promise(function (resolve) {
        window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () {
                resolve(true);
            });
        });
    });
}

export function isBrowserSupported(): boolean {
    return (
        typeof window !== "undefined" &&
        typeof window.requestAnimationFrame !== "undefined" &&
        typeof window.localStorage !== "undefined" &&
        typeof window.Worker !== "undefined" &&
        typeof window.Blob !== "undefined" &&
        typeof window.URL !== "undefined"
    );
}

export function generateFileDownload(filename: string, text: string) {
    var element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
}

export function startFileChoose(acceptedType: string = ".bin") {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = acceptedType;

    return new Promise((resolve) => {
        input.onchange = (_) => resolve(input.files ? input.files[0] : null);
        input.click();
    });
}
