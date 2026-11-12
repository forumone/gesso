import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import uniqueId from './uniqueId.ts';
import { render } from './testUtils.ts';

const r = (template: string, context = {}) =>
  render(uniqueId, template, context);

describe('unique_id', () => {
  beforeEach(() => {
    vi.spyOn(Date, 'now').mockReturnValue(1700000000000);
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('appends a deterministic suffix to the value', () => {
    expect(r(`{{ 'tabs'|unique_id }}`)).toBe('tabs--60a24181e41f40');
  });

  it('produces a suffix of at least 14 characters', () => {
    vi.spyOn(Date, 'now').mockReturnValue(0);
    vi.spyOn(Math, 'random').mockReturnValue(0);
    expect(r(`{{ 'a'|unique_id }}`)).toBe('a--00000000000000');
  });

  it('differs when the time changes', () => {
    const first = r(`{{ 'a'|unique_id }}`);
    vi.spyOn(Date, 'now').mockReturnValue(1700000000001);
    expect(r(`{{ 'a'|unique_id }}`)).not.toBe(first);
  });
});
