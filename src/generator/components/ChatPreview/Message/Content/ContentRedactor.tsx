import parse from 'html-react-parser';
import type { HTMLReactParserOptions } from 'html-react-parser';
import { Element, Text } from 'html-react-parser';

export function ContentRedactor({ content }: { content: string }) {
    // console.log(`Before: ${content}`);
    // Sanitize input
    content = content.replaceAll(/<([/a-z0-9]+)([^\n>]*>)?/gi, (match) => {
        if (
            /<FG[^>]{0,28}>?/.test(match) ||
            /<TX0?C00[0-9A-F]{12}>?/.test(match)
        ) {
            if (match.endsWith('>')) return match;
            return '';
        }
        return match.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    });
    // console.log(`After: ${content}`);

    content = content.replaceAll(/<FG([^>]{0,28})>/gi, (_, hex: string) => {
        let hexcode = 'inherit';
        let className = 'color-tag';
        if (/[0-9A-F]{8}/.test(hex)) {
            hexcode = `#${hex}`;
        } else {
            className += ' corrupted';
        }
        content += '</span>';
        return `<span class="${className}" style="color: ${hexcode}">`;
    });
    // console.log(content);
    content = content.replaceAll(
        /<TX0?C00([0-9A-F]{12})>/gi,
        (_, id: string) => {
            content += '</span>';
            return `<img class="glyph" src="/glyphs/${id}.png" />`;
        }
    );

    const options: HTMLReactParserOptions = {
        replace(node) {
            if (node instanceof Text) {
                return node;
            } else if (node instanceof Element) {
                if (
                    node.name === 'span' &&
                    node.attribs['class'].includes('color-tag')
                ) {
                    return node;
                } else if (
                    node.name === 'img' &&
                    node.attribs['class'] === 'glyph'
                ) {
                    return node;
                } else {
                    return <></>;
                }
            } else {
                return <></>;
            }
        },
    };

    return parse(content, options);
}
