import fs from 'fs';

export default function init(appName: string) {
  const dirPath = `./.${appName}`;

  if (fs.existsSync(dirPath)) {
    console.error(`${appName} directory already exists.`);
    return;
  }

  fs.mkdir(dirPath, (err) => {
    if (err) {
      console.error(`Failed to create ${appName} directory: ${err}`);
    } else {
      console.log(`${appName} directory created successfully.`);
    }
  });
}
