// @ts-check
/* eslint-disable no-console */
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

/**
 * Extract the install locations reported by `playwright install --dry-run`.
 *
 * @param {string} dryRunOutput
 * @returns {string[]}
 */
export function parseInstallLocations(dryRunOutput) {
  return [...dryRunOutput.matchAll(/Install location:\s*(.+)/g)].map(match =>
    match[1].trim()
  );
}

/**
 * Install Playwright Chromium (and system dependencies) unless it is already
 * installed.
 *
 * `playwright install --dry-run` always exits 0, so we can't rely on its exit
 * code. Instead, parse the install locations it reports and check that each
 * one exists.
 *
 * @param {{ log?: (message: string) => void }} [options]
 * @returns {boolean} True if an install was run, false if it was skipped.
 */
export function ensurePlaywrightBrowsers({ log = console.log } = {}) {
  const dryRun = execSync('npx --no playwright install --dry-run chromium', {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  const locations = parseInstallLocations(dryRun);

  if (
    locations.length > 0 &&
    locations.every(location => existsSync(location))
  ) {
    log('Playwright Chromium already installed, skipping install.');
    return false;
  }

  log('Installing Playwright Chromium and its system dependencies...');
  execSync('npx --no playwright install --with-deps chromium', {
    stdio: 'inherit',
  });
  return true;
}
