import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const notion = new Client({ auth: process.env.VITE_NOTION_API_KEY });
const DATABASE_ID = process.env.VITE_NOTION_DATABASE_ID;

const getSchema = async () => {
    try {
        const response = await notion.databases.retrieve({ database_id: DATABASE_ID });
        console.log("Database Properties Schema:");
        Object.entries(response.properties).forEach(([key, value]) => {
            console.log(`- ${key}: ${value.type}`);
        });
    } catch (error) {
        console.error("Erro ao buscar schema:", error.message);
    }
};

getSchema();
