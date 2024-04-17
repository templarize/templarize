import packageJson from '../package.json';

export const app = {
  name: packageJson.name ?? 'templarize',
  version: packageJson.version ?? 'unknown',
};
