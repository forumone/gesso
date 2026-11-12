// @ts-check
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import {
  ensurePlaywrightBrowsers,
  parseInstallLocations,
} from './playwrightBrowsers.js';

vi.mock('node:child_process', () => ({ execSync: vi.fn() }));
vi.mock('node:fs', () => ({ existsSync: vi.fn() }));

const execSyncMock = vi.mocked(execSync);
const existsSyncMock = vi.mocked(existsSync);

const dryRunOutput = `browser: chromium version 1.0
  Install location:    /cache/chromium-1
browser: ffmpeg
  Install location:    /cache/ffmpeg-1  
`;

describe('parseInstallLocations', () => {
  it('extracts and trims every install location', () => {
    expect(parseInstallLocations(dryRunOutput)).toEqual([
      '/cache/chromium-1',
      '/cache/ffmpeg-1',
    ]);
  });

  it('returns an empty list when there are none', () => {
    expect(parseInstallLocations('nothing here')).toEqual([]);
  });
});

describe('ensurePlaywrightBrowsers', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('does not run anything at import time', () => {
    expect(execSyncMock).not.toHaveBeenCalled();
  });

  it('skips the install when all locations exist', () => {
    execSyncMock.mockReturnValueOnce(dryRunOutput);
    existsSyncMock.mockReturnValue(true);
    const log = vi.fn();

    expect(ensurePlaywrightBrowsers({ log })).toBe(false);

    expect(execSyncMock).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith(
      'Playwright Chromium already installed, skipping install.'
    );
  });

  it('installs when a location is missing', () => {
    execSyncMock.mockReturnValueOnce(dryRunOutput);
    existsSyncMock.mockImplementation(path => path !== '/cache/ffmpeg-1');
    const log = vi.fn();

    expect(ensurePlaywrightBrowsers({ log })).toBe(true);

    expect(execSyncMock).toHaveBeenCalledTimes(2);
    expect(execSyncMock).toHaveBeenLastCalledWith(
      'npx --no playwright install --with-deps chromium',
      { stdio: 'inherit' }
    );
  });

  it('installs when the dry run reports no locations', () => {
    execSyncMock.mockReturnValueOnce('unexpected output');

    expect(ensurePlaywrightBrowsers({ log: vi.fn() })).toBe(true);

    expect(existsSyncMock).not.toHaveBeenCalled();
    expect(execSyncMock).toHaveBeenCalledTimes(2);
  });
});
