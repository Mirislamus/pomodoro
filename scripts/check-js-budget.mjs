import { readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const assetsDirectory = resolve('dist', 'assets');
const baselineBytes = 771_864;
const maximumBytes = 849_050;

const collectJavaScriptFiles = async directory => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(entry => {
      const path = resolve(directory, entry.name);
      return entry.isDirectory() ? collectJavaScriptFiles(path) : path;
    })
  );

  return files.flat().filter(path => path.endsWith('.js'));
};

const files = await collectJavaScriptFiles(assetsDirectory);

if (files.length === 0) {
  throw new Error(`No JavaScript files found in ${assetsDirectory}`);
}

const sizes = await Promise.all(files.map(async file => (await stat(file)).size));
const totalBytes = sizes.reduce((total, size) => total + size, 0);
const growthPercent = ((totalBytes - baselineBytes) / baselineBytes) * 100;

console.log(
  `Production JavaScript: ${totalBytes} bytes (${growthPercent.toFixed(2)}% vs baseline; limit ${maximumBytes} bytes)`
);

if (totalBytes > maximumBytes) {
  throw new Error(`JavaScript budget exceeded by ${totalBytes - maximumBytes} bytes`);
}
