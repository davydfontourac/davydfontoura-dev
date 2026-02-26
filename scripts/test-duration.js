const fetch = require('node-fetch');

async function test() {
  const response = await fetch('http://localhost:3001/api/projects');
  const data = await response.json();
  const getProp = (props, name) => {
    const key = Object.keys(props).find(k => k.trim().toLowerCase() === name.toLowerCase());
    return key ? props[key] : null;
  };
  
  const extractText = (richTextArray) => {
    if (!richTextArray || richTextArray.length === 0) return '';
    return richTextArray.map(t => t.plain_text).join('');
  };

  const project = data.find(p => {
    const title = getProp(p.properties, 'Title')?.title?.[0]?.plain_text;
    return title && title.includes('Treis Tecnologia')
  });

  if (project) {
    const durRaw = getProp(project.properties, 'Duration')?.rich_text;
    const durEnRaw = getProp(project.properties, 'Duration_EN')?.rich_text;
    console.log("Duration PT:", extractText(durRaw));
    console.log("Duration EN:", extractText(durEnRaw));
  } else {
    console.log("Projeto não encontrado");
  }
}
test();
