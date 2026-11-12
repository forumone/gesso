import { describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';

import configLoader, {
  createConfigLoader,
  defaultDependencies,
  jsComment,
  JS_OUTPUT_PATH,
  processConfig,
  sassComment,
  SASS_OUTPUT_PATH,
  stringifyTokens,
  type ConfigLoaderContext,
  type ConfigLoaderDependencies,
} from './configLoader.ts';
import { SassValue } from './SassValue.ts';

const fixture = readFileSync(
  new URL('./__fixtures__/config.fixture.yml', import.meta.url),
  'utf8'
);

type Callback = (err?: Error | null, content?: string) => void;

/** A fake webpack LoaderContext that resolves once the loader calls back. */
function createContext() {
  const emitted: Record<string, string> = {};
  const emitFile = vi.fn((name: string, content: string | Buffer) => {
    emitted[name] = String(content);
  });
  let callback: Callback = () => {};
  const done = new Promise<{ err?: Error | null; content?: string }>(
    resolve => {
      callback = (err, content) => resolve({ err, content });
    }
  );
  const asyncFn = vi.fn(() => callback);
  const context = {
    async: asyncFn,
    emitFile,
  } as unknown as ConfigLoaderContext;

  return { context, emitted, emitFile, asyncFn, done };
}

describe('stringifyTokens', () => {
  it('writes SassValues as plain sass/fallback maps', () => {
    const yaml = stringifyTokens({
      gesso: { a: new SassValue(undefined, 'foo()', '#f00'), b: 1 },
    });

    expect(yaml).toBe(
      'gesso:\n  a:\n    sass: foo()\n    fallback: "#f00"\n  b: 1\n'
    );
    expect(yaml).not.toContain('!sass');
  });
});

describe('processConfig', () => {
  it('produces Sass, JS and YAML output with header comments', async () => {
    const output = await processConfig(fixture);

    expect(
      output.sass.startsWith(
        `${sassComment}${defaultDependencies.eol}$gesso: (`
      )
    ).toBe(true);
    expect(
      output.js.startsWith(
        `${jsComment}${defaultDependencies.eol}export const PALETTE =`
      )
    ).toBe(true);
    expect(output.yaml.startsWith('gesso:\n')).toBe(true);
  });

  // Regression: the comments pointed at the old _patterns/ directory.
  it('points the header comments at source/00-config', () => {
    for (const comment of [sassComment, jsComment]) {
      expect(comment).toContain('source/00-config/config.design-tokens.yml');
      expect(comment).not.toContain('_patterns');
    }
  });

  it('uses the injected dependencies', async () => {
    const deps: ConfigLoaderDependencies = {
      readSource: vi.fn(() => Promise.resolve({} as never)),
      transform: vi.fn(() => ({ data: { gesso: { a: 1 } } }) as never),
      renderSass: vi.fn(() => 'SASS'),
      renderJs: vi.fn(() => 'JS'),
      eol: '\r\n',
    };

    const output = await processConfig('ignored', deps);

    expect(output.sass).toBe(`${sassComment}\r\nSASS`);
    expect(output.js).toBe(`${jsComment}\r\nJS`);
    expect(output.yaml).toBe('gesso:\n  a: 1\n');
    expect(deps.readSource).toHaveBeenCalledWith('ignored');
  });
});

describe('createConfigLoader', () => {
  it('emits the Sass and JS files and calls back with the YAML', async () => {
    const { context, emitFile, asyncFn, done } = createContext();

    const result = createConfigLoader().call(context, fixture);
    const { err, content } = await done;

    // Regression: the loader used to `return source` after calling async().
    expect(result).toBeUndefined();
    expect(asyncFn).toHaveBeenCalledTimes(1);
    expect(err).toBeNull();
    expect(content).toBe((await processConfig(fixture)).yaml);
    expect(emitFile.mock.calls.map(call => call[0])).toEqual([
      SASS_OUTPUT_PATH,
      JS_OUTPUT_PATH,
    ]);
  });

  // Regression: rejected promises never reached the callback.
  it('passes a rejection from readSource to the callback', async () => {
    const { context, emitFile, done } = createContext();
    const failure = new Error('read failed');
    const loader = createConfigLoader({
      ...defaultDependencies,
      readSource: () => Promise.reject(failure),
    });

    loader.call(context, fixture);
    const { err, content } = await done;

    expect(err).toBe(failure);
    expect(content).toBeUndefined();
    expect(emitFile).not.toHaveBeenCalled();
  });

  it('passes an error thrown by transform to the callback', async () => {
    const { context, done } = createContext();
    const failure = new Error('transform failed');
    const loader = createConfigLoader({
      ...defaultDependencies,
      transform: () => {
        throw failure;
      },
    });

    loader.call(context, fixture);

    expect((await done).err).toBe(failure);
  });

  it('passes invalid YAML errors to the callback', async () => {
    const { context, done } = createContext();

    createConfigLoader().call(context, 'gesso:\n  a: [1, 2\n');

    expect((await done).err?.message).toMatch(/YAML error on line \d/);
  });

  it('passes errors thrown while emitting to the callback, once', async () => {
    const { context, emitFile, done } = createContext();
    const failure = new Error('emit failed');
    emitFile.mockImplementation(() => {
      throw failure;
    });
    const callback = vi.fn();
    (context.async as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      (err?: Error | null, content?: string) => {
        callback(err, content);
      }
    );

    createConfigLoader().call(context, fixture);
    await vi.waitFor(() => expect(callback).toHaveBeenCalled());

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(failure, undefined);
    void done;
  });

  it('wraps non-Error rejections', async () => {
    const { context, done } = createContext();
    const loader = createConfigLoader({
      ...defaultDependencies,
      // Deliberately not an Error, to exercise the wrapping.
      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
      readSource: () => Promise.reject('plain string'),
    });

    loader.call(context, fixture);
    const { err } = await done;

    expect(err).toBeInstanceOf(Error);
    expect(err?.message).toBe('plain string');
  });

  it('is the default export, wired to the real pipeline', async () => {
    const { context, emitted, done } = createContext();

    configLoader.call(context, fixture);
    await done;

    expect(Object.keys(emitted)).toEqual([SASS_OUTPUT_PATH, JS_OUTPUT_PATH]);
  });
});

describe('end to end with the fixture YAML', () => {
  it('emits the expected Sass, JS and YAML', async () => {
    const { context, emitted, done } = createContext();

    configLoader.call(context, fixture);
    const { err, content } = await done;

    expect(err).toBeNull();
    // Normalize line endings so snapshots are stable across platforms.
    const normalize = (text: string | undefined) =>
      (text ?? '').replace(/\r\n/g, '\n');

    await expect(normalize(emitted[SASS_OUTPUT_PATH])).toMatchFileSnapshot(
      './__snapshots__/fixture.artifact.scss.snap'
    );
    await expect(normalize(emitted[JS_OUTPUT_PATH])).toMatchFileSnapshot(
      './__snapshots__/fixture.source.js.snap'
    );
    await expect(normalize(content)).toMatchFileSnapshot(
      './__snapshots__/fixture.transformed.yml.snap'
    );
  });
});
