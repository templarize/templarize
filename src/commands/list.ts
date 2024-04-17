import { readConfig, checkDirectoryExists } from '~/utils';
import columnify from 'columnify';

export default async function list(dir: string): Promise<void> {
  if (!checkDirectoryExists(dir)) {
    console.error('Directory does not exist');
    return;
  }

  const configs = await readConfig(dir);
  const data = configs.map((config) => {
    return {
      name: config.name,
      description: config.description,
    };
  });

  console.log(columnify(data, { showHeaders: false }));
}
