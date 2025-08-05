import '../input.css';
import './buttons.css';
import type { InputVariant, InputSize } from '@/types/Input';

export function Button({
    variant,
    size,
    children,
    disabled,
    icon,
    popoverTarget,
    popoverTargetAction,
    onClick,
    onMouseDown,
}: {
    variant: InputVariant;
    size: InputSize;

    children: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
    popoverTarget?: string;
    popoverTargetAction?: 'hide' | 'show' | 'toggle';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
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
                {...(onMouseDown ? { onMouseDown } : {})}
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
