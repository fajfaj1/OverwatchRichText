import './content.css';
import { createRef, useEffect } from 'react';

export function Content({
    editable,
    content,
    setContent,
    onKeyDown,
}: {
    editable: boolean;
    content: string;
    setContent?: React.Dispatch<React.SetStateAction<string>>;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
}) {
    const textboxRef = createRef<HTMLInputElement>();

    useEffect(() => {
        console.log(`Message updated: ${content}`);
    }, [content]);

    if (editable) {
        if (setContent === undefined || onKeyDown === undefined) {
            throw new Error(
                `An editable MessageContent component did not receive onKeyDown and setContent event handlers`
            );
        }
        return (
            <>
                <div
                    className={`chat-input-field ${
                        content === '' ? 'empty' : 'populated'
                    }`}
                    contentEditable
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault();
                        }
                        onKeyDown(event);
                    }}
                    onInput={(event: React.FormEvent<HTMLDivElement>) => {
                        setContent(event.currentTarget.innerText);
                    }}
                    ref={textboxRef}
                ></div>
            </>
        );
    } else {
        return (
            <>
                <div className='chat-message' ref={textboxRef}>
                    {content}
                </div>
            </>
        );
    }
}
