import './button.css';
export type ButtonVariant = 'normal' | 'outline' | 'highlight';

export function Button({
    variant,
    children,
}: {
    variant: ButtonVariant;
    children: React.ReactNode;
}) {
    return (
        <div className='button-wrapper'>
            <button className={`button button-${variant}`}>{children}</button>
        </div>
    );
}
