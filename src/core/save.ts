export function saveObject(key: string, object: any): void {
    const objectString = JSON.stringify(object);

    localStorage.setItem(key, btoa(encodeURIComponent(objectString)));
}

export function loadObject(key: string): any {
    if (!localStorage.getItem(key)) {
        return undefined;
    }
    const objectString = decodeURIComponent(atob(localStorage.getItem(key)!));

    return JSON.parse(objectString);
}
