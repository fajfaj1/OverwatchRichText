import fs from 'fs';
const idListString = fs.readFileSync('/scripts/valid_ids.txt', {
    encoding: 'utf-8',
    flag: 'r',
});
const ids = idListString
    .split('\n')
    .map((id) => `    '${id}'`)
    .join(',\n');
fs.writeFileSync(
    'src/fontend/generator/glyphs.ts',
    `export const ids = [\n${ids}\n]`
);
