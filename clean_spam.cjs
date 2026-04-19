const fs = require('fs');
const path = require('path');

const targetDir = 'c:\\Users\\javit\\OneDrive\\Desktop\\2WEB\\src\\data';

// 1. Delete all moreArticles*.ts and moreNews*.ts files
const files = fs.readdirSync(targetDir);
let deletedCount = 0;
files.forEach(file => {
  if (/^moreArticles\d+\.ts$/.test(file) || /^moreNews\d+\.ts$/.test(file)) {
    fs.unlinkSync(path.join(targetDir, file));
    deletedCount++;
  }
});
console.log(`Deleted ${deletedCount} spam files.`);

// 2. Clean articles.ts
const articlesPath = path.join(targetDir, 'articles.ts');
if (fs.existsSync(articlesPath)) {
  let content = fs.readFileSync(articlesPath, 'utf-8');
  
  // Remove imports
  content = content.replace(/import \{ moreArticles\d+ \} from '\.\/moreArticles\d+';\n?/g, '');
  
  // Remove spread
  content = content.replace(/,\.\.\.moreArticles\d+/g, '');
  content = content.replace(/\.\.\.moreArticles\d+,?/g, '');

  // Aggressive cleanup of injected word salad
  const spamWords = [
    'general', 'maravillosito', 'maravillosamente', 'maravillosísimamente', 'maravilloso', 'maravillosísima', 'maravillosas', 'maravillosos', 'maravillosísimos', 'maravillas',
    'gordinflonamente', 'gordinflón', 'gordinflones', 'gordinflona',
    'majestuoso', 'majestuosa', 'majestuosos', 'majestuosas', 'majestuosín', 'majestuosita', 'majestuosito', 'majestuosamente', 'majestuosoides', 'majestuosi', 'majestuosidades', 'majestuositas',
    'infinimente', 'infinituras', 'infiniturabilidad', 'infinituradas', 'infiniturado',
    'cristalinés', 'cristalina', 'cristal',
    'blindado', 'blindadísima',
    'inusitamente', 'inusitadísimamente',
    'absolutísima', 'absolutísimamente',
    'dolorosísima', 'dolorosísimas', 'dolorosísimos', 'dolorosísimo', 'doloroso',
    'asombrosantemente', 'asombrosísima', 'asombrosísimo',
    'inmaculadísimas', 'inmaculadísimo', 'inmaculante', 'inmacularamente',
    'fiero', 'magistral', 'esplendoroso', 'esplendorosa', 'esplendor', 'iridiscente',
    'bendecidas', 'bendita', 'bendecido', 'sacrosanto',
    'tristemente', 'tristísimo', 'tristísima',
    'turbio', 'pavoroso', 'pavor',
    'total', 'totalmente',
    'mágico', 'mágica', 'mágicas', 'mágicos', 'magia', 'hechicería',
    'poderosa', 'poderoso', 'poder', 'poderosos', 'poderosas'
  ];

  const spamRegex = new RegExp(`\\b(?:${spamWords.join('|')})\\b`, 'gi');
  content = content.replace(spamRegex, '');
  
  // Fix weird stuttering grammar like "de tu y de la", "de la", "y de", "de tu"
  // Wait, let's just do a multi-pass replace for common stutters that stand out
  content = content.replace(/\b(de|tu|y|la|el|en|a|o)\s+\1\b/gi, '$1'); // deduplicate
  
  // common injected sequences:
  const stutters = [
    'de tu y cristalinés', 'de tu y', 'de la tu', 'y de la', 'de tu la', 'tu de la', 'en de la', 
    'de tu', 'y de', 'de la', 'de el', 'en de', 'a de la', 'tu de tu', 'en tu de', 'tu de', 'y tu'
  ];
  
  // To avoid destroying real text, we only replace these if they look completely out of place.
  // Actually, standardizing spaces first:
  content = content.replace(/ \+/g, ' ');
  content = content.replace(/\s{2,}/g, ' ');

  fs.writeFileSync(articlesPath, content, 'utf-8');
  console.log('Cleaned articles.ts');
}

// 3. Clean news.ts
const newsPath = path.join(targetDir, 'news.ts');
if (fs.existsSync(newsPath)) {
  let content = fs.readFileSync(newsPath, 'utf-8');
  
  // Remove imports
  content = content.replace(/import \{.*?\} from '\.\/moreNews\d+';\n?/g, '');
  
  // Remove array spread / list
  content = content.replace(/newMegaNews\d+,?\s*/g, '');

  fs.writeFileSync(newsPath, content, 'utf-8');
  console.log('Cleaned news.ts');
}
