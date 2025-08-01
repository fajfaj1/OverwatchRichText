import '../input.css';
export type ButtonVariant = 'normal' | 'outline' | 'highlight' | 'ghost';
export type ButtonSize = 'full' | 'min';
export function Button({
    variant,
    size,
    children,
    disabled,
    icon,
    popoverTarget,
    popoverTargetAction,
    onClick,
}: {
    variant: ButtonVariant;
    size: ButtonSize;

    children: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
    popoverTarget?: string;
    popoverTargetAction?: 'hide' | 'show' | 'toggle';
    onClick?: () => void;
}) {
    const iconComponent = icon ? (
        <div className='input-icon'>{icon}</div>
    ) : (
        <></>
    );
    return (
        <div
            className={`input-wrapper input-wrapper-${variant} button-wrapper`}
        >
            <button
                {...(onClick ? { onClick } : {})}
                className={`input input-${variant} input-${size} button button-${variant}`}
                {...(popoverTarget !== undefined ? { popoverTarget } : {})}
                {...(popoverTargetAction !== undefined
                    ? { popoverTargetAction }
                    : {})}
                {...(disabled !== undefined ? { disabled } : {})}
            >
                {iconComponent}
                {children}
            </button>
        </div>
    );
}
