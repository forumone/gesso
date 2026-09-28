import { execSync } from 'node:child_process';

// Playwright's own install check is fast and idempotent, so we only pay the
// cost of `--with-deps` (which shells out to apt) when something is missing.
try {
  execSync('npx --no playwright install --dry-run chromium', {
    stdio: 'pipe',
  });
  console.log('Playwright Chromium already installed, skipping install.');
} catch {
  console.log('Installing Playwright Chromium and its system dependencies...');
  execSync('npx --no playwright install --with-deps chromium', {
    stdio: 'inherit',
  });
}
