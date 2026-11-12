import mustache from '@forumone/tiny-mustache';
import { camelCase, capitalCase, kebabCase, pascalCase } from 'change-case';
import path from 'node:path';

/** Parsed command-line arguments. */
export interface ParsedArgs {
  name: string | null;
  folder: string | null;
  title: string | null;
  subfolder: string;
  js: boolean | null;
  help: boolean;
}

/** Resolved inputs needed to generate a component. */
export interface ComponentOptions {
  name: string;
  title: string;
  folder: string;
  subfolder: string;
  js: boolean;
}

/** One file to generate: its path (relative to the theme root) and template. */
export interface FilePlanEntry {
  path: string;
  template: string;
  /** Whether to collapse stacked blank lines after rendering. */
  normalizeSpacing: boolean;
}

/** Rendered file contents, ready to write. */
export interface RenderedFile {
  path: string;
  contents: string;
}

/** Data supplied to the Mustache templates. */
export interface ComponentTemplateData {
  [key: string]: unknown;
  componentName: string;
  componentTitle: string;
  componentLocation: string;
  componentCssClass: string;
  componentJs: boolean;
  storybookImportPath: string;
}

type Render = (text: string) => string;

const STRING_FLAGS = new Set(['--name', '--folder', '--title', '--subfolder']);

/**
 * Parses command-line arguments.
 *
 * A value flag with no value (at the end of the arguments, or followed by
 * another flag) is left unset instead of swallowing the next flag.
 * @param argv - process.argv
 */
export function parseArgs(argv: string[]): ParsedArgs {
  const args = argv.slice(2);
  const parsed: ParsedArgs = {
    name: null,
    folder: null,
    title: null,
    subfolder: '',
    js: null,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    let value: string | undefined;
    if (STRING_FLAGS.has(arg)) {
      const next = args[i + 1];
      if (next !== undefined && !next.startsWith('--')) {
        value = next;
        i++;
      }
    }
    switch (arg) {
      case '--name':
        parsed.name = value ?? null;
        break;
      case '--folder':
        parsed.folder = value ?? null;
        break;
      case '--title':
        parsed.title = value ?? null;
        break;
      case '--subfolder':
        parsed.subfolder = value ?? '';
        break;
      case '--js':
        parsed.js = true;
        break;
      case '--help':
      case '-h':
        parsed.help = true;
        break;
    }
  }

  return parsed;
}

/** Returns the usage text. */
export function getUsage(): string {
  return `
Usage: npm run component [options]

Options:
  --name <name>        Component name (required in non-interactive mode)
  --folder <folder>    SDC location (required in non-interactive mode)
  --title <title>      Human-readable title (default: Capital Case of name)
  --subfolder <name>   Optional subfolder within the component location
  --js                 Include a JavaScript source file
  --help, -h           Show this help message

Examples:
  npm run component
  npm run component -- --name my-component --folder components
  npm run component -- --name hero --folder components --title "Hero Banner" --js
  npm run component -- --name page-section --folder layouts
`;
}

/**
 * Validates arguments for non-interactive mode.
 * @param parsed - Parsed arguments
 * @param validFolders - Folder names that exist under components/
 * @returns Error messages; empty when the arguments are valid
 */
export function validateArgs(
  parsed: ParsedArgs,
  validFolders: string[]
): string[] {
  const errors: string[] = [];

  if (!parsed.name) {
    errors.push('--name is required');
  } else if (kebabCase(parsed.name) === '') {
    errors.push(`--name "${parsed.name}" has no letters or numbers`);
  }
  if (!parsed.folder) {
    errors.push('--folder is required');
  } else if (!validFolders.includes(parsed.folder)) {
    errors.push(
      `Invalid folder "${parsed.folder}". Valid options: ${validFolders.join(', ')}`
    );
  }

  return errors;
}

/**
 * Derives the component options from validated non-interactive arguments.
 * @param parsed - Parsed arguments; name and folder must be set
 */
export function optionsFromArgs(
  parsed: ParsedArgs & { name: string; folder: string }
): ComponentOptions {
  const name = kebabCase(parsed.name);
  return {
    name,
    title: parsed.title || capitalCase(name),
    folder: parsed.folder,
    subfolder: parsed.subfolder || '',
    js: parsed.js === true,
  };
}

/**
 * Adds the CSS class prefix (e.g. c-) to the name.
 * @param name - The CSS class name.
 * @param directory - The directory where the component should live.
 */
