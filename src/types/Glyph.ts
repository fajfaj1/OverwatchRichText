export type Glyph = {
    id: string;
    name: string;
    category: string;
    style: string;
    hero: string;
    aliases: string[];
    size: {
        width: number;
        height: number;
    };
};
