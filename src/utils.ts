import fs from 'fs';
import path from 'path';

/**
 * Reads the configuration files from the specified directory and returns an array of objects
 * containing the name and description of each configuration.
 *
 * @param dir - The directory to read the configuration files from.
 * @returns A promise that resolves to an array of objects containing the name and description
 * of each configuration.
 */
export async function readConfig(
  dir: string,
): Promise<Array<{ name: string; description: string }>> {
  const result: Array<{ name: string; description: string }> = [];
  const files = await fs.promises.readdir(dir);
  const supportedExtensions = ['.ts', '.js', '.mts', '.cts', '.mjs', '.cjs'];

  await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dir, file);
      if ((await fs.promises.stat(filePath)).isDirectory()) {
        const configFile = path.join(filePath, 'config');

        for (const extension of supportedExtensions) {
          const configFilePath = `${configFile}${extension}`;
          if (fs.existsSync(configFilePath)) {
            const { default: config } = await import(configFilePath);
            const name = path.basename(path.dirname(configFilePath));
            result.push({
              name: name ?? '',
              description: config.description,
            });
            break;
          }
        }
      }
    }),
  );

  return result;
}

/**
 * Checks if a directory exists at the specified path.
 * @param dirPath - The path of the directory to check.
 * @returns A boolean indicating whether the directory exists or not.
 */
export function checkDirectoryExists(dirPath: string): boolean {
  return fs.existsSync(dirPath);
}
