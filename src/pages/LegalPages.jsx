import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => (
    <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-accent-600 transition-colors bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 hover:border-accent-200 px-4 py-2 rounded-full shadow-sm dark:shadow-none hover:shadow-md">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
        </Link>
    </div>
);
export const PrivacyPolicy = () => (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16 prose prose-slate">
        <BackButton />
        <h1>🛡️ Privacy Policy</h1>
        <p><em>Last updated: March 2026</em></p>

        <h2>1. Information We Collect</h2>
        <p>At AI Directory, we respect your privacy and are committed to protecting your personal data. We only collect data that you voluntarily provide to us through the contact form and through the use of analytical and advertising cookies 🍪.</p>
        <p>If you contact us directly, we may receive additional information about you such as your name, email address, the contents of the message, and any other information you may choose to provide.</p>

        <h2>2. How We Use Your Information</h2>
        <p>We use your data to improve website performance, analyze traffic (Google Analytics 📈), and show relevant advertisements provided by third parties such as Google AdSense.</p>

        <h2>3. Google AdSense Advertising and Cookies 👁️</h2>
        <p>We use Google AdSense to serve ads when you visit our website. Third-party vendors, including Google, use cookies to serve relevant ads based on a user's prior visits to our website or other websites on the Internet.</p>
        <p>Users can opt out of personalized advertising. To do so, you can access Google Ad Settings or visit <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:underline">www.aboutads.info</a> to opt out of the use of cookies for personalized advertising by third-party providers.</p>

        <h2>4. Affiliate Links 🤝</h2>
        <p>Some of the tools listed may include affiliate links. This means that if you click and make a purchase, we may receive a small commission at no additional cost to you ✨. This helps us keep the directory free and updated for everyone ❤️.</p>
    </div>
);

export const CookiesPolicy = () => (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16 prose prose-slate">
        <BackButton />
        <h1>🍪 Digital Footprint: Our Cookie Policy</h1>
        <p><em>Current as of: March 2026</em></p>
        
        <h2>🤔 Understanding Cookies</h2>
        <p>Think of cookies as small digital bookmarks. When you browse AI Directory, these tiny text files are stored on your device 💻 to help our website remember your preferences, ensure everything loads correctly, and help us understand how to serve you better.</p>
        
        <h2>📋 The Ingredients: What We Use</h2>
        <p>We categorize our cookies based on their specific role in your browsing experience:</p>
        <ul>
            <li><strong>🛠️ Structural Essentials:</strong> These are the "bones" of our site. Without them, basic navigation and secure access wouldn't function. They are active by default to ensure the site works as intended.</li>
            <li><strong>📊 Insight & Performance:</strong> We use tools like Google Analytics to see the "big picture." These cookies tell us which AI tools are trending and how users move through our site, allowing us to refine the interface and content for everyone.</li>
            <li><strong>📢 Tailored Experiences:</strong> Through Google AdSense and other third-party partners, we display advertisements. These cookies help ensure the ads you see are relevant to your interests rather than random noise.</li>
        </ul>

        <h2>🕹️ You Are in Control</h2>
        <p>We believe in your right to digital privacy. You have the power to manage how you are tracked:</p>
        <ul>
            <li><strong>Personalized Ads:</strong> You can opt-out of interest-based advertising at any time by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:underline">Google Ad Settings</a> or <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:underline">AboutAds.info</a>.</li>
            <li><strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies entirely via their "Privacy" or "Security" menus.</li>
            <li><strong>Consequences:</strong> Please note that disabling all cookies may cause some parts of our directory to behave unexpectedly or lose your saved preferences.</li>
        </ul>
    </div>
);

