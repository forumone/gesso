/* eslint-disable no-console */

import { confirm, input, select } from '@inquirer/prompts';
import { capitalCase, kebabCase } from 'change-case';
import {
  access,
  lstat,
  mkdir,
  readdir,
  readFile,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';
import {
  type ComponentOptions,
  buildFilePlan,
  buildTemplateData,
  getComponentDir,
  getUsage,
  optionsFromArgs,
  parseArgs,
  renderConfirmation,
  renderFile,
  renderSummary,
  validateArgs,
} from './generator.ts';

// Templates live next to this module, regardless of the working directory.
const templatesDir = path.join(import.meta.dirname, 'templates');

/** Side-effect hooks for the CLI, overridable in tests. */
export interface CliContext {
  /** Theme root: the directory that contains components/. */
  cwd?: string;
  log?: (message: string) => void;
  error?: (message: string) => void;
}

/**
 * Lists the subdirectories of a directory.
 * @param source - Directory to read
 * @returns Paths of the subdirectories
 */
export async function getDirectories(source: string): Promise<string[]> {
  const names = await readdir(source);
  const paths = names.map(name => path.join(source, name));
  const stats = await Promise.all(paths.map(item => lstat(item)));
  return paths.filter((_, index) => stats[index].isDirectory());
}

/**
 * Gets the names of the folders under components/ that can hold a component.
 * @param cwd - Theme root
 */
export async function getValidFolders(cwd: string): Promise<string[]> {
  const directories = await getDirectories(path.join(cwd, 'components'));
  return directories.map(item => path.basename(item));
}

/**
 * Asks for the component options interactively.
 * @param cwd - Theme root
 */
export async function promptForOptions(cwd: string): Promise<ComponentOptions> {
  const nameInput = await input({
    message: 'What is the name of your component?',
    transformer: kebabCase,
    required: true,
    validate: value =>
      kebabCase(value) !== '' || 'Use at least one letter or number.',
  });
  const name = kebabCase(nameInput).trim();

  const titleInput = await input({
    message: 'What is the human-readable title of your component?',
    default: capitalCase(name),
    transformer: capitalCase,
    required: true,
  });
  const title = titleInput.trim();

  const folders = await getValidFolders(cwd);
  const folder = await select({
    message: 'Choose the component location:',
    choices: folders,
  });

  const subfolderInput = await input({
    message: 'Include subfolder or leave blank',
  });
  const js = await confirm({
    message: 'Create a JavaScript file?',
    default: false,
  });

  return { name, title, folder, subfolder: subfolderInput.trim(), js };
}

/**
 * Checks whether a path exists.
 * @param filePath - Path to check
 */
async function pathExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Renders the planned files and writes them under the theme root.
 * @param options - Component options
 * @param cwd - Theme root
 */
export async function writeComponent(
  options: ComponentOptions,
  cwd: string
): Promise<void> {
  const data = buildTemplateData(options);
  const files: { filePath: string; contents: string }[] = [];
  for (const entry of buildFilePlan(options)) {
    const template = await readFile(
      path.join(templatesDir, entry.template),
      'utf-8'
    );
    const file = renderFile(entry, template, data);
    files.push({
      filePath: path.resolve(cwd, file.path),
      contents: file.contents,
    });
  }

  // Check every path before writing so a conflict can't leave a partial
  // component behind.
  const existing: string[] = [];
  for (const { filePath } of files) {
    if (await pathExists(filePath)) {
      existing.push(filePath);
    }
  }
  if (existing.length > 0) {
    throw new Error(
      `Component files already exist:\n  ${existing.join('\n  ')}`
    );
  }

  for (const { filePath, contents } of files) {
    await mkdir(path.dirname(filePath), { recursive: true });
    // 'wx' fails rather than truncating a file that appeared since the check.
    await writeFile(filePath, contents, { encoding: 'utf-8', flag: 'wx' });
  }
}

/**
 * Runs the component generator CLI.
 * @param argv - process.argv
 * @param context - Optional overrides for the working directory and output
 * @returns Process exit code
 */
export async function main(
  argv: string[],
  context: CliContext = {}
): Promise<number> {
  const cwd = context.cwd ?? process.cwd();
  const log = context.log ?? console.log;
  const logError = context.error ?? console.error;

  const parsed = parseArgs(argv);
  const isInteractive = argv.slice(2).length === 0;

  if (parsed.help) {
    log(getUsage());
    return 0;
  }

  let options: ComponentOptions;
  if (isInteractive) {
    options = await promptForOptions(cwd);
  } else {
    const validFolders = await getValidFolders(cwd);
    const errors = validateArgs(parsed, validFolders);
    if (errors.length > 0 || !parsed.name || !parsed.folder) {
      logError('Error: Invalid arguments:');
      errors.forEach(err => logError(`  - ${err}`));
      logError('');
      logError(getUsage());
      return 1;
    }
    options = optionsFromArgs({
      ...parsed,
      name: parsed.name,
      folder: parsed.folder,
    });
  }

  const data = buildTemplateData(options);
  let shouldCreate = true;
  if (isInteractive) {
    log(renderConfirmation(data));
    shouldCreate = await confirm({ message: 'Is this what you want?' });
  } else {
    log(renderSummary(data));
  }

  if (!shouldCreate) {
    logError('Component canceled.');
    return 0;
  }

  try {
    await writeComponent(options, cwd);
  } catch (error) {
    logError(
      `Error: ${error instanceof Error ? error.message : String(error)}`
    );
    return 1;
  }
  log(`Component created at ${getComponentDir(options)}/`);
  return 0;
}

// Run the CLI only when this file is the entry point, not when imported.
if (process.argv[1] && path.resolve(process.argv[1]) === import.meta.filename) {
  process.exitCode = await main(process.argv);
}
