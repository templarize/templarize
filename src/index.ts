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

program.helpOption('-h, --help', 'Show help');

program.command('init', `Initialize ${appName}`).action(() => {
  init(appName);
});

program.parse();

// If nothing is specified
if (program.args.length === 0) {
  console.log(program.opts());
  program.help();
}
