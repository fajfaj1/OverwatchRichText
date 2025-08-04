import glyphs from '../data/glyphs.json';
// import { Glyph } from '../src/types/Glyph';
import fs from 'fs';
import sharp from 'sharp';

const id = glyphs[0].id;
sharp('data/glyphs/' + id + '.png').toFile(`src/public/glyphs/${id}.webp`);
