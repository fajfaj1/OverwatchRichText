// This is a one time use script for scraping texture ids from https://texture-viewer.overwatchitemtracker.com/
// Should be pasted into browser devtools console

all = [];
removed = [];

document
    .querySelectorAll('.text-muted.flex-shrink-0.lh-1.mt-2')
    .forEach((element) => {
        all.push(element.innerText);
    });

document
    .querySelectorAll('.texture-removed .text-muted.flex-shrink-0.lh-1.mt-2')
    .forEach((element) => {
        removed.push(element.innerText);
    });

console.log(all.filter((id) => !removed.includes(id)).join('\n'));
// The output has been saved to ./all_ids.txt
