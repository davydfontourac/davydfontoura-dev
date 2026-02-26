// Remove client to avoid browser bundle errors
// The requests will be proxied through our local server or Vercel serverless function

// Helper to extract text from Notion's rich text array
const extractText = (richTextArray) => {
  if (!richTextArray || richTextArray.length === 0) return '';
  return richTextArray.map(t => t.plain_text).join('');
};

// Helper to extract URL from Notion's file object
const extractImageUrl = (filesArray) => {
  if (!filesArray || filesArray.length === 0) return null;
  const file = filesArray[0];
  return file.type === 'external' ? file.external.url : file.file.url;
};

// Helper to extract multiple URLs from Notion's file array
const extractImageUrls = (filesArray) => {
  if (!filesArray || filesArray.length === 0) return [];
  return filesArray.map(file => file.type === 'external' ? file.external.url : file.file.url);
};

// Helper to extract tags from multi-select
const extractTags = (multiSelectArray) => {
  if (!multiSelectArray) return [];
  return multiSelectArray.map(item => item.name);
};

// Remove the direct Notion API check since we aren't using the secret in the browser anymore
export const getProjectsFromNotion = async () => {
  try {
    // Busca a URL da API do ambiente ou usa fallback dinâmico
    const API_URL = import.meta.env.VITE_API_URL || 
                    (import.meta.env.PROD ? '/api/projects' : 'http://localhost:3001/api/projects');
    
    // Fetch from our local proxy or production endpoint
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }
    
    const results = await response.json();

    // Helper para contornar espaços no final do nome das colunas ou variações de case
    const getProp = (props, name) => {
      const key = Object.keys(props).find(k => k.trim().toLowerCase() === name.toLowerCase());
      return key ? props[key] : null;
    };

    const projects = results.map((page) => {
      const props = page.properties;

      return {
        id: page.id, // ID interno do Notion
        title: {
          pt: getProp(props, 'Title')?.title?.[0]?.plain_text || 'Projeto Sem Título',
          en: extractText(getProp(props, 'Title_EN')?.rich_text) || getProp(props, 'Title')?.title?.[0]?.plain_text || 'Untitled Project'
        },
        slug: extractText(getProp(props, 'Slug')?.rich_text).trim(),
        description: {
          pt: extractText(getProp(props, 'Description')?.rich_text) || '',
          en: extractText(getProp(props, 'Description_EN')?.rich_text) || ''
        },
        shortDesc: {
          pt: extractText(getProp(props, 'ShortDescription')?.rich_text) || '',
          en: extractText(getProp(props, 'ShortDescription_EN')?.rich_text) || ''
        },
        fullDescription: {
          pt: extractText(getProp(props, 'FullDescription')?.rich_text) || '',
          en: extractText(getProp(props, 'FullDescription_EN')?.rich_text) || ''
        },
        tech: extractTags(getProp(props, 'TechStack')?.multi_select),
        categories: extractTags(getProp(props, 'Categories')?.multi_select),
        gradient: extractText(getProp(props, 'Gradient')?.rich_text) || 'from-gray-400 to-gray-600', // Degrade de fallback
        status: getProp(props, 'Status')?.select?.name || 'concluido',
        year: extractText(getProp(props, 'Year')?.rich_text),
        duration: {
          pt: extractText(getProp(props, 'Duration')?.rich_text) || '',
          en: extractText(getProp(props, 'Duration_EN')?.rich_text) || ''
        },
        role: {
          pt: extractText(getProp(props, 'Role')?.rich_text) || '',
          en: extractText(getProp(props, 'Role_EN')?.rich_text) || ''
        },
        client: {
          pt: extractText(getProp(props, 'Client')?.rich_text) || '',
          en: extractText(getProp(props, 'Client_EN')?.rich_text) || extractText(getProp(props, 'Client')?.rich_text) || ''
        },
        images: (() => {
          const heroImageUrl = getProp(props, 'HeroImage')?.files && getProp(props, 'HeroImage').files.length > 0 ? extractImageUrl(getProp(props, 'HeroImage').files) : null;
          
          let allImages = [];
          if (heroImageUrl) allImages.push(heroImageUrl);

          // Support for a Gallery column with multiple images
          const galleryFiles = getProp(props, 'Gallery')?.files;
          if (galleryFiles && galleryFiles.length > 0) {
            const galleryUrls = extractImageUrls(galleryFiles);
            allImages = [...allImages, ...galleryUrls];
          }

          // Fallback: Read from the legacy 'Images' text column (comma separated URLs like my migrator did)
          const legacyImagesText = extractText(getProp(props, 'Images')?.rich_text);
          if (legacyImagesText) {
             const legacyUrls = legacyImagesText.split(',').map(u => u.trim()).filter(Boolean);
             allImages = [...allImages, ...legacyUrls];
          }

          // Deduplicate
          return [...new Set(allImages)];
        })(),
        links: {
          live: getProp(props, 'LiveLink')?.url || null,
          github: getProp(props, 'GithubLink')?.url || null,
          case_study: null
        },
        features: {
          pt: extractText(getProp(props, 'Features')?.rich_text)?.split('\n').filter(Boolean) || [],
          en: extractText(getProp(props, 'Features_EN')?.rich_text)?.split('\n').filter(Boolean) || []
        }, 
        seo: {
          title: extractText(getProp(props, 'SEOTitle')?.rich_text),
          description: extractText(getProp(props, 'SEODesc')?.rich_text),
          keywords: extractText(getProp(props, 'SEOKeywords')?.rich_text),
          ogImage: getProp(props, 'HeroImage')?.files && getProp(props, 'HeroImage').files.length > 0 ? extractImageUrl(getProp(props, 'HeroImage').files) : null
        }
      };
    });

    return projects;
  } catch (error) {
    console.error("Error fetching projects from Notion:", error);
    return [];
  }
};
