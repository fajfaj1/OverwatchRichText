import './icon.css';
export default function Icon({ id }: { id: string }) {
    return (
        <>
            <img className='icon' src={`/data/glyphs/${id}.png`} alt='' />
        </>
    );
}
