import './icon.css';
import { glyphs } from '@/data_loaders/glyphs';

export default function Icon({ id }: { id: string }) {
    const glyph = glyphs.find((glyph) => glyph.id === id) || {
        id,
        name: 'null',
        type: 'null',
        style: 'null',
        hero: 'null',
        aliases: [],
        size: {
            width: 0,
            height: 0,
        },
    };
    const aspectRatio = glyph.size.width / glyph.size.height;

    return (
        <>
            <img
                className='glyph'
                src={`/glyphs/${id}.webp`}
                height='1em'
                width={`calc(1em*${aspectRatio})`}
                alt={`${glyph.name}`}
            />
        </>
    );
}
