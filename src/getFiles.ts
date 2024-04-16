import fs from 'fs';
import path from 'path';

export default async function getFiles(dirPath: string, result: string[]): Promise<string[]> {
  try {
    const files = await fs.promises.readdir(dirPath, { withFileTypes: true });
    for (const file of files) {
      const filePath = path.join(dirPath, file.name);
      if (file.isDirectory()) {
        await getFiles(filePath, result);
      } else {
        result.push(filePath);
      }
    }
    return result;
  } catch (err: any) {
    console.error(err);
    return [];
  }
}
