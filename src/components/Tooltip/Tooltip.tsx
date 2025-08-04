import './tooltip.css';
import { useState, useLayoutEffect, useRef } from 'react';

export function Tooltip({
    text,
    children,
}: {
    text: string;
    children: React.ReactNode;
}) {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [marginLeft, setMarginLeft] = useState(0);

    useLayoutEffect(() => {
        if (tooltipRef.current) {
            const width = tooltipRef.current.clientWidth;
            setMarginLeft(Math.round(-width / 2));
        }
    }, [text]); // Recalculate if `text` changes

    return (
        <>
            <div className='tooltip-wrapper'>
                <div
                    className='tooltip'
                    style={{
                        marginLeft,
                    }}
                    ref={tooltipRef}
                >
                    {text}
                </div>
                {children}
            </div>
        </>
    );
}
