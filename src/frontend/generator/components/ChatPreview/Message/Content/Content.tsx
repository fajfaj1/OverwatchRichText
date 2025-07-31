import './content.css';
import { createRef } from 'react';
import { replaceTagsWithHTML } from './utils/replaceTagsWithHTML';

export function Content({
    content,
    placeholder,
}: {
    content: string;
    placeholder?: string;
}) {
    const inputRef = createRef<HTMLInputElement>();

    return (
        <>
            <div
                className={`chat-message-content ${
                    content === '' ? 'empty' : 'populated'
                }`}
            >
                {replaceTagsWithHTML(
                    (content === '' ? placeholder : content) || ''
                )}
            </div>
        </>
    );
}
