import { loadObject, saveObject } from "../../core/save";
import { defaultSettings } from "../const";

export default {};

export let settings: any = defaultSettings;

export function loadSettings(): any {
    let loadedSettings = loadObject("settings");
    if (loadedSettings) {
        settings = loadedSettings;
        return settings;
    }

    return settings;
}

export function saveToSettings(setting: { key: string; value: any }): void {
    settings[setting.key] = setting.value;
    saveObject("settings", settings);
}

export function saveSettings(saveSettings?: any): void {
    if (saveSettings) {
        settings = saveSettings;
    }
    saveObject("settings", settings);
}

export function getSetting(key: string): any {
    if (key.includes(".")) {
        const keys = key.split(".");
        console.log(keys);
        let value = settings;
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (value[key] === undefined) {
                return undefined;
            }
            value = value[key];
        }
        return value;
    }

    return settings[key];
}
