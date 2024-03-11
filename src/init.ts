import fs from 'fs';
import path from 'path';

export default function init(appName: string, global: boolean) {
  let dirPath: string;

  if (global) {
    dirPath = path.join(process.env.HOME || '', `.${appName}`);
  } else {
    dirPath = `./.${appName}`;
  }

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
