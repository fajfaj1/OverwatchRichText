import fs from 'node:fs';
import client from 'https';
import { ids } from './ids.js';

const url = `https://assets.overwatchitemtracker.com/textures/%ID%.png`;

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        client.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath, { flags: 'w' }))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                // Consume response data to free up memory
                res.resume();
                reject(
                    new Error(
                        `Request (${url}) Failed With a Status Code: ${res.statusCode}`
                    )
                );
            }
        });
    });
}

const filepath = './src/assets/emojis/images/%ID%.png';

// let i = 0;
let successes = 0;
const start = 700;
const end = 3000;

const idCount = end - start;
const slicedIds = ids.slice(start, end);
for (let i = 0; i < slicedIds; i++) {
    const fileurl = url.replace('%ID%', id);
    await downloadImage(fileurl, filepath.replace('%ID%', id))
        .then(() => successes++)
        .catch((err) => {
            console.err(`Failed to download ${id} from ${url}:`);
            console.error(err);
        });
    i++;
    if (i % 100 === 0) {
        console.log(`Completed ${Math.round((successes / idCount) * 100)}%`);
    }
    await new Promise((r) => setTimeout(r, 1000));
}
