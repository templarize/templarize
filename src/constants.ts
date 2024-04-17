import packageJson from '../package.json';
import type { App } from '~/types/constants';

export const app: App = {
  name: packageJson.name ?? 'templarize',
  version: packageJson.version ?? 'unknown',
};
