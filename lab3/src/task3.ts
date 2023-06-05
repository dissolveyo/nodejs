import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

async function fetchHTMLContent(url: string): Promise<string> {
  try {
    const response = await axios.get(url);
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching HTML content from ${url}:`, error);
    return '';
  }
}

async function createHTMLFiles(jsonFilePath: string) {
  try {
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    const jsonFilename = path.basename(jsonFilePath, '.json');
    const outputFolder = `${jsonFilename}_pages`;

    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }

    for (const url of jsonData) {
      const htmlContent = await fetchHTMLContent(url);
      const filename = url.replace(/[^a-zA-Z0-9]/g, '_') + '.html';
      const filePath = path.join(outputFolder, filename);
      fs.writeFileSync(filePath, htmlContent, 'utf8');
      console.log(`HTML content saved for ${url}`);
    }

    console.log('Process completed successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
}

createHTMLFiles('D:\\uniqUE\\nodejs\\Labs\\nodejs\\lab3\\list.json')
