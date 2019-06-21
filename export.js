// @ts-check

'use strict';

const del = require('del');
const fs = require('fs');
const makeDir = require('make-dir');
const { iterate } = require('nani');
const path = require('path');
const util = require('util');

const readSource = require('./lib/readSource');
const transform = require('./lib/transform');
const renderSass = require('./lib/renderSass');

const writeFile = util.promisify(fs.writeFile);

async function main() {
  const outDir = path.join(__dirname, '../out');
  await del(outDir);

  const parsed = await readSource(path.join(__dirname, '../src/gesso.yml'));

  const transformed = transform(parsed);

  const sass = renderSass(transformed.data);

  await makeDir(outDir);

  await Promise.all([
    writeFile(path.join(outDir, 'data.yml'), transformed.ast.toString()),
    writeFile(path.join(outDir, 'tokens.scss'), sass),
  ]);
}

main().catch(error => {
  for (const err of iterate(error)) {
    if (err) {
      console.error(err.message);

      if (err.info) {
        console.error(err.info.source + '\n');
      }
    }
  }

  process.exitCode = 1;
});
