export const promptsCategories = [
  { id: 'all', name: 'All Prompts' },
  { id: 'marketing', name: 'Marketing & SEO' },
  { id: 'coding', name: 'Coding & Development' },
  { id: 'writing', name: 'Writing & Content' },
  { id: 'productivity', name: 'Productivity' },
  { id: 'business', name: 'Business Strategy' },
];

export const promptsData = [
  {
    id: 1,
    title: 'SEO Optimized Blog Post Generator',
    category: 'marketing',
    description: 'Generates a comprehensive, SEO-optimized blog post based on a target keyword.',
    prompt: `Act as an expert SEO copywriter. Write a comprehensive, highly engaging, and SEO-optimized blog post about [INSERT TOPIC]. 
The blog post should include:
- A catchy, click-worthy title
- An engaging introduction with a hook
- H2 and H3 subheadings optimized for search intent
- Bullet points for readability
- A clear conclusion with a strong Call to Action (CTA)
Ensure the tone is [INSERT TONE, e.g., professional, conversational, humorous] and the content is naturally peppered with the keyword "[INSERT KEYWORD]" throughout.`,
    tags: ['SEO', 'Blogging', 'Copywriting']
  },
  {
    id: 2,
    title: 'React Component Generator',
    category: 'coding',
    description: 'Creates a functional React component with Tailwind CSS styling.',
    prompt: `Act as a Senior Frontend React Developer. Create a modern, fully functional, and responsive React component for a [INSERT COMPONENT TYPE, e.g., Pricing Table, Navigation Bar]. 
Requirements:
- Use functional components and React Hooks
- Style it using Tailwind CSS utility classes
- Ensure it is accessible (a11y compliant)
- Make it fully responsive for mobile, tablet, and desktop
- Provide comments explaining key parts of the code`,
    tags: ['React', 'Tailwind', 'Frontend']
  },
  {
    id: 3,
    title: 'Weekly Meal Plan & Grocery List',
    category: 'productivity',
    description: 'Creates a customized meal plan based on dietary restrictions and outputs a grocery list.',
    prompt: `Act as a professional nutritionist and meal planner. Create a 7-day meal plan for me based on the following criteria:
- Dietary restrictions: [INSERT RESTRICTIONS, e.g., Vegan, Gluten-Free, Keto]
- Daily calorie goal: [INSERT CALORIES]
- Meals per day: 3 meals and 1 snack

After detailing the daily meals, please generate an organized grocery list categorized by supermarket sections (Produce, Dairy, Meat, Pantry, etc.) with exact quantities needed.`,
    tags: ['Planning', 'Health', 'Organization']
  },
  {
    id: 4,
    title: 'Cold Email Outreach Framework',
    category: 'business',
    description: 'Drafts a highly converting cold email to potential clients or partners.',
    prompt: `Act as a seasoned B2B Sales Expert. Write a concise, highly converting cold email to a prospective client.
Details:
- Target Audience: [INSERT TARGET AUDIENCE/ROLE]
- My Product/Service: [INSERT YOUR PRODUCT/SERVICE]
- Key Benefit: [INSERT MAIN BENEFIT/VALUE PROP]

The email should:
- Have a personalized, intriguing subject line
- Avoid sounding overly salesy
- Focus on the prospect's pain point and how we solve it
- End with a low-friction, natural Call to Action (like a quick 5-min chat)`,
    tags: ['Sales', 'Email', 'B2B']
  },
  {
    id: 5,
    title: 'Code Review & Refactoring Assistant',
    category: 'coding',
    description: 'Analyzes provided code for bugs, performance issues, and suggests refactoring.',
    prompt: `Act as a Principal Software Engineer. Please review the following code snippet. 
Analyze it for:
1. Potential bugs or edge cases
2. Performance bottlenecks
3. Security vulnerabilities
4. Readability and clean code principles

After your analysis, provide a fully refactored version of the code that implements your suggestions.
Code snippet:
[INSERT CODE HERE]`,
    tags: ['Code Review', 'Refactoring', 'Best Practices']
  },
  {
    id: 6,
    title: 'Brand Voice Identity Creator',
    category: 'marketing',
    description: 'Helps define a clear and unique brand voice for content marketing.',
    prompt: `Act as a Brand Identity Strategist. Help me define the brand voice for my company, [INSERT COMPANY NAME], which operates in the [INSERT INDUSTRY] industry. Our target audience is [INSERT TARGET AUDIENCE].
Please provide:
1. 3-4 primary brand voice adjectives (e.g., authoritative, friendly, disruptive)
2. A 'Do's and Don'ts' list for our copywriters
3. Three short examples of how we would describe our product using this new voice.`,
    tags: ['Branding', 'Strategy', 'Marketing']
  },
  {
    id: 7,
    title: 'Complex Subject Explainer (Feynman Technique)',
    category: 'writing',
    description: 'Explains complex topics simply, adapting to the target audience.',
    prompt: `Act as an expert educator. Explain the concept of [INSERT COMPLEX TOPIC, e.g., Quantum Computing, Blockchain, Inflation] using the Feynman technique. 
Explain it in three different levels of complexity:
1. To a 5-year-old (using simple analogies)
2. To a high school student (using real-world applications)
3. To a college grad (using technical terminology but keeping it clear)`,
    tags: ['Learning', 'Education', 'Simplification']
  },
  {
    id: 8,
    title: 'Meeting Summarizer & Action Item Extractor',
    category: 'productivity',
    description: 'Turns raw meeting notes or transcripts into organized summaries with action items.',
    prompt: `Act as an Executive Assistant. Here is the transcript/notes from our recent meeting:
[INSERT TRANCRIPT/NOTES]

Please provide:
1. A brief executive summary (max 3 sentences)
2. Key decisions made during the meeting
3. A prioritized list of Action Items, indicating who is responsible for what (if mentioned)
4. Any outstanding questions or blocks that need follow-up.`,
    tags: ['Meetings', 'Summary', 'Admin']
  },
  {
    id: 9,
    title: 'AIDA Copywriting Framework Writer',
    category: 'marketing',
    description: 'Generates persuasive copy using the Attention, Interest, Desire, Action framework.',
    prompt: `Act as a master copywriter. Write a persuasive landing page copy for [INSERT PRODUCT/SERVICE] using the AIDA framework.
- Attention: Create a bold, scroll-stopping headline.
- Interest: Explain the problem your target audience [INSERT AUDIENCE] faces and why this matters.
- Desire: Highlight specific benefits, unique selling points, and a brief bit of social proof or transformation.
- Action: Provide a compelling, low-friction Call to Action (CTA).`,
    tags: ['Copywriting', 'AIDA', 'Landing Page']
  },
  {
    id: 10,
    title: 'Bash/DevOps Script Generator',
    category: 'coding',
    description: 'Creates robust and secure bash scripts with error handling for system administration.',
    prompt: `Act as a Senior DevOps Engineer. Write a Bash script that performs the following task: [INSERT TASK PRECISELY, e.g., backups MySQL database, zips it, and moves it to AWS S3].
Requirements:
- Include strict error handling (set -euo pipefail).
- Write comments explaining each major step.
- Use variables for paths and credentials instead of hardcoding them.
- Print clear info/error messages to the terminal during execution.`,
    tags: ['DevOps', 'Bash', 'Scripting']
  },
  {
    id: 11,
    title: 'Mock Interview Prep Assistant',
    category: 'productivity',
    description: 'Simulates a technical or behavioral job interview and provides direct feedback.',
    prompt: `Act as an expert Technical Interviewer for the role of [INSERT ROLE, e.g., Senior Python Developer] at [INSERT COMPANY, e.g., Google or a startup].
You will ask me one interview question at a time. Wait for my response before moving on. 
After I answer, please:
1. Rate my answer out of 10.
2. Provide a brief critique on what I did well and what I missed.
3. Show me the "ideal" model answer.
Let's begin with the first question.`,
    tags: ['Interview', 'Career', 'Practice']
  },
  {
    id: 12,
    title: '30-Day Social Media Content Calendar',
    category: 'marketing',
    description: 'Generates a month-long structured social media strategy with post ideas and formats.',
    prompt: `Act as a Social Media Manager. Create a 30-day social media content calendar for a [INSERT NICHE/BUSINESS, e.g., local specialty coffee shop].
Target audience: [INSERT AUDIENCE].
Primary platforms: [INSERT PLATFORMS, e.g., Instagram reels and LinkedIn].

Format the output as a table with the following columns:
- Day
- Platform
- Content Format (e.g., Carousel, Reel, Story, Text post)
- Topic/Idea
- Main message/Hook
- Suggested Hashtags (3-5)`,
    tags: ['Social Media', 'Planning', 'Content']
  },
  {
    id: 13,
    title: 'Complex SQL Query Builder',
    category: 'coding',
    description: 'Generates optimized SQL queries with explanations for data extraction.',
    prompt: `Act as a Lead Data Engineer. Write an optimized PostgreSQL query to solve the following problem:
[INSERT PROBLEM EXPLANATION, e.g., Find the top 3 customers by revenue per region over the last 6 months].

Here is the schema of the available tables:
[INSERT SCHEMA OR TABLE STRUCTURES]

Please output the SQL query clearly, and below it, explain the logic used (especially for any CTEs, Window functions, or JOINs you utilize). Ensure the query handles edge cases like null values.`,
    tags: ['SQL', 'Database', 'Data Analysis']
  },
  {
    id: 14,
    title: 'Agile Sprint Planning & User Stories',
    category: 'business',
    description: 'Breaks down a large feature into manageable Agile User Stories with acceptance criteria.',
    prompt: `Act as an expert Agile Product Owner. We are building a new feature: [INSERT FEATURE DESCRIPTION, e.g., a multi-factor authentication system].
Please break this feature down into 4 to 6 detailed User Stories. 
For each User Story, use the standard format:
- Title
- Description (As a [type of user], I want [an action] so that [a benefit])
- Acceptance Criteria (List at least 3 bullet points with Definition of Done)
- Estimated Story Points (using Fibonacci scale)`,
    tags: ['Agile', 'Product Management', 'Scrum']
  },
  {
    id: 15,
    title: 'Advanced Regular Expression (Regex) Builder',
    category: 'coding',
    description: 'Generates complex Regex patterns with detailed step-by-step explanations.',
    prompt: `Act as a Regex Expert. Write a Regular Expression pattern for [INSERT PROGRAMMING LANGUAGE, e.g., JavaScript].
I need the Regex to match the following rules precisely:
[INSERT RULES, e.g., Validates a standard international phone number containing an optional + symbol, followed by 10 to 15 digits, allowing spaces or hyphens].

Return the regex block. Below the regex, break down what each specific group/character class in the regex is doing so I can fully understand it. Provide 3 strings that would MATCH, and 3 strings that would FAIL.`,
    tags: ['Regex', 'Development', 'Validation']
  },
  {
    id: 16,
    title: 'Customer Support Escalation Responder',
    category: 'writing',
    description: 'Drafts empathetic and professional responses for difficult customer situations.',
    prompt: `Act as a Tier-3 Customer Support Lead. Draft an email response to an extremely frustrated customer. 
Context: [INSERT SITUATION, e.g., their package was lost for 2 weeks, and the previous support agent was unhelpful].
Information to relay: [INSERT RESOLUTION, e.g., we are refunding them fully and giving them a $50 store credit].

The email must:
- Show deep empathy and take accountability.
- De-escalate the tension immediately without making excuses.
- Clearly explain the resolution in simple terms.
- Use a highly professional yet warm and human tone.`,
    tags: ['Support', 'Customer Success', 'Communication']
  },
  {
    id: 17,
    title: 'Creative Story & Plot Outline',
    category: 'writing',
    description: 'Helps brainstorm and outline narrative arcs for creative writing projects.',
    prompt: `Act as a best-selling Novelist. Help me outline a story in the [INSERT GENRE, e.g., Sci-Fi Thriller] genre.
The main premise is: [INSERT PREMISE].

Develop a comprehensive plot outline using the "Save the Cat!" beat sheet structure. Make sure to define:
- The Protagonist's main internal flaw
- The Inciting Incident
- The Midpoint twist
- The "Dark Night of the Soul" moment
- The Finale resolution.`,
    tags: ['Storytelling', 'Creative', 'Books']
  },
  {
    id: 18,
    title: 'Brainstorming / Lateral Thinking Idea Generator',
    category: 'business',
    description: 'Generates out-of-the-box ideas using lateral thinking techniques.',
    prompt: `Act as an expert Creative Strategist. Use lateral thinking (like Edward de Bono's Six Thinking Hats or SCAMPER technique) to generate highly unconventional, un-boring ideas for:
[INSERT PROBLEM/GOAL, e.g., marketing a boring B2B accounting software].

Give me 10 completely wild, out-of-the-box ideas. Do not give generic advice. Aim for concepts that feel disruptive, surprising, and visually striking.`,
    tags: ['Brainstorming', 'Innovation', 'Ideas']
  },
  {
    id: 19,
    title: 'Legal Contract Summarizer and Risk Identifier',
    category: 'productivity',
    description: 'Summarizes complex legal jargon and highlights potential risks for laypeople.',
    prompt: `Act as an experienced Corporate Lawyer. I am going to paste a section of a legal contract below. 
Please do two things:
1. Translate the legalese into simple, plain English (5th-grade reading level) so I understand exactly what it means.
2. Boldly highlight any potential "red flags", liabilities, or unusual clauses that heavily favor the other party.

Contract Text:
[INSERT CONTRACT TEXT HERE]`,
    tags: ['Legal', 'Analysis', 'Summary']
  },
  {
    id: 20,
    title: 'UI/UX Design Concept Generator',
    category: 'coding',
    description: 'Generates detailed UI/UX plans, layout ideas, and color palettes for web apps.',
    prompt: `Act as a Lead UI/UX Product Designer. I am building a [INSERT KIND OF APP, e.g., habit-tracking mobile app]. 
Please provide a comprehensive UI/UX design specification that includes:
- A suggested color palette (with exact hex codes) focusing on [INSERT VIBE, e.g., calming and minimalist].
- Suggested modern typography pairings (Google Fonts).
- A detailed layout describing the Main Dashboard (header, sidebar, main content area, key interactive elements).
- 3 micro-interaction ideas to make the app feel alive and premium.`,
    tags: ['Design', 'UI/UX', 'Frontend']
  },
  {
    id: 21,
    title: 'Midjourney/DALL-E Prompt Engineer',
    category: 'productivity',
    description: 'Generates highly detailed visual prompts for AI image generation tools.',
    prompt: `Act as a professional AI Artist and Prompt Engineer. I want to generate an image of [INSERT SUBJECT, e.g., a cybernetic samurai in a neon city].
Please write 3 highly detailed, optimized prompts for Midjourney/DALL-E. 
Include specific details for:
- Camera lens (e.g., 35mm, wide angle)
- Lighting (e.g., cinematic, rim lighting, golden hour)
- Artistic style/medium (e.g., hyper-realistic, oil painting, Unreal Engine 5 render)
- Color grading
Make sure the prompts are comma-separated and highly descriptive.`,
    tags: ['AI Art', 'Design', 'Midjourney']
  },
  {
    id: 22,
    title: 'Cold Email Outreach Sequence',
    category: 'business',
    description: 'Writes a high-converting B2B cold email sequence for outreach.',
    prompt: `Act as an expert B2B Copywriter. Write a 3-step cold email sequence targeting [INSERT TARGET AUDIENCE, e.g., VP of Marketing at SaaS companies].
My product is [INSERT PRODUCT/SERVICE] which solves [INSERT MAIN PAIN POINT].

The sequence should include:
1. Email 1: A short, punchy introduction focusing on their pain point and a soft CTA.
2. Email 2 (Follow-up 3 days later): Provide a quick case study or statistic proving ROI.
3. Email 3 (Break-up email 7 days later): A professional "closing the file" email to trigger FOMO.
Keep all emails under 120 words. No corporate jargon. Tone: Confident and helpful.`,
    tags: ['Sales', 'Email', 'B2B']
  },
  {
    id: 23,
    title: 'Code Reviewer & Security Auditor',
    category: 'coding',
    description: 'Analyzes code for bugs, performance issues, and security vulnerabilities.',
    prompt: `Act as a Senior Principal Software Engineer and Security Auditor. Review the following [INSERT LANGUAGE] code block.
1. Identify any logic bugs or edge cases that might fail.
2. Point out any security vulnerabilities (e.g., SQL injection, XSS, memory leaks).
3. Suggest performance optimizations (Big O complexity improvements).
4. Provide the fully refactored, clean, and well-commented version of the code snippet.

Code to review:
[INSERT CODE HERE]`,
    tags: ['Audit', 'Security', 'Refactor']
  },
  {
    id: 24,
    title: 'YouTube Retention Hook & Script',
    category: 'marketing',
    description: 'Writes a YouTube script optimized for maximum audience retention (MrBeast style).',
    prompt: `Act as a top-tier YouTube Retention Strategist. Write the first 60 seconds (Hook and Intro) of a YouTube video titled: [INSERT TITLE].
The goal is to maximize the AVD (Average View Duration).
Use the following structure:
- 0:00-0:05: A massive visual or verbal pattern interrupt (The Hook).
- 0:05-0:30: The Promise (what the viewer will get if they keep watching) and raising the stakes.
- 0:30-0:60: A rapid transition into the first main point of the video without wasting time.
Provide visual cues/b-roll suggestions in brackets like [B-ROLL: fast zoom on face].`,
    tags: ['YouTube', 'Video', 'Content']
  },
  {
    id: 25,
    title: 'Personal Development Routine Builder',
    category: 'productivity',
    description: 'Creates a highly optimized daily routine based on your goals and chronotype.',
    prompt: `Act as a Peak Performance Coach (like Andrew Huberman). I want to build a scientifically optimized daily routine.
My main goal is: [INSERT GOAL, e.g., to write a book while working a 9-5 job].
My natural chronotype/energy level is: [INSERT ENERGY PEAK, e.g., I have the most energy early in the morning].

Design a detailed daily schedule from waking up to sleeping. Include:
- Blocks for Deep Work and breaks (Pomodoro/90-min cycles).
- Suggestions for habit stacking.
- Advice on optimizing my environment to reduce friction for this specific goal.`,
    tags: ['Coaching', 'Habits', 'Life Hack']
  }
];
