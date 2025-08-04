import { useEffect, useRef } from 'react';
import './popover.css';

export function Popover({
    children,
    content,
    isOpen,
    setIsOpen,
}: {
    children: React.ReactNode;
    content: React.ReactNode;
    isOpen: boolean;
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const popoverRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function clickHandler(e: MouseEvent) {
            if (!isOpen) {
                return;
            }
            const popover = popoverRef.current;
            if (!popover) {
                throw new Error(
                    `Failed to check for backdrop click, popoverRef.current is null.`
                );
            }

            if (!e.target) {
                throw new Error(
                    `Failed to check for backdrop click, e.target is null.`
                );
            }
            if (!(e.target instanceof Node)) {
                throw new Error(
                    `Failed to check for backdrop click, e.target is not a Node`
                );
            }
            const target = e.target as Node;
            if (!popover.contains(target)) {
                if (!setIsOpen)
                    throw new Error(
                        `Failed to close popover on backdrop click, setIsOpen is undefined`
                    );
                setIsOpen(false);
            }
        }
        if (isOpen && setIsOpen) {
            // Delayed to prevent the first click from closing the popover
            setTimeout(() => document.addEventListener('click', clickHandler));

            return () => document.removeEventListener('click', clickHandler);
        }
    }, [isOpen, setIsOpen]);
    return (
        <div className='popover-wrapper'>
            {children}
            <div
                className={`popover popover-${isOpen ? 'shown' : 'hidden'} `}
                ref={popoverRef}
            >
                {content}
            </div>
        </div>
    );
}
