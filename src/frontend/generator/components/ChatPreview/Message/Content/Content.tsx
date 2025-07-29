import './content.css';
import { createRef, useEffect } from 'react';
import parse from 'html-react-parser';

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

    // useEffect(() => {
    //     [...content.matchAll(/<(?<type>TX0?C00|FG)(?<body>[0-9A-F]*)>/gi)]
    //         .slice(0, 1)
    //         .forEach((match) => {
    //             if (
    //                 textboxRef.current === null ||
    //                 textboxRef.current.firstChild === null
    //             ) {
    //                 throw new Error(
    //                     'Rendering Content component failed due to textboxRef being undefined'
    //                 );
    //             }
    //             const textNode = textboxRef.current.firstChild;

    //             if (textNode.nodeValue === null) {
    //                 throw new Error('TextNode does not have a nodeValue');
    //             }

    //             const matchStart = match.index;
    //             const matchLength = match[0].length;

    //             const tagRange = document.createRange();
    //             tagRange.setStart(textNode, matchStart);
    //             tagRange.setEnd(textNode, matchStart + matchLength);
    //             console.log(`Tag: ${tagRange.toString()}; Match: ${match[0]}`);
    //             tagRange.deleteContents();

    //             const textNodeLength = textNode.nodeValue.length;
    //             const spanRange = tagRange.cloneRange();
    //             spanRange.collapse(true);

    //             const span = document.createElement('span');
    //             span.innerText = spanRange.toString();
    //             span.className = 'tag';

    //             spanRange.insertNode(span);

    //             console.log(
    //                 `Match: ${match[0]}; SpanRange: ${spanRange.toString()}`
    //             );
    //         });
    // }, [content, textboxRef]);
    useEffect(() => {
        console.log(content === '', `"${content}"`);
    });

    function replaceTagsWithHTML(content: string) {
        const colorTags = content.matchAll(/<FG(?<hex>[0-9A-F]{8})>/gi);
        [...colorTags].forEach((match) => {
            content =
                content.slice(0, match.index) +
                `<span style="color: #${match.groups?.hex || 'inherit'}">` +
                content.slice(match.index + match[0].length, content.length) +
                '</span>';
        });
        const glyphTags = content.matchAll(/<TX0?C00(?<id>[0-9A-F]{12})>/gi);
        [...glyphTags].forEach((match) => {
            console.log(match);
            content =
                content.slice(0, match.index) +
                `<img src="/public/glyphs/${
                    match.groups?.id || 'unknown'
                }.png" class="overwatch-icon" />` +
                content.slice(match.index + match[0].length, content.length);
        });
        return parse(content);
    }

    if (editable) {
        if (setContent === undefined || onKeyDown === undefined) {
            throw new Error(
                `An editable Content component did not receive onKeyDown and setContent event handlers`
            );
        }
        return (
            <>
                <div
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
                    ref={textboxRef}
                ></div>
            </>
        );
    } else {
        return (
            <>
                <div className='chat-message' ref={textboxRef}>
                    {replaceTagsWithHTML(content)}
                </div>
            </>
        );
    }
}
