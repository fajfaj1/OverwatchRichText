import './glyph_picker.css';
import type { Glyph } from '@/types/Glyph';
import { Dropdown, type Option } from '@/components/Dropdown/Dropdown';
import {
    glyphs,
    categoryIcons,
    heroIcons,
    styles,
} from '@/data_loaders/glyphs';
import OverwatchTexture from '@/components/icons/OverwatchTexture';
import CategoryIcon from '@/components/icons/CategoryIcon';

import { useEffect, useReducer, useRef, useState } from 'react';

function GlyphPickerTab({
    name,
    icon,
    index,
    onCategoryChange,
}: {
    name: string;
    icon: string;
    index: number;
    onCategoryChange: React.Dispatch<React.SetStateAction<string>>;
}) {
    const id = `glyph-tab-${name}`;
    return (
        <>
            <input
                type='radio'
                id={id}
                name={`glyph-tabs`}
                className='glyph-tab-checkbox'
                defaultChecked={index === 0}
                onChange={() => onCategoryChange(name)}
            />
            <label className='glyph-tab' htmlFor={id}>
                <CategoryIcon category={name} />
            </label>
        </>
    );
}

function GlyphTile({
    glyph,
    onGlyphChoice,
}: {
    glyph: Glyph;
    onGlyphChoice: (glyph: Glyph) => void;
}) {
    return (
        <button
            key={glyph.id}
            className='glyph-tile'
            onClick={() => onGlyphChoice(glyph)}
        >
            <OverwatchTexture id={glyph.id} />
        </button>
    );
}

export function GlyphPicker({
    onChoice,
}: {
    onChoice: (glyph: Glyph) => void;
}) {
    const categoryNames = Object.keys(categoryIcons);
    const [category, setCategory] = useState<string>(categoryNames[0]);
    const [heroFilter, setHeroFilter] = useState<string>('*');
    const [styleFilter, setStyleFilter] = useState<string>('*');

    const [glyphsToShow, setGlyphsToShow] = useState<Glyph[]>(glyphs);
    useEffect(() => {
        console.log('reload');
        setGlyphsToShow(
            glyphs.filter(
                (glyph) =>
                    (glyph.hero === heroFilter || heroFilter === '*') &&
                    (glyph.style === styleFilter || styleFilter === '*') &&
                    glyph.category === category
            )
        );
    }, [heroFilter, styleFilter, category]);

    const heroOptions: Option[] = Object.keys(heroIcons).map((heroName) => {
        return {
            id: heroName,
            name: heroName,
            icon: OverwatchTexture({ id: heroIcons[heroName] }),
        };
    });
    heroOptions.unshift({ id: '*', name: 'All heroes' });
    const styleOptions = styles.map((style) => {
        return { id: style, name: style };
    });
    styleOptions.unshift({ id: '*', name: 'All styles' });

    return (
        <>
            <div className='glyph-picker'>
                <div className='glyph-filters'>
                    <h4>Filters</h4>
                    <Dropdown
                        name='hero-filter'
                        options={heroOptions}
                        onChoice={(option) => setHeroFilter(option.id)}
                        variant='normal'
                        size='full'
                        defaultOption={heroOptions[0]}
                    />
                    <Dropdown
                        name='style-filter'
                        options={styleOptions}
                        onChoice={(option) => setStyleFilter(option.id)}
                        variant='normal'
                        size='full'
                        defaultOption={styleOptions[0]}
                    />
                </div>
                <div className='glyph-selector'>
                    <fieldset className='glyph-tabs'>
                        {Object.keys(categoryIcons).map((category, index) => {
                            const icon = categoryIcons[category];
                            return GlyphPickerTab({
                                name: category,
                                icon,
                                index,
                                onCategoryChange: setCategory,
                            });
                        })}
                    </fieldset>
                    <div className='glyph-selector-body'>
                        <div className='glyph-category-display'>{category}</div>
                        <div className='glyph-tray'>
                            {glyphsToShow.length > 0 ? (
                                glyphsToShow.map((glyph) =>
                                    GlyphTile({
                                        glyph,
                                        onGlyphChoice: onChoice,
                                    })
                                )
                            ) : (
                                <span className='empty-glyph-list-label'>
                                    ...
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
