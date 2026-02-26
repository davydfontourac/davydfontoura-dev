import { Client } from '@notionhq/client';

// Cache simples em memória (efêmero em serverless)
let projectsCache = null;
let lastCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const now = Date.now();
    
    // Check Cache
    if (projectsCache && (now - lastCacheTime < CACHE_DURATION)) {
      console.log("Servindo do Cache (Serverless)");
      return res.status(200).json(projectsCache);
    }

    const notionKey = process.env.VITE_NOTION_API_KEY;
    const databaseId = process.env.VITE_NOTION_DATABASE_ID;

    if (!notionKey || !databaseId) {
      console.error("Variáveis de ambiente ausentes na Vercel.");
      return res.status(500).json({ error: "Configuração do Notion ausente no servidor." });
    }

    const notion = new Client({ auth: notionKey });

    console.log("Consultando Notion API via Serverless...");
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    
    projectsCache = response.results;
    lastCacheTime = now;

    return res.status(200).json(projectsCache);
  } catch (error) {
    console.error("Erro na Serverless Function:", error);
    return res.status(500).json({ error: error.message });
  }
}
