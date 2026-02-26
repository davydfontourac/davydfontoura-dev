import express from 'express';
import cors from 'cors';
import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const app = express();
app.use(cors());
app.use(express.json());

const notion = new Client({
  auth: process.env.VITE_NOTION_API_KEY,
});

const databaseId = process.env.VITE_NOTION_DATABASE_ID;

// Cache simples em memória
let projectsCache = null;
let lastCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos em milissegundos

app.get('/api/projects', async (req, res) => {
  try {
    const now = Date.now();
    
    // Se temos cache válido, retorna imediatamente
    if (projectsCache && (now - lastCacheTime < CACHE_DURATION)) {
      console.log("Servindo do Cache do Servidor");
      return res.json(projectsCache);
    }

    if (!process.env.VITE_NOTION_API_KEY || !process.env.VITE_NOTION_DATABASE_ID) {
      return res.status(500).json({ error: "Chaves do Notion ausentes no servidor." });
    }

    console.log("Consultando Notion API...");
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    
    // Atualiza o cache
    projectsCache = response.results;
    lastCacheTime = now;

    res.json(projectsCache);
  } catch (error) {
    console.error("Erro na API do Notion:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Proxy do Notion rodando na porta ${PORT}`);
});
