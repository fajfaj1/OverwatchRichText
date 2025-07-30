import './button.css';
import '../input.css';
export type ButtonVariant = 'normal' | 'outline' | 'highlight';
export type ButtonSize = 'full' | 'min';

export function Button({
    variant,
    size,
    disabled,
    children,
    popoverTarget,
    popoverTargetAction,
    onClick,
}: {
    variant: ButtonVariant;
    size: ButtonSize;
    disabled?: boolean;
    children: React.ReactNode;
    popoverTarget?: string;
    popoverTargetAction?: 'hide' | 'show' | 'toggle';
    onClick?: () => void;
}) {
    return (
        <div
            className={`input-wrapper input-wrapper-${variant} button-wrapper`}
        >
            <button
                {...{ onClick }}
                className={`input input-${variant} input-${size} button button-${variant}`}
                {...(popoverTarget !== undefined ? { popoverTarget } : {})}
                {...(popoverTargetAction !== undefined
                    ? { popoverTargetAction }
                    : {})}
                {...(disabled !== undefined ? { disabled } : {})}
            >
                {children}
            </button>
        </div>
    );
}
