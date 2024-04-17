import fs from 'fs';
import path from 'path';

export async function readConfig(
  dir: string,
): Promise<Array<{ name: string; description: string }>> {
  const result: Array<{ name: string; description: string }> = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      const configFile = path.join(filePath, 'config');
      const supportedExtensions = [
        '.ts',
        '.js',
        '.mts',
        '.cts',
        '.mjs',
        '.cjs',
      ];

      for (const extension of supportedExtensions) {
        const configFilePath = `${configFile}${extension}`;
        if (fs.existsSync(configFilePath)) {
          const { default: config } = await import(
            path.join(process.cwd(), configFilePath)
          );
          const name = path.basename(path.dirname(configFilePath));
          result.push({
            name: name ?? '',
            description: config.description,
          });
          break;
        }
      }
    }
  }

  return result;
}

export async function getFiles(
  dirPath: string,
  result: string[],
): Promise<string[]> {
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

export function checkDirectoryExists(dirPath: string): boolean {
  return fs.existsSync(dirPath);
}
