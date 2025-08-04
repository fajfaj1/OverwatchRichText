import './icon.css';
export default function Icon({ id }: { id: string }) {
    return (
        <>
            <img
                className='icon'
                src={`/assets/emojis/images/${id}.png`}
                alt=''
            />
        </>
    );
}
