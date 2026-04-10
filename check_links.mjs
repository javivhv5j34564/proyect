import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Provide __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.resolve(__dirname, 'src', 'data.js');

if (!fs.existsSync(dataPath)) {
    console.error("❌ Cannot find src/data.js. Make sure you run this script from the project root.");
    process.exit(1);
}

const rawData = fs.readFileSync(dataPath, 'utf8');

// Regex to extract tool ID, Name and URL safely from the JS file
const tools = [];
const toolBlockRegex = /"id":\s*"([^"]+)"[\s\S]*?"name":\s*"([^"]+)"[\s\S]*?"url":\s*"([^"]+)"/g;

let match;
while ((match = toolBlockRegex.exec(rawData)) !== null) {
    tools.push({ id: match[1], name: match[2], url: match[3] });
}

console.log(`🔍 Extracted ${tools.length} active links from src/data.js...`);
console.log(`🚀 Starting link verification checker...\n`);

const BATCH_SIZE = 5; // Do not saturate the network
const TIMEOUT_MS = 10000; // 10 seconds timeout

async function checkUrl(tool) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
        // Many web servers block standard FETCH/HEAD without a User-Agent mimicking a real browser
        const response = await fetch(tool.url, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            // Some firewalls return 403 for scripts. We log it but it's suspicious.
            return { ...tool, status: response.status, error: `HTTP ${response.status} ${response.statusText}` };
        }
        return { ...tool, status: response.status, error: null };
    } catch (error) {
        clearTimeout(timeoutId);
        // Abort errors usually mean the server doesn't exist anymore or timed out (DNS failure, etc.)
        const errorMsg = error.name === 'AbortError' ? 'TIMEOUT' : error.message;
        return { ...tool, status: 'FAILED', error: errorMsg };
    }
}

async function verifyAllLinks() {
    if(tools.length === 0){
        console.warn("⚠️ No tools found to verify. Check regex matching.");
        return;
    }

    let brokenLinks = [];
    
    // Batch processing
    for (let i = 0; i < tools.length; i += BATCH_SIZE) {
        const batch = tools.slice(i, i + BATCH_SIZE);
        console.log(`⏳ Batch ${Math.floor(i / BATCH_SIZE) + 1} of ${Math.ceil(tools.length / BATCH_SIZE)}...`);
        
        const results = await Promise.all(batch.map(checkUrl));
        
        for (const res of results) {
            if (res.error) {
                console.log(`  ❌ [${res.name}] - ${res.url} -> ERROR: ${res.error}`);
                brokenLinks.push(res);
            }
        }
        
        // Anti-rate-limit delay between batches (1 second)
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n=======================================');
    console.log(`✅ Scan Complete.`);
    console.log(`✅ Healthy Links: ${tools.length - brokenLinks.length}`);
    console.log(`🚨 Suspicious/Broken links: ${brokenLinks.length}`);
    console.log('=======================================\n');
    
    if (brokenLinks.length > 0) {
        const reportTarget = path.resolve(__dirname, 'broken_links_report.json');
        
        const reportObj = {
            metadata: {
                scannedAt: new Date().toISOString(),
                totalScanned: tools.length,
                totalBroken: brokenLinks.length,
            },
            brokenSites: brokenLinks
        };

        fs.writeFileSync(reportTarget, JSON.stringify(reportObj, null, 2), 'utf-8');
        console.log(`📥 Summary report saved to: broken_links_report.json\n`);
        console.log("NOTE: Some 403/401 errors might just be Cloudflare bots protection blocking this script. Check them manually before deleting from DB.");
    }
}

verifyAllLinks();
