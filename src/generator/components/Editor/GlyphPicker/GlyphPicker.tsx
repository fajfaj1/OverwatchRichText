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

function GlyphPickerTab({
    name,
    icon,
    index,
    onChoice,
}: {
    name: string;
    icon: string;
    index: number;
    onChoice: (index: number) => void;
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
            />
            <label className='glyph-tab' htmlFor={id}>
                <CategoryIcon category={name} />
            </label>
        </>
    );
}

function GlyphTile({ glyph }: { glyph: Glyph }) {
    return (
        <div className='glyph-tile'>
            <OverwatchTexture id={glyph.id} />
        </div>
    );
}

export function GlyphPicker({
    onChoice,
}: {
    onChoice: (glyph: Glyph) => void;
}) {
    const heroOptions: Option[] = Object.keys(heroIcons).map((heroName) => {
        return {
            id: heroName,
            name: heroName,
            icon: OverwatchTexture({ id: heroIcons[heroName] }),
        };
    });
    heroOptions.unshift({ id: '', name: 'All heroes' });
    const styleOptions = styles.map((style) => {
        return { id: style, name: style };
    });
    styleOptions.unshift({ id: '', name: 'All styles' });

    function filterByHero(hero: Option) {}
    function filterByStyle(style: Option) {}
    function setCategory(index: number) {}
    return (
        <>
            <div className='glyph-picker'>
                <div className='glyph-filters'>
                    <h4>Filters</h4>
                    <Dropdown
                        name='hero-filter'
                        options={heroOptions}
                        onChoice={filterByHero}
                        defaultOption={heroOptions[0]}
                    />
                    <Dropdown
                        name='style-filter'
                        options={styleOptions}
                        onChoice={filterByStyle}
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
                                onChoice: setCategory,
                            });
                        })}
                    </fieldset>
                    <div className='glyph-selector-body'>
                        <div className='glyph-category-display'>Category</div>
                        <div className='glyph-tray'>
                            {glyphs.map((glyph) => GlyphTile({ glyph }))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
