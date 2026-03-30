import { useEffect } from 'react';

export function useSEO({ title, description, schema }) {
    useEffect(() => {
        if (title) {
            document.title = title;

            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) ogTitle.setAttribute('content', title);

            const twitterTitle = document.querySelector('meta[property="twitter:title"]');
            if (twitterTitle) twitterTitle.setAttribute('content', title);
        }

        if (description) {
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) metaDescription.setAttribute('content', description);

            const ogDesc = document.querySelector('meta[property="og:description"]');
            if (ogDesc) ogDesc.setAttribute('content', description);

            const twitterDesc = document.querySelector('meta[property="twitter:description"]');
            if (twitterDesc) twitterDesc.setAttribute('content', description);
        }

        // Canonical URL logic
        const url = window.location.origin + window.location.pathname;
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', url);

        if (schema) {
            let script = document.querySelector('script[type="application/ld+json"]');
            if (!script) {
                script = document.createElement('script');
                script.setAttribute('type', 'application/ld+json');
                document.head.appendChild(script);
            }
            script.textContent = JSON.stringify(schema);
        }

        return () => {
            if (schema) {
                const script = document.querySelector('script[type="application/ld+json"]');
                if (script) {
                    script.remove();
                }
            }
            // Optional: You could clean up the canonicalLink here, but usually it's fine 
            // to leave it and overwrite on next navigation to prevent split second canonical drops.
        };
    }, [title, description, schema]);
}
