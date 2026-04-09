import fs from 'fs';

// To avoid parsing the whole file properly, let's just run it if we can.
// Actually, data.js is ES module. We can import it.
import { tools } from './src/data.js';

let count = 0;
for (let tool of tools) {
    if (tool.name && tool.name.length > 3) {
        try {
            new RegExp(`\\b(${tool.name})\\b`, 'i');
        } catch (e) {
            console.error("Regex bomb:", tool.name, e);
            count++;
        }
    }
}
console.log("Failed regexes:", count);
