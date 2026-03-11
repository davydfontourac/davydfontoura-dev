import fs from "node:fs/promises";
import { createWriteStream } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";
import fetch from "node-fetch";
import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Load env
dotenv.config({ path: path.resolve(rootDir, ".env.local") });

const notion = new Client({ auth: process.env.VITE_NOTION_API_KEY });
const databaseId = process.env.VITE_NOTION_DATABASE_ID;

const publicDir = path.join(rootDir, "public");
const imagesDir = path.join(publicDir, "images", "projects");
const manifestPath = path.join(publicDir, "images", "manifest.json");

const extractText = (richTextArray) => {
  if (!richTextArray || richTextArray.length === 0) return '';
  return richTextArray.map(t => t.plain_text).join('');
};

const extractImageUrl = (filesArray) => {
  if (!filesArray || filesArray.length === 0) return null;
  const file = filesArray[0];
  return file.type === 'external' ? file.external.url : file.file.url;
};

const extractImageUrls = (filesArray) => {
  if (!filesArray || filesArray.length === 0) return [];
  return filesArray.map(file => file.type === 'external' ? file.external.url : file.file.url);
};

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  await fs.mkdir(path.dirname(destPath), { recursive: true });
  await pipeline(res.body, createWriteStream(destPath));
}

async function optimizeImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const outputPath = inputPath.replace(ext, ".webp");
  await sharp(inputPath).webp({ quality: 82, effort: 5 }).toFile(outputPath);
  return outputPath;
}

async function getManifest() {
    try {
        const content = await fs.readFile(manifestPath, 'utf-8');
        return JSON.parse(content);
    } catch {
        return { projects: {} };
    }
}

async function saveManifest(manifest) {
    await fs.mkdir(path.dirname(manifestPath), { recursive: true });
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
}

async function sync() {
  if (!process.env.VITE_NOTION_API_KEY || !process.env.VITE_NOTION_DATABASE_ID) {
    console.error("❌ Missing Notion API keys in .env.local");
    process.exit(1);
  }

  console.log("🔍 Fetching projects from Notion...");
  const response = await notion.databases.query({ database_id: databaseId });
  const results = response.results;
  const manifest = await getManifest();
  let changed = false;

  for (const page of results) {
    const props = page.properties;
    const lastEditedTime = page.last_edited_time;
    
    const getProp = (name) => {
      const key = Object.keys(props).find(k => k.trim().toLowerCase() === name.toLowerCase());
      return key ? props[key] : null;
    };

    const title = getProp('Title')?.title?.[0]?.plain_text || 'untitled';
    const slug = extractText(getProp('Slug')?.rich_text).trim();

    if (!slug) continue;

    const currentProjectInManifest = manifest.projects[slug] || {};
    
    // Check if we need to sync: manifest doesn't have it OR Notion version is newer
    if (currentProjectInManifest.lastSync && new Date(lastEditedTime) <= new Date(currentProjectInManifest.lastSync)) {
        console.log(`⏩ Skipping ${title} (Already up to date: ${lastEditedTime})`);
        continue;
    }

    console.log(`\n📦 Syncing project: ${title} (${slug})`);
    changed = true;

    const heroUrl = getProp('HeroImage')?.files?.length > 0 ? extractImageUrl(getProp('HeroImage').files) : null;
    const galleryUrls = getProp('Gallery')?.files?.length > 0 ? extractImageUrls(getProp('Gallery').files) : [];

    const projectDir = path.join(imagesDir, slug);
    await fs.mkdir(projectDir, { recursive: true });

    const optimizedImages = [];

    // Download & Optimize Hero
    if (heroUrl) {
      const heroPath = path.join(projectDir, "hero.jpg");
      try {
        await downloadImage(heroUrl, heroPath);
        await optimizeImage(heroPath);
        await fs.unlink(heroPath);
        optimizedImages.push("hero.webp");
        console.log(`  ✨ Hero optimized`);
      } catch (err) {
        console.error(`  ❌ Hero error:`, err.message);
      }
    }

    // Download & Optimize Gallery
    for (let i = 0; i < galleryUrls.length; i++) {
        const url = galleryUrls[i];
        const galleryPath = path.join(projectDir, `gallery-${i + 1}.jpg`);
        try {
            await downloadImage(url, galleryPath);
            await optimizeImage(galleryPath);
            await fs.unlink(galleryPath);
            optimizedImages.push(`gallery-${i + 1}.webp`);
            console.log(`  ✨ Gallery ${i + 1} optimized`);
        } catch (err) {
            console.error(`  ❌ Gallery ${i + 1} error:`, err.message);
        }
    }

    // Update manifest for this project
    manifest.projects[slug] = {
        lastSync: new Date().toISOString(),
        notionLastEdited: lastEditedTime,
        images: optimizedImages
    };
  }

  if (changed) {
    await saveManifest(manifest);
    console.log("\n✅ Sync finished and manifest updated!");
  } else {
    console.log("\n✨ Everything is already up to date.");
  }
}

sync().catch(err => {
  console.error("❌ Fatal error:", err);
  process.exit(1);
});
