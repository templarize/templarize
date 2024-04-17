import packagesJson from '../package.json';
import { Command } from 'commander';

// Load command functions
import init from './commands/init';
import list from './commands/list';

const program = new Command();
const appName = packagesJson.name ?? 'templarize';

// Get current version
program.version(
  `${appName.charAt(0).toUpperCase() + appName.slice(1)} version ${packagesJson.version}`,
  '-v, --version',
  `Get current version of ${appName}`,
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

// List
program
  .command('list')
  .description(`List all files`)
  .action(() => {
    void list(`./.${appName}`);
  });

// Generate
program
  .command('generate [name]')
  .description(`Generate a new file`)
  .action((name?: string) => {
    if (name !== undefined) {
      console.log(`Generate a new file: ${name}`);
    } else {
      console.error('Please provide a name');
    }
  });

program.parse();
