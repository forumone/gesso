// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import assetVersion from './assetVersion.ts';
import { render } from './testUtils.ts';

const r = (template: string) => render(assetVersion, template);

type DrupalWindow = { drupalSettings?: unknown };

describe('asset_version', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete (window as DrupalWindow).drupalSettings;
  });

  it('returns an empty string when there is no version', () => {
    expect(r(`[{{ asset_version() }}]`)).toBe('[]');
  });

  it('returns an empty string when drupalSettings has no gesso key', () => {
    (window as DrupalWindow).drupalSettings = {};
    expect(r(`[{{ asset_version() }}]`)).toBe('[]');
  });

  it('returns the version from drupalSettings', () => {
    (window as DrupalWindow).drupalSettings = {
      gesso: { assetVersion: 'abc123' },
    };
    expect(r(`[{{ asset_version() }}]`)).toBe('[abc123]');
    expect(r(`{% set v = asset_version() %}{{ v ? '?v=' ~ v : '' }}`)).toBe(
      '?v=abc123'
    );
  });

  // Regression: used to throw ReferenceError when `window` isn't defined.
  it('returns an empty string when there is no window', () => {
    vi.stubGlobal('window', undefined);
    expect(r(`[{{ asset_version() }}]`)).toBe('[]');
  });
});
