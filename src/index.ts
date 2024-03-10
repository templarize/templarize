import fs from 'fs';

const appName = 'templarize';
const argv: string = process.argv[2];

// Get current version from package JSON
function getVersion() {
  fs.readFile('./package.json', 'utf8', (err, data) => {
    if (err) {
      console.error(`Failed to read package.json: ${err}`);
      return;
    }

    const packageJson = JSON.parse(data);
    const version = packageJson.version;

    console.log(`Templarize Version: ${version}`);
  });
}

if (argv === '--version' || argv === '-v') {
  getVersion();
}

function help() {
  console.log(`Usage: ${appName} [--version | -v] [--init] [--help]`);
}

if (!argv || argv === '--help') {
  help();
}

if (argv === '--init' || argv === '-i') {
  const dirPath = `./.${appName}`;

  fs.mkdir(dirPath, (err) => {
    if (err) {
      console.error(`Failed to create ${appName} directory: ${err}`);
    } else {
      console.log(`${appName} directory created successfully.`);
    }
  });
}