export function cssPrefix(name: string, directory: string): string {
  let prefix = '';
  if (directory === 'layouts') {
    prefix = 'l-';
  } else if (directory === 'components') {
    prefix = 'c-';
  }
  return `${prefix}${name}`;
}

/**
 * Gets the location (folder plus optional subfolder) within components/.
 * @param options - Component options
 */
export function getComponentLocation(options: ComponentOptions): string {
  return path.join(options.folder, kebabCase(options.subfolder));
}

/**
 * Gets the directory of the new component, relative to the theme root.
 * @param options - Component options
 */
export function getComponentDir(options: ComponentOptions): string {
  return path.join('components', getComponentLocation(options), options.name);
}

/**
 * Builds the data passed to the Mustache templates.
 * @param options - Component options
 */
export function buildTemplateData(
  options: ComponentOptions
): ComponentTemplateData {
  const storybookImportPath = path
    .relative(getComponentDir(options), '.storybook')
    .split(path.sep)
    .join('/');

  return {
    // Partials
    jsClassName: '{{#pascalCase}}{{componentName}}{{/pascalCase}}',
    // Variables
    componentName: options.name,
    componentTitle: options.title,
    componentLocation: getComponentLocation(options),
    componentCssClass: cssPrefix(options.name, options.folder),
    componentJs: options.js,
    storybookImportPath,
    // These have to be a variable because otherwise Mustache tries to handle the
    // double {{ }} itself
    addAttributes: `{{ add_attributes({ 'class': classes }) }}`,
    // Lambdas
    machineName: (text: string, render: Render) => pascalCase(render(text)),
    humanName: (text: string, render: Render) => camelCase(render(text)),
    pascalCase: (text: string, render: Render) => pascalCase(render(text)),
    camelCase: (text: string, render: Render) => camelCase(render(text)),
    titleCase: (text: string, render: Render) => capitalCase(render(text)),
  };
}

/**
 * Builds the list of files to generate.
 * @param options - Component options
 */
export function buildFilePlan(options: ComponentOptions): FilePlanEntry[] {
  const base = path.join(getComponentDir(options), options.name);
  const plan: FilePlanEntry[] = [
    {
      path: `${base}.twig`,
      template: 'Component.hbs',
      normalizeSpacing: false,
    },
    { path: `${base}.yml`, template: 'Data.hbs', normalizeSpacing: false },
    {
      path: `${base}.component.yml`,
      template: 'ComponentYml.hbs',
      normalizeSpacing: false,
    },
    {
      path: `${base}.source.scss`,
      template: 'Stylesheet.hbs',
      normalizeSpacing: false,
    },
    {
      path: `${base}.stories.jsx`,
      template: 'Story.hbs',
      normalizeSpacing: true,
    },
  ];
  if (options.js) {
    plan.push({
      path: `${base}.source.js`,
      template: 'Javascript.hbs',
      normalizeSpacing: false,
    });
  }
  return plan;
}

/**
 * Collapses runs of three or more newlines (stacked blank lines, left behind
 * when optional template sections are omitted) down to one blank line. Handles
 * both LF and CRLF line endings, regardless of the platform running the CLI.
 * @param contents - File contents
 */
export function normalizeSpacing(contents: string): string {
  return contents.replace(/(?:\r?\n){3,}/g, match =>
    match.includes('\r') ? '\r\n\r\n' : '\n\n'
  );
}

/**
 * Renders one file of the plan.
 * @param entry - Plan entry
 * @param templateContents - Contents of the entry's template
 * @param data - Template data
 */
export function renderFile(
  entry: FilePlanEntry,
  templateContents: string,
  data: ComponentTemplateData
): RenderedFile {
  const contents = mustache(templateContents, data);
  return {
    path: entry.path,
    contents: entry.normalizeSpacing ? normalizeSpacing(contents) : contents,
  };
}

/**
 * Renders the pre-creation summary shown in non-interactive mode.
 * @param data - Template data
 */
export function renderSummary(data: ComponentTemplateData): string {
  return mustache(
    `Creating SDC:
  Name: {{componentName}}
  Title: {{componentTitle}}
  Location: components/{{componentLocation}}
  JavaScript: {{componentJs}}`,
    data
  );
}

/**
 * Renders the summary shown before the interactive confirmation prompt.
 * @param data - Template data
 */
export function renderConfirmation(data: ComponentTemplateData): string {
  return mustache(
    `---
Component Name: {{componentName}}
Component Title: {{componentTitle}}
Component Location: components/{{componentLocation}}
JavaScript: {{componentJs}}
---`,
    data
  );
}
