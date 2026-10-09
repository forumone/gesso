/* eslint-disable no-console */
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

// `playwright install --dry-run` always exits 0, so we can't rely on its exit
// code. Instead, parse the install locations it reports and check that each one
// exists.
const dryRun = execSync('npx --no playwright install --dry-run chromium', {
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'pipe'],
});

const locations = [...dryRun.matchAll(/Install location:\s*(.+)/g)].map(match =>
  match[1].trim()
);

if (locations.length > 0 && locations.every(location => existsSync(location))) {
  console.log('Playwright Chromium already installed, skipping install.');
} else {
  console.log('Installing Playwright Chromium and its system dependencies...');
  execSync('npx --no playwright install --with-deps chromium', {
    stdio: 'inherit',
  });
}
