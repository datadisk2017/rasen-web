const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');
const { spawnSync } = require('child_process');

(async () => {
  const root = process.cwd();
  const outDir = path.join(root, 'out');
  const docsDir = path.join(root, 'docs');

  if (!fs.existsSync(outDir)) {
    throw new Error('Expected output directory "out" does not exist. Run `next export` before export-docs.');
  }

  await fsPromises.rm(docsDir, { recursive: true, force: true });
  await fsPromises.cp(outDir, docsDir, { recursive: true });
  await fsPromises.writeFile(path.join(docsDir, '.nojekyll'), '');
  console.log('Copied out to docs and created docs/.nojekyll');

  console.log('Running image patch on docs...');
  const result = spawnSync(process.execPath, [path.join(root, 'scripts', 'patch-docs-images.js')], {
    stdio: 'inherit',
    cwd: root,
  });

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    process.exit(result.status);
  }
})();
