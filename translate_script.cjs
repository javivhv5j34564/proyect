const fs = require('fs');
const path = require('path');
const dataFilePath = path.join('c:', 'Users', 'javit', 'OneDrive', 'Desktop', 'proyect', 'src', 'data.js');
let content = fs.readFileSync(dataFilePath, 'utf8');

// Replace Spanish in the generated 50 tools
for (let i = 1; i <= 50; i++) {
    content = content.replace(
        \`Una herramienta de inteligencia artificial avanzada para optimizar tus tareas diarias y mejorar tu productividad (IA \${i}).\`,
        \`An advanced artificial intelligence tool to optimize your daily tasks and improve your productivity (AI \${i}).\`
    );
    content = content.replace(
        \`Esta plataforma impulsada por IA te permite automatizar flujos de trabajo tediosos y complejos. Con capacidades avanzadas de procesamiento y un diseño centrado en el usuario, la Herramienta \${i} se integra perfectamente en tu ecosistema digital, ahorrando horas de trabajo manual cada semana. Su rendimiento es destacable en procesamiento masivo de datos.\`,
        \`This AI-powered platform allows you to automate tedious and complex workflows. With advanced processing capabilities and a user-centric design, Tool \${i} integrates seamlessly into your digital ecosystem, saving hours of manual work every week. Its performance is remarkable in massive data processing.\`
    );
    content = content.replace(
        \`'ai, inteligencia artificial, herramientas, productividad, automatización, bots, optimización, software, gratis, freemium, saas, workflow'\`,
        \`'ai, artificial intelligence, tools, productivity, automation, bots, optimization, software, free, freemium, saas, workflow'\`
    );
}

// Replace the 3 Blog Posts entirely
const englishBlogs = \`    {
        id: 'blog-optimizacion-seo-ia',
        title: 'How AI is Revolutionizing SEO in 2026: Strategies That Actually Work',
        category: 'Digital Marketing',
        image: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=600&q=80',
        readTime: '6 min',
        excerpt: 'Discover how search algorithms have evolved and how you can use Artificial Intelligence tools to rank your website without being penalized for "Thin Content".',
        content: 'Traditional SEO is dead. Just a few years ago, repeating a keyword in your text dozens of times was enough to reach the first page of Google or Bing. Today, in 2026, search engines use advanced language models (LLMs) to understand the real intent behind each search. If your content does not directly answer the user\\'s question with depth and originality, you are invisible.\\n\\nThe "Mass-Produced Content" Trap\\nOne of the biggest temptations for website creators is to use ChatGPT or Claude to write thousands of generic articles and publish them without review. This is what Google classifies as "Thin Content" or low-value content. To avoid penalties, AI must be your assistant, not your replacement. Use AI to structure the article\\'s outline, gather recent statistical data, and generate title variations, but the final writing must include real anecdotes, case studies, and a unique tone of voice that no machine can replicate.\\n\\nIdeal Tools for Modern SEO\\nPlatforms like Perplexity AI or Jasper have become the pillars of content marketing. Perplexity is excellent for initial research, as it provides answers citing primary sources that you can include in your article to gain authority (E-E-A-T). On the other hand, specialized semantic SEO tools analyze Top 10 competitors and suggest entities and subtopics you must cover to create the most comprehensive piece of content possible. By combining these tools with meticulous human editing, you will scale your organic traffic safely and profitably.'
    },
    {
        id: 'blog-ia-para-estudiantes',
        title: 'The 5 Artificial Intelligence Tools Every College Student Needs',
        category: 'Education',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
        readTime: '5 min',
        excerpt: 'From note organization to exam simulators. Learn how AI can help you get better grades while studying in less time.',
        content: 'College life has always been characterized by sleepless nights and stress over deadlines. However, the current generation of students has an unfair advantage: virtual assistants just a click away. Far from simply being used to "cheat" on essays, the most sophisticated Artificial Intelligences are being adopted as 24/7 personal tutors. Here we explore how to maximize your academic performance with them.\\n\\nRevolutionizing Note-Taking\\nThe days of frantically transcribing in class are over. Recording and transcription tools based on the Whisper model can process a two-hour class in seconds, offering a perfectly punctuated text. Add to this platforms like Google\\'s NotebookLM, where you can upload all your course readings and "chat" with them. You can ask the system: "Summarize the main arguments of chapter 4 and give me 5 multiple-choice questions to see if I understood it."\\n\\nThesis Writing and Proofreading\\nFor lengthy papers, QuillBot and Grammarly are indispensable. They don\\'t write for you, but they elevate your academic prose to a professional level. They help you avoid accidental plagiarism by restructuring sentences and ensure your tone is appropriately formal. In addition, specialized AIs like Elicit act as research assistants, searching through millions of real scientific articles to find exact references without the risk of "hallucinations" (invented data) that more generalist models sometimes suffer from. Implementing these tools into your daily routine will not only ensure better grades but will give you hours of free time back.'
    },
    {
        id: 'blog-desarrollo-web-ia',
        title: 'Building Web Apps in Record Time: The Impact of Cursor and v0',
        category: 'Programming',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
        readTime: '7 min',
        excerpt: 'Software development is changing. New AIs don\\'t just suggest lines of code; they build entire custom interfaces from basic sketches.',
        content: 'We are no longer in the era of basic autocomplete. Web development has entered a phase where engineers operate more like orchestral conductors than syntax translators. The arrival of AI-native development environments and visual generators has caused the time between having an idea and launching an MVP (Minimum Viable Product) to go from weeks to mere hours.\\n\\nThe End of "Boilerplate" with v0.dev\\nHistorically, starting a React or Next.js project meant hours of setting up the environment, installing component libraries (like Tailwind or Shadcn), and creating the basic structure (buttons, modals, navbars). Today, tools like Vercel\\'s v0 allow you to skip all this. You write a prompt like: "Create a finance dashboard in dark mode with a sidebar chart and a user transactions table," and within 30 seconds you have the complete React code ready to copy and paste into your project. This incredibly empowers both designers without deep React knowledge and backend programmers who hate dealing with CSS.\\n\\nCursor: The Editor That Thinks With You\\nWhile GitHub Copilot popularized AI in the IDE, the Cursor editor has perfected the concept. Being a fork of VS Code, its familiarity is immediate, but its integration of models like Claude 3.5 Sonnet gives it almost magical capabilities. Its "Composer" feature allows for massive refactoring affecting multiple files at once simply by describing what you want in natural language. If there is a console error, Cursor doesn\\'t just read it; it reviews your entire codebase to understand the exact context before providing the implemented solution. For junior developers, it is a constant teacher, and for seniors, the fastest and most efficient assistant they have ever had. If you are still coding entirely "by hand," you are competing at a disadvantage in today\\'s market.'
    }\`;

// The regex needs to match the previously inserted Spanish blogs perfectly.
// Since the user might just want the English blogs, we can use a Regex to replace the 3 Spanish blogs block.
// Let's find the section that contains the 3 blogs by ID.

const startRegex = /    \\{\\n\\s*id: 'blog-optimizacion-seo-ia'[\\s\\S]*'    \\}\\n/g;

// I'll replace the block manually using string methods to be safe.
const startSearch = "    {\n        id: 'blog-optimizacion-seo-ia',";
const endSearch = "programando \"a mano\", estás compitiendo en desventaja en el mercado actual.'\n    }";

const startIndex = content.indexOf(startSearch);
const endIndex = content.indexOf(endSearch);

if (startIndex !== -1 && endIndex !== -1) {
    const fullEndIndex = endIndex + endSearch.length;
    content = content.slice(0, startIndex) + englishBlogs + content.slice(fullEndIndex);
}

fs.writeFileSync(dataFilePath, content, 'utf8');
console.log('Successfully translated 50 tools and 3 blog articles to English.');
