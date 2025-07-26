import fs from 'node:fs';
import client from 'https';
import { ids } from './ids.js';
import sharp from 'sharp';
import { pipeline } from 'stream/promises';
import { resolve } from 'node:path';
import { fail } from 'node:assert';
const timeoutMs = 5000;

const assetUrl = (id) =>
    `https://assets.overwatchitemtracker.com/textures/${id}.png`;

let successes = 0;
const start = 10000;
const end = ids.length;
let failures = 0;

async function downscaleAndDownload(url, filepath) {
    let tries = 0;
    async function fetchImage(url) {
        let response;
        try {
            response = await fetch(url);
        } catch (err) {
            console.error(`Failed to fetch ${url}`);
            console.error(err);
            if (tries < 3) {
                console.log(`Retrying`);
                tries++;
                await new Promise((resolve) =>
                    setTimeout(() => resolve(), 1000 * tries)
                );
                response = fetchImage(url);
            } else {
                {
                    console.error(
                        `Reached the maximum number of tries on ${url}`
                    );
                }
            }
        } finally {
            return response;
        }
    }
    const response = await fetchImage(url);
    if (!response.ok) {
        throw new Error(
            `Failed to fetch image from ${url} ${response.status} ${response.statusText}`
        );
    }
    // console.log(`response received`);
    await pipeline(
        response.body,
        sharp().resize(512, 512, {
            fit: `inside`,
            withoutEnlargement: true,
        }),
        fs.createWriteStream(filepath)
    );

    // console.log(`file saved`);
    successes++;
}

const assetFilePath = (id) => `./src/assets/emojis/images/${id}.png`;
// downscaleAndDownload(`https://fajfaj.site/`, assetFilePath('test'));
for (let i = start; i < end; i++) {
    await downscaleAndDownload(assetUrl(ids[i]), assetFilePath(ids[i]));
    if (i % 100 === 0) {
        console.log(
            `Completed ${Math.round(
                (successes / (end - start)) * 100
            )}% (with ${failures} failures)`
        );
    }
    await new Promise((resolve) => setTimeout(() => resolve(), 10));
}

// // let i = 0;
// let successes = 0;
// const start = 700;
// const end = 3000;

// const idCount = end - start;
// const slicedIds = ids.slice(start, end);
// for (let i = 0; i < slicedIds; i++) {
//     const fileurl = url.replace('%ID%', id);
//     await downloadImage(fileurl, filepath.replace('%ID%', id))
//         .then(() => successes++)
//         .catch((err) => {
//             console.err(`Failed to download ${id} from ${url}:`);
//             console.error(err);
//         });
//     i++;
//     if (i % 100 === 0) {
//         console.log(`Completed ${Math.round((successes / idCount) * 100)}%`);
//     }
//     await new Promise((r) => setTimeout(r, 1000));
// }
