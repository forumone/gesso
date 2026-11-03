import { confirm, input, select } from '@inquirer/prompts';
import {
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getDirectories,
  getValidFolders,
  main,
  promptForOptions,
  writeComponent,
} from './component.ts';

vi.mock('@inquirer/prompts', () => ({
  confirm: vi.fn(),
  input: vi.fn(),
  select: vi.fn(),
}));

const argv = (...args: string[]) => ['node', 'component.ts', ...args];

let cwd: string;
let logs: string[];
let errors: string[];
const context = () => ({
  cwd,
  log: (m: string) => logs.push(m),
  error: (m: string) => errors.push(m),
});

beforeEach(async () => {
  // A throwaway theme root; tests never touch the real components/ directory.
  cwd = await mkdtemp(path.join(tmpdir(), 'gesso-generator-'));
  await mkdir(path.join(cwd, 'components', 'components'), { recursive: true });
  await mkdir(path.join(cwd, 'components', 'layouts'), { recursive: true });
  await writeFile(path.join(cwd, 'components', 'README.md'), 'not a folder');
  logs = [];
  errors = [];
  vi.resetAllMocks();
});

afterEach(async () => {
  await rm(cwd, { recursive: true, force: true });
});

describe('getDirectories', () => {
  it('lists only subdirectories', async () => {
    const dirs = await getDirectories(path.join(cwd, 'components'));
    expect(dirs.map(d => path.basename(d)).sort()).toEqual([
      'components',
      'layouts',
    ]);
  });
});

describe('getValidFolders', () => {
  it('returns folder names under components/', async () => {
    expect((await getValidFolders(cwd)).sort()).toEqual([
      'components',
      'layouts',
    ]);
  });
});

describe('promptForOptions', () => {
  it('collects options from the prompts', async () => {
    vi.mocked(input)
      .mockResolvedValueOnce('Hero Banner')
      .mockResolvedValueOnce(' Hero Title ')
      .mockResolvedValueOnce(' sub ');
    vi.mocked(select).mockResolvedValueOnce('layouts');
    vi.mocked(confirm).mockResolvedValueOnce(true);

    await expect(promptForOptions(cwd)).resolves.toEqual({
      name: 'hero-banner',
      title: 'Hero Title',
      folder: 'layouts',
      subfolder: 'sub',
      js: true,
    });
    const selectConfig = vi.mocked(select).mock.calls[0][0];
    expect([...selectConfig.choices].sort()).toEqual(['components', 'layouts']);
  });
});

describe('writeComponent', () => {
  it('writes the planned files under the given root', async () => {
    await writeComponent(
      {
        name: 'x-widget',
        title: 'X Widget',
        folder: 'components',
        subfolder: 'sub',
        js: true,
      },
      cwd
    );
    const dir = path.join(cwd, 'components/components/sub/x-widget');
    expect((await readdir(dir)).sort()).toEqual([
      'x-widget.component.yml',
      'x-widget.source.js',
      'x-widget.source.scss',
      'x-widget.stories.jsx',
      'x-widget.twig',
      'x-widget.yml',
    ]);
    const story = await readFile(
      path.join(dir, 'x-widget.stories.jsx'),
      'utf-8'
    );
    expect(story).toContain("import './x-widget.source.js';");
    expect(story).toContain('const XWidget = {');
    expect(story).not.toMatch(/\n{3,}/);
  });
});

describe('main', () => {
  it('prints usage for --help', async () => {
    await expect(main(argv('--help'), context())).resolves.toBe(0);
    expect(logs[0]).toContain('Usage: npm run component');
  });

  it('generates a component non-interactively', async () => {
    const code = await main(
      argv('--name', 'my-thing', '--folder', 'layouts'),
      context()
    );
    expect(code).toBe(0);
    expect(input).not.toHaveBeenCalled();
    expect(logs[0]).toContain('Name: my-thing');
    expect(logs.at(-1)).toBe(
      'Component created at components/layouts/my-thing/'
    );
    const files = await readdir(path.join(cwd, 'components/layouts/my-thing'));
    expect(files).toContain('my-thing.twig');
    expect(files).not.toContain('my-thing.source.js');
  });

  it('adds the JavaScript file with --js', async () => {
    await main(
      argv('--name', 'a', '--folder', 'components', '--js'),
      context()
    );
    const files = await readdir(path.join(cwd, 'components/components/a'));
    expect(files).toContain('a.source.js');
  });

  it('fails with a usage message on missing arguments', async () => {
    await expect(main(argv('--js'), context())).resolves.toBe(1);
    expect(errors.join('\n')).toContain('--name is required');
    expect(errors.join('\n')).toContain('--folder is required');
  });

  it('fails on an invalid folder without writing', async () => {
    await expect(
      main(argv('--name', 'a', '--folder', 'nope'), context())
    ).resolves.toBe(1);
    expect(errors.join('\n')).toContain('Invalid folder "nope"');
    expect(await readdir(path.join(cwd, 'components/components'))).toEqual([]);
  });

  it('runs the prompts when there are no arguments', async () => {
    vi.mocked(input)
      .mockResolvedValueOnce('prompted')
      .mockResolvedValueOnce('Prompted')
      .mockResolvedValueOnce('');
    vi.mocked(select).mockResolvedValueOnce('components');
    vi.mocked(confirm).mockResolvedValueOnce(false).mockResolvedValueOnce(true);

    await expect(main(argv(), context())).resolves.toBe(0);
    expect(logs[0]).toContain('Component Name: prompted');
    expect(logs.at(-1)).toBe(
      'Component created at components/components/prompted/'
    );
    expect(
      await readdir(path.join(cwd, 'components/components/prompted'))
    ).toContain('prompted.twig');
  });

  it('cancels when the interactive confirmation is declined', async () => {
    vi.mocked(input)
      .mockResolvedValueOnce('nope')
      .mockResolvedValueOnce('Nope')
      .mockResolvedValueOnce('');
    vi.mocked(select).mockResolvedValueOnce('components');
    vi.mocked(confirm)
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(false);

    await expect(main(argv(), context())).resolves.toBe(0);
    expect(errors).toEqual(['Component canceled.']);
    expect(await readdir(path.join(cwd, 'components/components'))).toEqual([]);
  });
});
