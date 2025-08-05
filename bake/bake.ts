import glyphsJSON from '../data/glyphs.json';
import { Glyph } from '../src/types/Glyph';
import fs from 'fs';
import sharp from 'sharp';

const glyphs = glyphsJSON as Glyph[];

const styles: string[] = [];
const heroNames: string[] = [];

for (let i = 0; i < glyphs.length; i++) {
    const glyph = glyphs[i];

    const image = sharp(`data/glyphs/${glyph.id}.png`);
    image.resize(64, 64, {
        fit: `outside`,
        withoutEnlargement: true,
    });
    image.toFile(`src/public/glyphs/${glyph.id}.webp`);

    const metadata = await image.metadata();
    glyph.size = {
        width: metadata.width,
        height: metadata.height,
    };

    if (!styles.includes(glyph.style)) styles.push(glyph.style);
    if (!heroNames.includes(glyph.hero) && glyph.hero !== '') {
        heroNames.push(glyph.hero);
    }
}

const heroes: { [name: string]: string } = {};

styles.sort();
heroNames.sort();
heroNames.forEach((heroName) => {
    const heroIconId =
        glyphs.find(
            (g) =>
                g.name === heroName &&
                g.type === 'Hero' &&
                g.style === 'Drawing'
        )?.id || '';
    heroes[heroName] = heroIconId;
});

fs.writeFileSync('./data/glyphs.json', JSON.stringify(glyphs, null, 4));

fs.writeFileSync(
    './data/glyph_ids.json',
    JSON.stringify(glyphs.map((glyph) => glyph.id))
);
fs.writeFileSync('./data/glyph_styles.json', JSON.stringify(styles));
fs.writeFileSync('./data/glyph_heroes.json', JSON.stringify(heroes));
