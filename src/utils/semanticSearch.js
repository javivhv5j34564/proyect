export const semanticSearchTools = (query, dbTools) => {
    if (!query || query.trim() === '') return dbTools;
    const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Semantic dictionary mapping natural language to keywords/sectors (Spanish and English)
    const intentMap = {
        'video': ['video', 'animacion', 'tiktok', 'reels', 'shorts', 'editar video', 'cortos', 'youtube', 'mp4', 'edit', 'animation', 'movies', 'clip', 'audiovisual'],
        'writing': ['escribir', 'texto', 'redactar', 'ensayo', 'blog', 'copy', 'writing', 'write', 'resume', 'cv', 'carta', 'article', 'essay', 'summarize', 'resumir'],
        'image': ['imagen', 'foto', 'diseño', 'dibujar', 'arte', 'logo', 'image', 'picture', 'draw', 'design', 'generador de imagenes', 'art', 'photo', 'painting'],
        'code': ['codigo', 'programar', 'desarrollo', 'web', 'app', 'code', 'programming', 'developer', 'software', 'html', 'css', 'javascript', 'python', 'debug'],
        'audio': ['voz', 'musica', 'audio', 'hablar', 'cantar', 'music', 'voice', 'sound', 'text to speech', 'podcast', 'song', 'mp3', 'speech'],
        'chat': ['hablar', 'chatbot', 'asistente', 'chat', 'preguntas', 'responder', 'assistant', 'talk', 'question', 'answer', 'bot'],
        'marketing': ['ventas', 'seo', 'marketing', 'ads', 'publicidad', 'vender', 'sales', 'analytics', 'campaign', 'campaña'],
        'automation': ['automatizar', 'flujos', 'zapier', 'workflow', 'automate', 'tareas', 'bot', 'task', 'efficiency', 'eficiencia']
    };

    let semanticKeywords = [];
    for (const [category, synonyms] of Object.entries(intentMap)) {
        if (synonyms.some(syn => q.includes(syn))) {
            semanticKeywords.push(category);
            semanticKeywords.push(...synonyms);
        }
    }

    const scoredTools = dbTools.map(tool => {
        let score = 0;
        const tName = tool.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const tDesc = tool.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const tLong = (tool.longDescription || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const tSector = tool.sector.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const tKeywords = (tool.keywords || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        // Exact match points (Super high priority)
        if (tName.includes(q)) score += 100;
        else if (q.includes(tName)) score += 50; // if search contains tool name (e.g., "how to use jasper")

        if (tDesc.includes(q)) score += 30;
        if (tSector.includes(q)) score += 20;
        if (tLong.includes(q)) score += 15;
        if (tKeywords.includes(q)) score += 15;

        // Semantic match points
        if (semanticKeywords.length > 0) {
            semanticKeywords.forEach(kw => {
                if (tSector.includes(kw)) score += 10;
                if (tKeywords.includes(kw)) score += 8;
                if (tDesc.includes(kw)) score += 5;
                if (tLong.includes(kw)) score += 2;
            });
        }

        return { tool, score };
    });

    // Filter tools with score > 0, sort them by score descending
    const results = scoredTools
        .filter(t => t.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(t => t.tool);
    
    return results;
}
