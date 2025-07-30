import './content.css';
import { createRef, useEffect } from 'react';
import { replaceTagsWithHTML } from './utils/replaceTagsWithHTML';
import { applyColor } from './utils/applyColor';

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

    // useEffect(() => {
    //     // Fired by @/generator/components/Toolbox/Toolbox.tsx
    //     function applyColorHandler(e: CustomEventInit<{ hex: string }>) {
    //         applyColor(e, inputRef);
    //     }

    //     if (editable) window.addEventListener('apply-color', applyColorHandler);

    //     return () => {
    //         window.removeEventListener('apply-color', applyColorHandler);
    //     };
    // }, [editable, inputRef]);

    if (editable) {
        if (setContent === undefined || onKeyDown === undefined) {
            throw new Error(
                `An editable Content component did not receive onKeyDown and setContent event handlers`
            );
        }
        return (
            <>
                <div
                    id='chat-input-field'
                    className={`chat-input-field ${
                        content === '' || content === '\n'
                            ? 'empty'
                            : 'populated'
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
                    ref={inputRef}
                ></div>
            </>
        );
    } else {
        return (
            <>
                <div className='chat-message'>
                    {replaceTagsWithHTML(content)}
                </div>
            </>
        );
    }
}
