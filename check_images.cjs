const fs = require('fs');
const https = require('https');
const http = require('http');

const dataJs = fs.readFileSync('c:\\Users\\javit\\OneDrive\\Desktop\\proyect\\src\\data.js', 'utf8');
const guidesDataJs = fs.readFileSync('c:\\Users\\javit\\OneDrive\\Desktop\\proyect\\src\\guidesData.js', 'utf8');
const guideDetailJs = fs.readFileSync('c:\\Users\\javit\\OneDrive\\Desktop\\proyect\\src\\pages\\GuideDetail.jsx', 'utf8');
const blogDetailJs = fs.readFileSync('c:\\Users\\javit\\OneDrive\\Desktop\\proyect\\src\\pages\\BlogDetail.jsx', 'utf8');

const urls = new Set();
const extractUrls = (text) => {
    const matches = text.match(/https?:\/\/[^"'\s>)]+/g);
    if (matches) {
        matches.forEach(url => {
            if (url.match(/\.(png|jpe?g|svg|webp|gif)$/i) || url.includes('unsplash') || url.includes('ui-avatars')) {
                urls.add(url);
            }
        });
    }
};

extractUrls(dataJs);
extractUrls(guidesDataJs);
extractUrls(guideDetailJs);
extractUrls(blogDetailJs);

console.log(`Checking ${urls.size} URLs...`);

const checkUrl = (url) => {
    return new Promise((resolve) => {
        const reqLib = url.startsWith('https') ? https : http;
        const req = reqLib.get(url, { method: 'HEAD', timeout: 5000 }, (res) => {
            if (res.statusCode >= 400) {
                console.log(`[BROKEN] ${res.statusCode} - ${url}`);
            }
            resolve();
        }).on('error', (e) => {
            console.log(`[ERROR] ${e.message} - ${url}`);
            resolve();
        });
        req.end();
    });
};

const run = async () => {
    const urlArray = Array.from(urls);
    for (let i = 0; i < urlArray.length; i += 10) {
        const chunk = urlArray.slice(i, i + 10);
        await Promise.all(chunk.map(checkUrl));
    }
    console.log('Done checking URLs.');
};
run();
