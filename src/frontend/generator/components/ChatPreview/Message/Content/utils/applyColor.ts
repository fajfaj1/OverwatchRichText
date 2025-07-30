export function applyColor(
    e: CustomEventInit<{ hex: string }>,
    inputRef: React.RefObject<HTMLInputElement | null>
) {
    const selection = window.getSelection();
    if (!selection)
        throw new Error(`Failed to insert color, no selection exists.`);
    if (!inputRef.current) {
        throw new Error(`Failed to insert color, input ref is null.`);
    }
    if (
        !inputRef.current.contains(selection.anchorNode) ||
        !selection.anchorNode ||
        !selection.focusNode
    ) {
        throw new Error(
            `Failed to insert color, selection has to be inside the chat input field.`
        );
    }
    if (!e.detail) {
        throw new Error(
            `Failed to insert color, event came with no detail payload.`
        );
    }
    const inputNode = inputRef.current;
    for (let i = 0; i < selection.rangeCount; i++) {
        const selectionRange = selection.getRangeAt(i);
        // selectionRange.selectNode(inputNode);

        inputNode.querySelectorAll('span').forEach((span) => {
            // Compare selection and span boundries to determine how they intersect
            const spanRange = new Range();
            spanRange.selectNode(inputNode);
            spanRange.setStartBefore(span);
            spanRange.setEndAfter(span);

            const contentRange = new Range();
            contentRange.selectNodeContents(span);
            const contents = contentRange.cloneContents();
            span.replaceWith(contents);
        });

        // const content = range.cloneContents();

        const colorSpan = document.createElement('span');
        colorSpan.style = `color: ${e.detail.hex}`;
        try {
            selectionRange.surroundContents(colorSpan);
        } catch (err) {
            console.error(
                `Failed to insert color, unable to surround the selection.`
            );
            throw err;
        }
    }
}
