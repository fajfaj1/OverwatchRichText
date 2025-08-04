import fs from 'node:fs';
import sharp from 'sharp';
import { pipeline } from 'stream/promises';

const ids = fs
    .readFileSync('./scripts/all_ids.txt', { flag: 'r', encoding: 'utf-8' })
    .split('\r\n');

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
    await pipeline(
        response.body,
        sharp().resize(512, 512, {
            fit: `inside`,
            withoutEnlargement: true,
        }),
        fs.createWriteStream(filepath, {
            flags: 'a',
        })
    );

    successes++;
}

const assetFilePath = (id) => `./src/public/glyphs/${id}.png`;
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
