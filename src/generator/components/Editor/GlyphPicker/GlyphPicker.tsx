import './glyph_picker.css';
import type { Glyph } from '@/types/Glyph';
import { Dropdown, type Option } from '@/components/Dropdown/Dropdown';
import { glyphs, heroIcons, styles } from '@/data_loaders/glyphs';
import OverwatchTexture from '@/components/icons/OverwatchTexture';

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

    function filterByHero(hero: string) {}
    function filterByStyle(style: string) {}
    return (
        <>
            <div className='glyph-picker'>
                <div className='glyph-filters'>
                    <h4>Filters</h4>
                    <Dropdown
                        name='hero-filter'
                        options={heroOptions}
                        onChoice={filterByHero}
                    />
                    <Dropdown
                        name='style-filter'
                        options={styleOptions}
                        onChoice={filterByStyle}
                    />
                </div>
                <div className='glyph-tray'></div>
            </div>
        </>
    );
}
