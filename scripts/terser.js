const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const getFiles = async (dirPath, result) => {
  try {
    const files = await fs.promises.readdir(dirPath, { withFileTypes: true });
    for (const file of files) {
      const filePath = path.join(dirPath, file.name);
      if (file.isDirectory()) {
        await getFiles(filePath, result);
      } else if (/\.js$/.test(filePath)) {
        result.push(filePath);
      }
    }
    return result;
  } catch (err) {
    console.error(err);
    return [];
  }
};

async function main(dir) {
  const files = await getFiles(dir, []);

  for (const file of files) {
    const code = await fs.promises.readFile(file, 'utf8');
    const result = await minify(code, {
      compress: true,
      mangle: true,
      ecma: 2019,
    });

    if (result.code) {
      await fs.promises.writeFile(file, result.code);
    } else {
      console.log(result.error); // Error message
      console.error('Minification failed for file:', file);
    }
  }
}

main('./dist/src/');
