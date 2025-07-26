// This is a script for manual validation of emoji codes
import { ids } from './ids.js';
import ChildProcess from 'child_process';
import readline from 'readline';
import fs from 'fs';

const START = 0;
const END = 100;

const BATCH_SIZE = 10;
const slicedIDList = ids.slice(START, END);

console.log(`Running emoji check on emojis from ${START} to ${END - 1}`);

let totalBatchCount = Math.ceil(slicedIDList.length / BATCH_SIZE);

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
    texts
        .map((text) => {
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
        })
        .map((index) => +index);
    return indices;
}

// Batching strategy: try with 10 elements, if 4 or more are valid, try ones after the matched ones
async function askForIds(idList, batchNumber) {
    const message = idList.map((id, index) => `${index}<TXC00${id}>`).join('');

    saveToClipboard(message);
    console.log('\n' + idList.map((id, index) => `${index}. ${id}`).join('\n'));

    await new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question(
            `[${batchNumber}/${totalBatchCount}] Which ids are correct? `,
            async (answer) => {
                let abort = false;
                let valid_ids = [];
                try {
                    valid_ids.push(
                        ...decodeHumanInput(answer).map(
                            (index) => idList[index]
                        )
                    );
                } catch (err) {
                    console.error(err);
                    console.log(`Please try again.`);
                    rl.close();
                    await askForIds(idList, batchNumber);
                    abort = true;
                }

                if (!abort) {
                    confirmed_ids = [...confirmed_ids, ...valid_ids];
                    if (valid_ids.length >= 4) {
                        const newBatch = [...idList];
                        // Leaves only ids after last valid id
                        let startRemoving = false;
                        for (let i = newBatch.length; i >= 0; i--) {
                            if (valid_ids.includes(newBatch[i])) {
                                startRemoving = true;
                            }
                            if (startRemoving) {
                                delete newBatch[i];
                            } else {
                            }
                        }

                        rl.close();
                        await askForIds(
                            idList.filter((id) => !valid_ids.includes(id)),
                            batchNumber
                        );
                    }
                }
                rl.close();
                resolve();
            }
        );
    });
}

let confirmed_ids = [];
for (let i = 0; i < slicedIDList.length; i += BATCH_SIZE) {
    // console.log(i);
    const batchIds = [];
    for (let j = 0; j < BATCH_SIZE && slicedIDList[i + j] !== undefined; j++) {
        batchIds.push(slicedIDList[i + j]);
    }

    await askForIds(batchIds, i / BATCH_SIZE + 1);
}

fs.writeFileSync(
    './src/assets/emojis/scripts/valid_ids.txt',
    confirmed_ids.join('\n'),
    {
        flag: 'a',
    }
);
