import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import { projects } from '../src/data/projects.js';

dotenv.config({ path: '.env.local' });

const notion = new Client({ auth: process.env.VITE_NOTION_API_KEY });
const DATABASE_ID = process.env.VITE_NOTION_DATABASE_ID;

const migrate = async () => {
    for (const project of projects) {
        console.log(`Migrando: ${project.title}`);
        
        try {
            await notion.pages.create({
                parent: { database_id: DATABASE_ID },
                properties: {
                    "Title": { title: [{ text: { content: project.title } }] },
                    "Title_EN": { rich_text: [{ text: { content: project.title } }] },
                    "Slug": { rich_text: [{ text: { content: project.slug } }] },
                    "Description": { rich_text: [{ text: { content: project.description.substring(0, 2000) } }] },
                    "Description_EN": { rich_text: [{ text: { content: project.description.substring(0, 2000) } }] },
                    "ShortDescription ": { rich_text: [{ text: { content: project.shortDesc } }] },
                    "ShortDescription_EN": { rich_text: [{ text: { content: project.shortDesc } }] },
                    "FullDescription": { rich_text: [{ text: { content: project.fullDescription.substring(0, 2000) } }] }, 
                    "FullDescription_EN": { rich_text: [{ text: { content: project.fullDescription.substring(0, 2000) } }] }, 
                    "TechStack ": { multi_select: project.tech.map(t => ({ name: t.replace(',', '').trim() })) },
                    "Categories": { multi_select: project.categories.map(c => ({ name: c.replace(',', '').trim() })) },
                    "Gradient ": { rich_text: [{ text: { content: project.gradient } }] },
                    "Status": { select: { name: project.status } },
                    "Year": { rich_text: [{ text: { content: project.year } }] },
                    "Duration": { rich_text: [{ text: { content: project.duration } }] },
                    "Role": { rich_text: [{ text: { content: project.role } }] },
                    "Role_EN": { rich_text: [{ text: { content: project.role } }] },
                    "Client": { rich_text: [{ text: { content: project.client || 'Projeto Pessoal' } }] },
                    "LiveLink": { url: project.links?.live || null },
                    "GithubLink": { url: project.links?.github || null },
                }
            });
            console.log(`✅ Sucesso: ${project.title}`);
        } catch (error) {
            console.error(`❌ Erro ao migrar ${project.title}:`, error.message);
        }
    }
    console.log("Migração finalizada! (Lembre-se de adicionar as imagens manualmente pelo Notion pois a API não permite upload direto de arquivos locais)");
};

migrate();
