import { readConfig, checkDirectoryExists } from '~/utils';
import columnify from 'columnify';
import path from 'path';

export default async function list(
  appName: string,
  global: boolean,
): Promise<void> {
  let dirPath: string;
  const homeDir: string = process.env.HOME ?? process.env.USERPROFILE ?? '';

  if (global) {
    dirPath = path.join(homeDir, `.${appName}`);
  } else {
    dirPath = path.join(process.cwd(), `./.${appName}`);
  }

  if (!checkDirectoryExists(dirPath)) {
    console.error('Directory does not exist');
    return;
  }

  const configs = await readConfig(dirPath);
  const data = configs.map((config) => {
    return {
      name: config.name,
      description: config.description,
    };
  });

  console.log(columnify(data, { showHeaders: false }));
}
