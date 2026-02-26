import fetch from 'node-fetch';

async function debugSlugs() {
  try {
    const response = await fetch('http://localhost:3001/api/projects');
    const data = await response.json();
    console.log("=== DEBUG SLUGS ===");
    data.forEach(p => {
      const title = p.properties.Title?.title?.[0]?.plain_text;
      const slug = p.properties.Slug?.rich_text?.[0]?.plain_text;
      console.log(`Title: "${title}" | Slug: "${slug}"`);
    });
  } catch (err) {
    console.error("Error fetching projects:", err.message);
  }
}

debugSlugs();
