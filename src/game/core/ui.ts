import { downArrow, upArrow } from "../../core/render/html";
import { floorToDigit, isPositive, roundToDigit } from "@utils/numberUtils";
import { Item } from "../models/item";

let initialized: boolean = false;
let statsEl: HTMLDivElement;
let currentStorage: Map<string, Item>;
let currentStoragePS: Map<string, number>;

export function uiInitialize() {
    if (initialized) return;
    statsEl = <HTMLDivElement>document.getElementById("stats")!;
    initialized = true;
}

export function setStorageDisplayFromItemMap(storage: Map<string, Item>, storagePS: Map<string, number>) {
    if (!initialized) throw Error("UI not initialized");
    currentStorage = storage;
    currentStoragePS = storagePS;

    let storageStats: string = "";

    storage.forEach((item: Item) => {
        storageStats += `<div class="stat" id="${item.type}">
            <div class="stat-figure text-secondary">
                ${item.icon}
            </div>
            <div class="stat-title">${item.name}</div>
            <div class="stat-value">${roundToDigit(item.value, 2)}</div>
            <div class="stat-desc">${getChangedString(item.type)}</div>
        </div>`;
    });

    statsEl.innerHTML = storageStats;
}

export function updateStorageDispaly() {
    if (!currentStorage) return;

    currentStorage.forEach((item: Item) => {
        let statValue = statsEl.querySelector("#" + item.type + " .stat-value");
        let statChange = statsEl.querySelector("#" + item.type + " .stat-desc");
        if (!statValue || !statChange) return;
        statValue.innerHTML = floorToDigit(item.value, 2).toString();

        statChange.innerHTML = getChangedString(item.type);
    });
}

function getChangedString(type: string): string {
    if (!currentStoragePS) return "";

    let change = currentStoragePS.get(type);

    let changeString: string = "";
    if (change === undefined) {
        changeString = "...";
    } else {
        changeString = (isPositive(change) ? upArrow : downArrow) + " " + change.toString();
    }

    return changeString;
}
