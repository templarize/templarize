import fs from 'fs';
import path from 'path';

export default async function readConfig(
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
