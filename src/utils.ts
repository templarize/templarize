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

/**
 * Recursively retrieves all files in a directory.
 *
 * @param dirPath - The path of the directory to search.
 * @param result - An array to store the paths of the found files.
 * @returns A promise that resolves to an array of file paths.
 */
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

/**
 * Checks if a directory exists at the specified path.
 * @param dirPath - The path of the directory to check.
 * @returns A boolean indicating whether the directory exists or not.
 */
export function checkDirectoryExists(dirPath: string): boolean {
  return fs.existsSync(dirPath);
}
