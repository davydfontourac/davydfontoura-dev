import { getProjectsFromNotion } from '../src/services/notion.js';

const run = async () => {
    const projects = await getProjectsFromNotion();
    console.log(JSON.stringify(projects, null, 2));
}

run();
