import fs from 'fs';
import readline from 'readline';
import process from 'process';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let content = `import '../icon.css'
export default function FontawesomeIcon() {
    return (%SVG%)
}`;
rl.question(`Paste your FontAwesome SVG:\n`, (answer) => {
    const match = answer.match(
        /^(<svg xmlns="[^"]+" viewBox="\d+ \d+ \d+ \d+")()(>)(<!--.+-->)(<path[^>]+>)(<\/svg>)$/i
    );
    if (!match) {
        throw new Error(
            `Failed to match pasted content, make sure the content you paste is an svg from FontAwesome.`
        );
    }
    let svg = '';
    svg += match[1];
    svg += " fill='currentColor' className='icon'";
    svg += match[3];
    svg += match[5];
    svg += match[6];

    content = content.replace('%SVG%', svg);

    rl.question('What will be the name of your icon? ', (name) => {
        name = name[0].toUpperCase() + name.slice(1).toLocaleLowerCase();
        fs.writeFileSync(
            `src/frontend/components/icons/FontAwesome/${name}.tsx`,
            content,
            { flag: 'w' }
        );
        console.log(`File has been saved.`);

        rl.close();
    });
});
