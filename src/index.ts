import { Command } from 'commander';
import { app } from '~/constants';

// Load command functions
import init from '~/commands/init';
import list from '~/commands/list';

const program = new Command();

// Get current version
program.version(
  `${app.name.charAt(0).toUpperCase() + app.name.slice(1)} version ${app.version}`,
  '-v, --version',
  `Get current version of ${app.name}`,
);

// Show help
program.helpOption('-h, --help', 'Show help for commands');

// Options
program.option('-d, --debug', 'Output extra debugging');

program
  .command('init')
  .description(`Initialize ${app.name}`)
  .option('-g, --global', 'Create under user folder')
  .action(function (this: Command) {
    const global = this.opts().global === true;
    init(app.name, global);
  });

// List
program
  .command('list')
  .description(`List all files`)
  .option('-g, --global', 'List under user folder')
  .action(function (this: Command) {
    const global = this.opts().global === true;
    void list(app.name, global);
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
