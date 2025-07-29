import './content.css';
import { createRef } from 'react';

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
    const inputRef = createRef<HTMLInputElement>();

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
                        const text = event.currentTarget.innerText.replace(
                            /\n/g,
                            ''
                        ); // Remove line breaks
                        setContent(text);
                        console.log(`"${text}"`);
                        // console.log(`" ${event.currentTarget.innerText} "`);

                        // setContent(event.currentTarget.innerText);
                    }}
                    ref={inputRef}
                ></div>
            </>
        );
    } else {
        return (
            <>
                <div className='chat-message'>{content}</div>
            </>
        );
    }
}
