import fs from 'fs';

export function checkDirectoryExists(dirPath: string): boolean {
  return fs.existsSync(dirPath);
}
