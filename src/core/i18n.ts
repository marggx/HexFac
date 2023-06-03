import { getSetting, setSettings } from "./settings";

export let translation: any = {};

export function getLanguage(): string {
    let lang = getSetting("language");
    if (lang) return lang;

    // @ts-ignore
    lang = navigator.languages ? navigator.languages[0] : navigator.language || navigator.userLanguage;

    if (lang) {
        lang = lang.split("-")[0];
    } else {
        lang = "en";
    }

    setSettings({ key: "language", value: lang });
    loadTranslation(lang);
    return lang;
}

export function i18n(key: string): string {
    if (!translation) return key;
    if (translation[key]) {
        return translation[key];
    }
    return key;
}

export async function loadTranslation(lang: string): Promise<any> {
    if (translation) return;

    translation = await fetch(`./assets/translations/${lang}.json`);
    translation = await translation.json();

    return translation;
}
