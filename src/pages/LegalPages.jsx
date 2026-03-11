import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => (
    <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-accent-600 transition-colors bg-white border border-slate-200 hover:border-accent-200 px-4 py-2 rounded-full shadow-sm hover:shadow-md">
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
        <h1>🍪 Cookies Policy</h1>
        <p><em>Last updated: March 2026</em></p>
        
        <h2>🤔 What are cookies?</h2>
        <p>Cookies are small text files that the websites you visit place on your computer or mobile device 💻 to ensure the correct functioning of the site, as well as to provide information to the site owners.</p>
        
        <h2>📋 Types of Cookies We Use</h2>
        <ul>
            <li><strong>🛠️ Essential Cookies:</strong> Necessary for the basic operation of our website.</li>
            <li><strong>📊 Analysis Cookies:</strong> (Google Analytics) They allow us to understand how users interact with the web to improve the overall experience.</li>
            <li><strong>📢 Advertising Cookies:</strong> (Google AdSense) Used by third-party providers, including Google, to show relevant ads. Users can opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:underline">Google Ad Settings</a> or <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:underline">www.aboutads.info</a>.</li>
        </ul>
    </div>
);

export const TermsAndConditions = () => (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16 prose prose-slate">
        <BackButton />
        <h1>⚖️ Terms and Conditions</h1>
        <p><em>Last updated: March 2026</em></p>
        
        <p>Welcome to AI Directory. By accessing this website, we assume you accept these terms and conditions. Do not continue to use AI Directory if you do not agree to all of the terms and conditions stated on this page.</p>

        <h2>1. Services Provided</h2>
        <p>The AI Directory portal aims to provide information about Artificial Intelligence software tools 🤖. The content is for informational purposes only.</p>

        <h2>2. ⚠️ Disclaimer</h2>
        <p>The information contained on this website is for general information purposes only. We are not responsible for changes in subscription prices, features, or terms of use of the referenced third-party tools.</p>

        <h2>3. Affiliate Disclosure 💸</h2>
        <p>Some of the tools and services listed may include affiliate links. This means that if you click on the link and make a purchase, we may receive a small commission at no extra cost to you. This helps support the maintenance of our free directory.</p>
        
        <h2>4. User Responsibilities</h2>
        <p>You agree to use our website only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website.</p>
    </div>
);

export const Contact = () => {
    return (
        <div className="max-w-2xl mx-auto px-4 md:px-6 py-10 md:py-16">
            <BackButton />
            <h1 className="text-3xl font-bold mb-6">📬 Contact</h1>
            <p className="text-slate-600 mb-8">Do you have any questions 🤔, collaboration proposals 🤝, or want to suggest a new Artificial Intelligence 💡? Write to us and we will respond soon ⚡.</p>

            <form action="https://formsubmit.co/f.javiergg06@gmail.com" method="POST" className="space-y-4 shadow-sm bg-white p-5 md:p-8 rounded-2xl border border-slate-200">
                <input type="hidden" name="_next" value={`${window.location.origin}/success`} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="New contact message - AI Directory" />

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">👤 Name or Company</label>
                    <input type="text" name="name" required className="w-full border border-slate-200 rounded-xl p-3.5 focus:ring-2 focus:ring-accent-500 outline-none transition-shadow hover:border-accent-200 bg-slate-50 focus:bg-white" placeholder="Ex. Jane Doe" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">📧 Contact Email</label>
                    <input type="email" name="email" required className="w-full border border-slate-200 rounded-xl p-3.5 focus:ring-2 focus:ring-accent-500 outline-none transition-shadow hover:border-accent-200 bg-slate-50 focus:bg-white" placeholder="email@example.com" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">💬 How can we help you?</label>
                    <textarea name="message" required className="w-full border border-slate-200 rounded-xl p-3.5 focus:ring-2 focus:ring-accent-500 outline-none h-36 transition-shadow hover:border-accent-200 bg-slate-50 focus:bg-white resize-y" placeholder="Write your message or proposal here..."></textarea>
                </div>
                <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 px-6 rounded-xl hover:bg-accent-600 transition-colors shadow-lg shadow-slate-900/10 active:scale-[0.98]">
                    🚀 Send Message
                </button>
            </form>
        </div>
    );
};
