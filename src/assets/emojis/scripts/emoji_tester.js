// This is a script for manual validation of emoji codes
import { ids } from './ids.js';
import ChildProcess from 'child_process';
import readline from 'readline';
import fs from 'fs';

const startTimestamp = Date.now();

const START = 0;
const END = 11160;

const BATCH_SIZE = 10;
const slicedIDList = ids.slice(START, END);

let confirmed_ids = [];

console.log(`Running emoji check on emojis from ${START} to ${END - 1}`);

let totalIdCount = slicedIDList.length;

function humanizeMS(ms) {
    // const timeInSeconds = ms / 1000;
    const seconds = Math.round((ms / 1000) % 60);
    // const timeInMinutes = (timeInSeconds - seconds) / 60;
    const minutes = Math.round((ms / (60 * 1000)) % 60);
    // const timeInHours = (timeInMinutes - seconds) / 60;
    const hours = Math.round((ms / (60 * 60 * 1000)) % 24);
    let time = '';
    if (hours > 0) {
        time += `${hours}h`;
    }
    if (minutes > 0) {
        time += ` ${hours}m`;
    }
    if (seconds > 0 || hours === 0) {
        time += ` ${seconds}s`;
    }
    return time;
}

function saveToClipboard(text) {
    ChildProcess.spawn('clip').stdin.end(text);
}

/** Returns a list of indices from human input
 * Takes a list separated by ", " including ranges like "1-3"
 */
function decodeHumanInput(text) {
    if (text === '') {
        return [];
    }
    const rangeExpression = /^\d-\d$/;
    const indexExpression = /^\d$/;
    const texts = text.replaceAll(' ', '').split(',');

    const indices = [];
    texts.map((text) => {
        if (indexExpression.test(text)) {
            indices.push(text);
        } else if (rangeExpression.test(text)) {
            const boundaries = text.split('-').slice(0, 2);
            const endIndex = boundaries.pop();
            const startIndex = boundaries.pop();

            for (let i = startIndex; i <= endIndex; i++) {
                indices.push(`${i}`);
            }
        } else {
            throw new Error(`Failed to parse item: "${text}"`);
        }
    });
    return indices.map((index) => +index);
}
let checkedIds = 0;

// Batching strategy: try with 10 elements, if 4 or more are valid, try ones after the matched ones
async function askForIdsFrom(startPosition) {
    const idList = slicedIDList.slice(
        startPosition,
        startPosition + BATCH_SIZE
    );

    if (idList.length === 0) {
        return;
    }

    const message = idList.map((id, index) => `${index}<TXC00${id}>`).join('');

    saveToClipboard(message);
    console.log(
        '\n' +
            idList
                .map((id, index) => `${index}. ${id}  <TXC00${id}>`)
                .join('\n')
    );

    await new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        const completion =
            Math.round((checkedIds / totalIdCount) * 10000) / 100;

        const timeRemainingMS =
            ((Date.now() - startTimestamp) / completion) * 100;
        rl.question(
            `[${completion}%] (ETA: ${humanizeMS(
                timeRemainingMS
            )}) Which ids are correct? `,
            async (answer) => {
                let abort = false;
                let validIds = [];
                let indices = [];
                try {
                    indices.push(...decodeHumanInput(answer));
                    validIds.push(...indices.map((index) => idList[index]));
                } catch (err) {
                    console.error(err);
                    console.log(`Please try again.`);
                    rl.close();
                    await askForIdsFrom(startPosition);
                    abort = true;
                }

                if (!abort) {
                    confirmed_ids.push(...validIds);
                    if (validIds.length >= 4) {
                        // Leaves only ids after last valid id
                        const startPositionOffset = Math.max(...indices) + 1;
                        console.log(
                            `Four or more elements matched, offsetting the start position by ${startPositionOffset} instead of ${BATCH_SIZE} ${startPositionOffset}`
                        );
                        rl.close();
                        checkedIds += startPositionOffset;
                        await askForIdsFrom(
                            startPosition + startPositionOffset
                        );
                    } else {
                        rl.close();
                        checkedIds += 10;
                        await askForIdsFrom(startPosition + BATCH_SIZE);
                    }
                }
                rl.close();
                resolve();
            }
        );
    });
}

await askForIdsFrom(0);

console.log(`Writing ${confirmed_ids.length} IDs to disk.`);

fs.writeFileSync(
    './src/assets/emojis/scripts/valid_ids.txt',
    confirmed_ids.join('\n'),
    {
        flag: 'a',
    }
);
