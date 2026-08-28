/* eslint-disable no-console */

import mustache from '@forumone/tiny-mustache';
import { confirm, input, select } from '@inquirer/prompts';
import { camelCase, capitalCase, kebabCase, pascalCase } from 'change-case';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { EOL } from 'node:os';

/** Allowed SDC output folders under components/. */
const VALID_FOLDERS = ['components', 'layouts', 'templates'];

/**
 * Parses command-line arguments.
 * @param {string[]} argv - process.argv
 * @returns {{name: string|null, folder: string|null, title: string|null, subfolder: string, js: boolean|null, help: boolean}}
 */
function parseArgs(argv) {
  const args = argv.slice(2);
  const parsed = {
    name: null,
    folder: null,
    title: null,
    subfolder: '',
    js: null,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '--name':
        parsed.name = args[++i];
        break;
      case '--folder':
        parsed.folder = args[++i];
        break;
      case '--title':
        parsed.title = args[++i];
        break;
      case '--subfolder':
        parsed.subfolder = args[++i];
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

/**
 * Prints usage information.
 */
function printUsage() {
  console.log(`
Usage: npm run component [options]

Options:
  --name <name>        Component name (required in non-interactive mode)
  --folder <folder>    SDC location: components, layouts, or templates
  --title <title>      Human-readable title (default: Capital Case of name)
  --subfolder <name>   Optional subfolder within the component location
  --js                 Include a JavaScript source file
  --help, -h           Show this help message

Examples:
  npm run component
  npm run component -- --name my-component --folder components
  npm run component -- --name hero --folder components --title "Hero Banner" --js
  npm run component -- --name page-section --folder layouts
`);
}

/**
 * Validates required arguments in non-interactive mode.
 * @param {{name: string|null, folder: string|null}} parsed - Parsed arguments
 */
function validateRequiredArgs(parsed) {
  const errors = [];

  if (!parsed.name) {
    errors.push('--name is required');
  }
  if (!parsed.folder) {
    errors.push('--folder is required');
  }

  if (errors.length > 0) {
    console.error('Error: Missing required arguments:');
    errors.forEach(err => console.error(`  - ${err}`));
    console.error('');
    printUsage();
    process.exit(1);
  }
}

/**
 * Validates that folder is one of the allowed values.
 * @param {string} folder - Folder name to validate
 */
function validateFolder(folder) {
  if (!VALID_FOLDERS.includes(folder)) {
    console.error(`Error: Invalid folder "${folder}".`);
    console.error(`Valid options: ${VALID_FOLDERS.join(', ')}`);
    process.exit(1);
  }
}

/**
 * Prints component summary without confirmation prompt.
 * @param {object} mustacheData - Component data
 */
function printSummary(mustacheData) {
  const output = mustache(
    `Creating SDC:
  Name: {{componentName}}
  Title: {{componentTitle}}
  Location: components/{{componentLocation}}
  JavaScript: {{componentJs}}`,
    mustacheData
  );
  console.log(output);
}

/**
 * Get the machine name from user input.
 * @return {Promise<string>} - Machine name of new component
 */
async function getMachineName() {
  const question = {
    message: 'What is the name of your component?',
    transformer: kebabCase,
    required: true,
  };
  const componentName = await input(question);
  return kebabCase(componentName).trim();
}

/**
 * Get the human-readable name from user input.
 * @param {string} componentName - Machine name of new component
 * @returns {Promise<string>} - Human-readable name of new component
 */
async function getComponentTitle(componentName) {
  const defaultComponentTitle = capitalCase(componentName);
  const question = {
    message: 'What is the human-readable title of your component?',
    default: defaultComponentTitle,
    transformer: capitalCase,
    required: true,
  };
  const componentTitle = await input(question);
  return componentTitle.trim();
}

/**
 * Select the SDC output folder.
 * @returns {Promise<string>} - Name of selected folder
 */
async function getComponentFolder() {
  const question = {
    message: 'Choose the component location:',
    choices: VALID_FOLDERS,
  };
  return select(question);
}

/**
 * Adds the CSS class prefix (e.g. c-) to the name.
 * @param {string} name - The CSS class name.
 * @param {string} directory - The directory where the component should live.
 * @return {string}
 */
function cssPrefix(name, directory) {
  let prefix = '';
  if (directory === 'layouts') {
    prefix = 'l-';
  } else if (directory === 'components') {
    prefix = 'c-';
  }
  return `${prefix}${name}`;
}

/**
 * Storybook section title for the chosen folder.
 * @param {string} directory
 * @returns {string}
 */
function storySection(directory) {
  if (directory === 'layouts') {
    return 'Layouts';
  }
  if (directory === 'templates') {
    return 'Templates';
  }
  return 'Components';
}

/**
 * Gets the name of the optional subdirectory.
 * @returns {Promise<string>} - Subdirectory or empty string if no directory entered
 */
async function getComponentFolderSub() {
  const question = {
    message: 'Include subfolder or leave blank',
  };
  const componentFolderSub = await input(question);
  return componentFolderSub.trim();
}

/**
 * Gets whether to generate a JS file for the component.
 * @returns {Promise<boolean>}
 */
async function getUseJS() {
  const question = {
    message: 'Create a JavaScript file?',
    default: false,
  };
  return confirm(question);
}

/**
 * Confirms whether to create component.
 * @param {object} mustacheData - Data to fill in mustache templates.
 * @returns {Promise<boolean>}
 */
async function confirmComponent(mustacheData) {
  const output = mustache(
    `---
Component Name: {{componentName}}
Component Title: {{componentTitle}}
Component Location: components/{{componentLocation}}
JavaScript: {{componentJs}}
---`,
    mustacheData
  );
  console.log(output);
  const question = {
    message: 'Is this what you want?',
  };
  return confirm(question);
}

/**
 * Creates a file from a template and given mustache data.
 *
 * @param {string} fileName - The name of the final file, with mustache placeholders if required.
 * @param {string} templatePath - The path to the template file to be used as a base for the new file.
 * @param {Object} mustacheData - An object containing key-value pairs for populating the Mustache templates.
 * @return {Promise<string>}
 */
async function createFile(fileName, templatePath, mustacheData) {
  const filePath = mustache(fileName, mustacheData);
  const templateContents = await readFile(path.resolve(templatePath), {
    encoding: 'utf-8',
  });
  const newFileContents = mustache(templateContents, mustacheData);
  const directoryPath = path.dirname(filePath);
  try {
    await access(directoryPath);
  } catch {
    await mkdir(directoryPath, { recursive: true });
  }
  await writeFile(filePath, newFileContents, { encoding: 'utf-8', flag: 'w+' });
  return filePath;
}

/**
 * Normalizes Storybook file spacing to avoid stacked blank lines
 * when optional sections are omitted/added.
 * @param {string} filePath
 * @returns {Promise<void>}
 */
async function normalizeStorySpacing(filePath) {
  const contents = await readFile(filePath, { encoding: 'utf-8' });
  const normalized = contents.replace(
    new RegExp(`${EOL}{3,}`, 'g'),
    `${EOL}${EOL}`
  );
  if (normalized !== contents) {
    await writeFile(filePath, normalized, { encoding: 'utf-8', flag: 'w+' });
  }
}

/**
 * Generates a new SDC based on user input or CLI arguments.
 *
 * @return {Promise<void>}
 */
async function generator() {
  const cliArgs = parseArgs(process.argv);
  const isInteractive = process.argv.slice(2).length === 0;

  if (cliArgs.help) {
    printUsage();
    process.exit(0);
  }

  let componentName,
    componentTitle,
    componentFolder,
    componentFolderSub,
    componentJs;

  if (isInteractive) {
    componentName = await getMachineName();
    componentTitle = await getComponentTitle(componentName);
    componentFolder = await getComponentFolder();
    componentFolderSub = await getComponentFolderSub();
    componentJs = await getUseJS();
  } else {
    validateRequiredArgs(cliArgs);
    validateFolder(cliArgs.folder);

    componentName = kebabCase(cliArgs.name);
    componentTitle = cliArgs.title || capitalCase(componentName);
    componentFolder = cliArgs.folder;
    componentFolderSub = cliArgs.subfolder || '';
    componentJs = cliArgs.js === true;
  }

  const componentLocation = path.join(
    componentFolder,
    kebabCase(componentFolderSub)
  );
  const componentCssClass = cssPrefix(componentName, componentFolder);
  const componentDir = path.join(
    'components',
    componentLocation,
    componentName
  );
  const storybookImportPath = path
    .relative(componentDir, '.storybook')
    .split(path.sep)
    .join('/');

  const mustacheData = {
    // Partials
    jsClassName: '{{#pascalCase}}{{componentName}}{{/pascalCase}}',
    // Variables
    componentName,
    componentTitle,
    componentLocation,
    componentCssClass,
    componentJs,
    storySection: storySection(componentFolder),
    storybookImportPath,
    // These have to be a variable because otherwise Mustache tries to handle the
    // double {{ }} itself
    addAttributes: `{{ add_attributes({ 'class': classes }) }}`,
    // Lambdas
    pascalCase: (text, render) => {
      return pascalCase(render(text));
    },
    camelCase: (text, render) => {
      return camelCase(render(text));
    },
  };

  let shouldCreate = true;

  if (isInteractive) {
    shouldCreate = await confirmComponent(mustacheData);
  } else {
    printSummary(mustacheData);
  }

  if (shouldCreate) {
    const basePath = `./components/{{componentLocation}}/{{componentName}}/{{componentName}}`;

    await createFile(
      `${basePath}.twig`,
      './lib/templates/Component.hbs',
      mustacheData
    );
    await createFile(
      `${basePath}.yml`,
      './lib/templates/Data.hbs',
      mustacheData
    );
    await createFile(
      `${basePath}.component.yml`,
      './lib/templates/ComponentYml.hbs',
      mustacheData
    );
    await createFile(
      `${basePath}.source.scss`,
      './lib/templates/Stylesheet.hbs',
      mustacheData
    );
    await createFile(
      `${basePath}.stories.jsx`,
      './lib/templates/Story.hbs',
      mustacheData
    );
    await normalizeStorySpacing(
      path.join(componentDir, `${componentName}.stories.jsx`)
    );
    if (componentJs) {
      await createFile(
        `${basePath}.source.js`,
        './lib/templates/Javascript.hbs',
        mustacheData
      );
    }

    console.log(`Component created at ${componentDir}/`);
  } else {
    console.error('Component canceled.');
  }
}

generator();
