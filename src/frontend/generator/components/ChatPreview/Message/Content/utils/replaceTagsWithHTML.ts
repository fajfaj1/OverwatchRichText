import parse from 'html-react-parser';

export function replaceTagsWithHTML(content: string) {
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
        content =
            content.slice(0, match.index) +
            `<img src="/glyphs/${
                match.groups?.id || 'unknown'
            }.png" class="overwatch-icon" />` +
            content.slice(match.index + match[0].length, content.length);
    });
    return parse(content);
}
