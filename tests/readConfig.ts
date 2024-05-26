import { readConfig } from '~/utils';
import { test } from 'vitest';
import path from 'path';

test('reads config', async ({ expect }) => {
  const configDir = path.join('tests', 'example');
  const configs = await readConfig(configDir);
  expect(configs).toEqual([
    { name: 'component', description: 'Create a new component' },
    { name: 'component-dev', description: 'Create a new component (dev)' },
  ]);
});
