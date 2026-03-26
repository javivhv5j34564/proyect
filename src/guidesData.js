export const guidesData = [
    {
        id: "chatgpt-prompts-seo",
        title: "Top 10 ChatGPT Prompts for SEO and Content Creation",
        excerpt: "Learn how to optimize your workflow and rank higher on Google using these powerful ChatGPT prompts designed specifically for content creators and SEO specialists.",
        coverImage: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80",
        author: "AI Directory Team",
        date: "March 26, 2026",
        readTime: "5 min read",
        category: "Content Creation",
        content: `
## Introduction
ChatGPT is a powerful tool for SEO, but only if you know how to talk to it. In this guide, we'll cover the top 10 prompts you need to know.

### 1. Keyword Research
Use this prompt to generate keyword ideas:
> "Act as an expert SEO. Give me a list of 20 long-tail keywords related to [topic]. Group them by search intent (Informational, Navigational, Transactional)."

### 2. Meta Descriptions
> "Write 3 engaging meta descriptions under 160 characters for a blog post titled [Title]. Include a strong call to action."

### 3. Content Outlines
> "Create a comprehensive SEO-optimized blog post outline about [Topic]. Include H2 and H3 headings, and suggest where to include statistics or examples."

## Conclusion
Experiment with these prompts and adjust them to your specific niche. The key to getting good results from AI is being specific and providing context.
        `
    },
    {
        id: "midjourney-realistic-images",
        title: "How to Create Photorealistic Images with Midjourney v6",
        excerpt: "A step-by-step guide to mastering parameters, lighting, and camera angles in Midjourney to generate stunning, lifelike photographs.",
        coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
        author: "AI Directory Team",
        date: "March 24, 2026",
        readTime: "8 min read",
        category: "Image Generation",
        content: `
## Getting Started with Midjourney v6
Midjourney v6 brings incredible photorealism, but mastering it requires understanding how to sequence your prompts.

### The Anatomy of a Perfect Prompt
A great Midjourney prompt for realism should include:
1. **Subject:** What is the main focus? (e.g., A portrait of an elderly man)
2. **Environment/Setting:** Where are they? (e.g., in a dimly lit coffee shop)
3. **Lighting:** How is the scene lit? (e.g., volumetric lighting, golden hour, cinematic lighting)
4. **Camera/Film specifics:** What type of camera? (e.g., shot on 35mm lens, Sony A7R IV, f/1.8)

### Example Prompt
> "/imagine prompt: A close-up portrait of an elderly fisherman with deep wrinkles, wearing a yellow raincoat, standing on a dock during a storm, cinematic lighting, shot on 85mm lens, f/1.4, photorealistic, 8k --v 6.0 --style raw"

### Adding Parameters
Use \`--ar 16:9\` for widescreen or \`--ar 9:16\` for vertical portraits. The \`--style raw\` parameter helps reduce the "AI look" and makes the image appear more like a natural photograph.

Practice these concepts and you'll soon be generating indistinguishable-from-reality masterpieces!
        `
    },
    {
        id: "automate-workflow-zapier-openai",
        title: "Automate Your Business: Connecting Zapier with OpenAI",
        excerpt: "Stop doing repetitive tasks. Learn how to connect OpenAI's API to your favorite apps using Zapier to automate emails, data entry, and more.",
        coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        author: "AI Directory Team",
        date: "March 20, 2026",
        readTime: "10 min read",
        category: "Automation",
        content: `
## Why Automate?
Connecting OpenAI to your daily tools can save you dozens of hours a week. Instead of manually reading and categorizing emails, an AI can do it for you instantly.

### Step 1: Create a Zapier Account
Sign up for Zapier and click "Create a Zap". 

### Step 2: Choose your Trigger
For this example, let's use Gmail. Select "New Email" as the trigger. Connect your Gmail account and test the trigger to pull in a recent email.

### Step 3: Add OpenAI Action
Select OpenAI as the action app. Choose "Send Prompt". You will need your OpenAI API key from the OpenAI developer dashboard.

Set up the prompt to analyze the email: 
> "Read the following email and summarize it in one sentence. Then, determine if it is Urgent or Not Urgent. \\n\\nEmail: [Insert Email Body from Step 2]"

### Step 4: Add the Final Action
Now, let's output this data. Add a Slack action: "Send Channel Message". 
Configure the message to send the AI's summary and urgency rating to your #urgent-emails channel.

Turn on your Zap and enjoy your new automated AI assistant!
        `
    }
];
