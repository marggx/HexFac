export const upArrow: string = "↗︎";
export const downArrow: string = "↘︎";

export function find(selector: string) {
    let el = document.querySelector(selector);
    if (el === null) {
        throw new Error("Element not found");
    }
    return el;
}

export function findAll(selector: string) {
    let els = document.querySelectorAll(selector);
    if (els === null) {
        throw new Error("Elements not found");
    }
    return els;
}

export function create(tag: string, className: string | null = null) {
    let el = document.createElement(tag);
    if (className !== null) {
        el.className = className;
    }
    return el;
}

export function createText(text: string) {
    return document.createTextNode(text);
}

export function createSvg(tag: string, className: string | null = null) {
    let el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    if (className !== null) {
        el.setAttribute("class", className);
    }
    return el;
}

export function createDivider(text: string | null = null) {
    let divider = create("div", "divider");
    if (text !== null) {
        divider.appendChild(createText(text));
    }
    return divider;
}