export const TermsAndConditions = () => (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16 prose prose-slate">
        <BackButton />
        <h1>📜 Terms of Engagement</h1>
        <p><em>Refined: March 2026</em></p>
        
        <p>Welcome to AI Directory. By accessing and navigating our platform, you acknowledge that you have read and agreed to the following terms. If you do not consent to these guidelines, we kindly ask that you discontinue your use of our services.</p>

        <h2>1. Our Mission 🤖</h2>
        <p>AI Directory serves as a curated intelligence hub designed to showcase and categorize Artificial Intelligence software. All content provided is for educational and informational purposes only, aimed at helping you discover the right tools for your specific needs.</p>

        <h2>2. Information Integrity Disclaimer ⚠️</h2>
        <p>While we strive for accuracy, the AI landscape shifts rapidly. Please note:</p>
        <ul>
            <li><strong>Third-Party Changes:</strong> We are not responsible for sudden updates in pricing, feature sets, or service agreements of the external tools listed.</li>
            <li><strong>Independent Verification:</strong> Users are encouraged to verify critical details directly with the software provider before making any financial or operational commitments.</li>
        </ul>

        <h2>3. Ethical Affiliate Disclosure 💸</h2>
        <p>To keep this directory free and accessible to the global community, we utilize affiliate partnerships.</p>
        <ul>
            <li><strong>How it works:</strong> If you choose to purchase a tool through a link on our site, we may earn a small commission.</li>
            <li><strong>Your cost:</strong> This does not result in any additional charges to you.</li>
            <li><strong>Our Integrity:</strong> These commissions help fund our research and maintenance without compromising our editorial standards.</li>
        </ul>
        
        <h2>4. User Conduct & Responsibility</h2>
        <p>By using this site, you agree to act with integrity and respect. You specifically commit to:</p>
        <ul>
            <li><strong>Lawful Use:</strong> Engaging with the site only for legal purposes.</li>
            <li><strong>Non-Interruption:</strong> Avoiding any actions that disrupt, damage, or limit the experience of other users or the functionality of the platform.</li>
            <li><strong>Respectful Access:</strong> Not attempting to scrape or exploit our database in a way that violates our digital rights.</li>
        </ul>
    </div>
);

export const Contact = () => {
    return (
        <div className="max-w-2xl mx-auto px-4 md:px-6 py-10 md:py-16">
            <BackButton />
            <h1 className="text-3xl font-bold mb-6">📬 Contact</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">Do you have any questions 🤔, collaboration proposals 🤝, or want to suggest a new Artificial Intelligence 💡? Write to us and we will respond soon ⚡.</p>

            <form action="https://formsubmit.co/f.javiergg06@gmail.com" method="POST" className="space-y-4 shadow-sm dark:shadow-none bg-white dark:bg-slate-900 p-5 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                <input type="hidden" name="_next" value={`${window.location.origin}/success`} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="New contact message - AI Directory" />

                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">👤 Name or Company</label>
                    <input type="text" name="name" required className="w-full border border-slate-200 dark:border-slate-700/80 rounded-xl p-3.5 focus:ring-2 focus:ring-accent-500 outline-none transition-shadow hover:border-accent-200 bg-slate-50 dark:bg-slate-950 focus:bg-white dark:bg-slate-900" placeholder="Ex. Jane Doe" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">📧 Contact Email</label>
                    <input type="email" name="email" required className="w-full border border-slate-200 dark:border-slate-700/80 rounded-xl p-3.5 focus:ring-2 focus:ring-accent-500 outline-none transition-shadow hover:border-accent-200 bg-slate-50 dark:bg-slate-950 focus:bg-white dark:bg-slate-900" placeholder="email@example.com" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">💬 How can we help you?</label>
                    <textarea name="message" required className="w-full border border-slate-200 dark:border-slate-700/80 rounded-xl p-3.5 focus:ring-2 focus:ring-accent-500 outline-none h-36 transition-shadow hover:border-accent-200 bg-slate-50 dark:bg-slate-950 focus:bg-white dark:bg-slate-900 resize-y" placeholder="Write your message or proposal here..."></textarea>
                </div>
                <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 px-6 rounded-xl hover:bg-accent-600 transition-colors shadow-lg shadow-slate-900/10 active:scale-[0.98]">
                    🚀 Send Message
                </button>
            </form>
        </div>
    );
};
