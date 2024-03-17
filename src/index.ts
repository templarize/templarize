import init from './init';
import packagesJson from '../package.json';
import { Command } from 'commander';

const program = new Command();
const appName = packagesJson.name ?? 'templarize';

// Get current version
program.version(
  `${appName.charAt(0).toUpperCase() + appName.slice(1)} version ${packagesJson.version}`,
  '-v, --version',
  `Get current version of ${appName}`
);

// Show help
program.helpOption('-h, --help', 'Show help for commands');

// Options
program
  .option('-d, --debug', 'Output extra debugging')
  .option('-g, --global', 'Create under user folder');

program
  .command('init')
  .description(`Initialize ${appName}`)
  .action(() => {
    init(appName, Boolean(program.opts().global));
  });

program.parse();
