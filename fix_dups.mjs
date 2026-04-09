import fs from 'fs';
import { tools, categories, blogPosts } from './src/data.js';

function removeDuplicates(arr) {
    if (!arr) return arr;
    const seen = new Set();
    return arr.filter(item => {
        if (!item.id) return true;
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
    });
}

const uniqueTools = removeDuplicates(tools);
const uniqueBlogPosts = removeDuplicates(blogPosts);

const newContent = `export const categories = ${JSON.stringify(categories, null, 4)};\n\n` +
`export const tools = ${JSON.stringify(uniqueTools, null, 4)};\n\n` +
`export const blogPosts = ${JSON.stringify(uniqueBlogPosts, null, 4)};\n`;

fs.writeFileSync('src/data.js', newContent, 'utf-8');
console.log('Done mapping unique IDs to data.js!');
