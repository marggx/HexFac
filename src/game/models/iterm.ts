export interface ItemAttributes {
    type: string;
    name: string;
    value: number;
    description?: string;
    icon?: string;
}

export class Item implements ItemAttributes {
    type: string;
    name: string;
    value: number;
    description?: string;
    icon?: string;

    constructor(type: string, name: string, value: number, description?: string, icon?: string) {
        this.type = type;
        this.name = name;
        this.description = description;
        this.icon = icon;
        this.value = value;
    }
}
