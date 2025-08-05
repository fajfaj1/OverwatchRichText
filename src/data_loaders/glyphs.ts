import type { Glyph } from '@/types/Glyph';
import glyphsJson from '@/../data/glyphs.json';
import glyphIds from '@/../data/glyph_ids.json';
import glyphStyles from '@/../data/glyph_styles.json';
import glyphCategories from '@/../data/glyph_categories.json';
import glyphHeroes from '@/../data/glyph_heroes.json';

export const glyphs = glyphsJson as Glyph[];
export const ids = glyphIds as string[];
export const styles = glyphStyles as string[];
export const categoryIcons = glyphCategories as {
    [name: string]: string;
};
export const heroIcons = glyphHeroes as { [name: string]: string };
