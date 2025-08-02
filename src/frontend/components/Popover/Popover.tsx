import './popover.css';

export function Popover({
    children,
    content,
    id,
}: {
    children: React.ReactNode;
    content: React.ReactNode;
    id: string;
}) {
    return (
        <div className='popover-wrapper'>
            {children}
            <div className='popover' id={id} popover='auto'>
                {content}
            </div>
        </div>
    );
}
