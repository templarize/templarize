import fs from 'fs';
import path from 'path';
import { checkDirectoryExists } from '~/utils';

export default function init(appName: string, global: boolean): void {
  let dirPath: string;
  const homeDir: string = process.env.HOME ?? process.env.USERPROFILE ?? '';

  if (global) {
    dirPath = path.join(homeDir, `.${appName}`);
  } else {
    dirPath = path.join(process.cwd(), `./.${appName}`);
  }

  if (checkDirectoryExists(dirPath)) {
    console.error(`${appName} directory already exists.`);
    return;
  }

  fs.mkdir(dirPath, (err: any) => {
    if (err !== null) {
      console.error(`Failed to create ${appName} directory: ${err}`);
    } else {
      console.log(`${appName} directory created successfully.`);
    }
  });
}
