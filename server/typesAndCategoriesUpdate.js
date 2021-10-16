const dbUtils = require('./dbUtils');
const fs = require('fs');

const TYPES = JSON.parse(fs.readFileSync('./TYPES.json'));
const CATEGORIES = JSON.parse(fs.readFileSync('./CATEGORIES.json'));

async function onServerStartTry() {
    while (!dbUtils.isReady) { await sleep(1000); }
    try {
        await dbUtils.initTypes(TYPES);
        console.log('TYPES initialized');
        await dbUtils.initCategories(CATEGORIES);
        console.log('CATEGORIES initialized');
    } catch (e) {
        console.log(e);
    }

    process.exit(0);
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

setTimeout(onServerStartTry, 500);