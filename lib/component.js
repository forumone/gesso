/* eslint-env node */
/* eslint-disable no-console */

import mustache from '@forumone/tiny-mustache';
import { confirm, input, select } from '@inquirer/prompts';
import { camelCase, capitalCase, kebabCase, pascalCase } from 'change-case';
import {
  access,
  lstat,
  mkdir,
  readdir,
  readFile,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';
import { EOL } from 'node:os';
import { parseDocument } from 'yaml';

const __dirname = import.meta.dirname;
const sassPathMatcher = RegExp(/@use (['"]{1})(?<path>.+)\1/);

/**
 * Parses command-line arguments.
 * @param {string[]} argv - process.argv
 * @returns {{name: string|null, folder: string|null, title: string|null, subfolder: string, modularSass: boolean|null, js: boolean|null, help: boolean}}
 */
function parseArgs(argv) {
  const args = argv.slice(2);
  const parsed = {
    name: null,
    folder: null,
    title: null,
    subfolder: '',
    modularSass: null,
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
      case '--no-modular-sass':
        parsed.modularSass = false;
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
  --folder <folder>    Component location (required in non-interactive mode)
  --title <title>      Human-readable title (default: Capital Case of name)
  --subfolder <name>   Optional subfolder within the component location
  --no-modular-sass    Add styles to the global stylesheet instead of a separate CSS file
  --js                 Include a JavaScript file
  --help, -h           Show this help message

Examples:
  npm run component                                    # Interactive mode
  npm run component -- --name my-component --folder 03-components
  npm run component -- --name card --folder 03-components --subfolder Media
  npm run component -- --name hero --folder 03-components --title "Hero Banner" --js
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
 * @param {string[]} validFolders - List of valid folder names
 */
function validateFolder(folder, validFolders) {
  if (!validFolders.includes(folder)) {
    console.error(`Error: Invalid folder "${folder}".`);
    console.error(`Valid options: ${validFolders.join(', ')}`);
    process.exit(1);
  }
}

/**
 * Prints component summary without confirmation prompt.
 * @param {object} mustacheData - Component data
 */
function printSummary(mustacheData) {
  const output = mustache(
    `Creating component:
  Name: {{componentName}}
  Title: {{componentTitle}}
  Location: {{componentLocation}}
  Modular CSS: {{modularSass}}
  JavaScript: {{componentJs}}`,
    mustacheData
  );
  console.log(output);
}

/**
 * Creates the cascade layer name from the directory name.
 * @param {string} directoryName - The directory name
 * @return {string}
 */
function cascadeLayer(directoryName) {
  const parts = directoryName.split('-');
  return parts[parts.length - 1];
}

/**
 * Checks whether the source directory is an accessible directory.
 * @param {node:fs.PathLike} source - Source path
 * @return {Promise<boolean>} - True if source is an accessible directory
 */
async function isDirectory(source) {
  const stats = await lstat(source);
  return stats.isDirectory();
}

/**
 * Get available component directories.
 * @param {node:fs.PathLike} source - Source path
 * @return {Promise<string[]>} - Array of component directory paths
 */
async function getDirectories(source) {
  /** @type {string[]} */
  const directoryFiles = await readdir(source);
  /** @type {string[]} */
  const directoryPaths = directoryFiles
    .filter(
      dirName =>
        ![
          '@types',
          '00-config',
          '04-pages',
          '02-utility',
          'fonts',
          'images',
        ].includes(dirName)
    )
    .map(name => path.join(source, name));
  /** @type {Awaited<boolean>[]} */
  const isDirectoryResults = await Promise.all(directoryPaths.map(isDirectory));
  return directoryPaths.filter((value, index) => isDirectoryResults[index]);
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
 * Select the component folder from available directories.
 * @returns {Promise<string>} - Name of selected folder
 */
async function getComponentFolder() {
  const patternSrc = path.join(process.cwd(), 'source');
  const patternDir = await getDirectories(patternSrc);
  const question = {
    message: 'Choose the component location:',
    choices: patternDir.map(item => path.basename(item)),
  };
  return select(question);
}

/**
 * Adds the CSS class prefix (e.g. c-) to the name.
 * @param {string} name - The CSS class name.
 * @param {string} directory - The directory where the component should live.
 * @return string
 */
function cssPrefix(name, directory) {
  let prefix = '';
  if (cascadeLayer(directory) === 'layouts') {
    prefix = 'l-';
  } else if (cascadeLayer(directory) === 'components') {
    prefix = 'c-';
  }
  return `${prefix}${name}`;
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
 * Gets whether to generate a separate SCSS file for use in a Drupal library.
 * @returns {Promise<boolean>}
 */
async function getUseModularSass() {
  const question = {
    message: 'Create a separate modular CSS file?',
    default: true,
  };
  return confirm(question);
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
Component Location: {{componentLocation}}
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
 * Sort Sass files by file path alphabetically
 * @param fileA - @use statement for fileA
 * @param fileB - @use statement for fileB
 * @returns {number}
 */
function alphabetizeSassImports(fileA, fileB) {
  const resultA = sassPathMatcher.exec(fileA);
  const resultB = sassPathMatcher.exec(fileB);
  if (resultA === null || resultB === null) {
    return 0;
  }
  return resultA.groups.path.localeCompare(resultB.groups.path);
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
 * Add a Sass partial to the nearest index file, maintaining alphabetical order.
 * @param sassFilePath
 * @returns {Promise<void>}
 */
async function addToScssIndex(sassFilePath) {
  const root = path.resolve(__dirname, '..');
  let directoryPath = path.dirname(sassFilePath);
  let indexFile;
  while (directoryPath !== root) {
    try {
      indexFile = await readFile(path.join(directoryPath, '_index.scss'), {
        encoding: 'utf-8',
      });
      break;
    } catch {
      directoryPath = path.join(directoryPath, '..');
    }
  }
  const pathToSass = path.relative(directoryPath, path.dirname(sassFilePath));
  const sassPartial = path.basename(sassFilePath, '.scss').replace(/^_{1}/, '');
  const indexFileStatements = indexFile.split(EOL);
  indexFileStatements.push(`@use '${path.join(pathToSass, sassPartial)}';`);
  indexFileStatements.sort(alphabetizeSassImports);
  await writeFile(
    path.join(directoryPath, '_index.scss'),
    indexFileStatements.join(EOL)
  );
}

/**
 * Generates a new component based on user input or CLI arguments.
 *
 * @return {Promise<void>}
 */
async function generator() {
  const cliArgs = parseArgs(process.argv);
  const isInteractive = process.argv.slice(2).length === 0;

  // Handle --help flag
  if (cliArgs.help) {
    printUsage();
    process.exit(0);
  }

  let componentName,
    componentTitle,
    componentFolder,
    componentFolderSub,
    modularSass,
    componentJs;

  if (isInteractive) {
    // Interactive mode - existing behavior
    componentName = await getMachineName();
    componentTitle = await getComponentTitle(componentName);
    componentFolder = await getComponentFolder();
    componentFolderSub = await getComponentFolderSub();
    modularSass = await getUseModularSass();
    componentJs = await getUseJS();
  } else {
    // Non-interactive mode
    validateRequiredArgs(cliArgs);

    // Get valid folders dynamically
    const patternSrc = path.join(process.cwd(), 'source');
    const patternDir = await getDirectories(patternSrc);
    const validFolders = patternDir.map(item => path.basename(item));
    validateFolder(cliArgs.folder, validFolders);

    componentName = kebabCase(cliArgs.name);
    componentTitle = cliArgs.title || capitalCase(componentName);
    componentFolder = cliArgs.folder;
    componentFolderSub = cliArgs.subfolder || '';
    modularSass = cliArgs.modularSass !== false;
    componentJs = cliArgs.js === true;
  }

  const componentLocation = path.join(
    componentFolder,
    kebabCase(componentFolderSub)
  );
  const library = modularSass || componentJs;
  const componentCssClass = cssPrefix(componentName, componentFolder);

  const mustacheData = {
    // Partials
    jsClassName: '{{#pascalCase}}{{componentName}}{{/pascalCase}}',
    // Variables
    componentName,
    componentTitle,
    componentLocation,
    componentFolder,
    componentCssClass,
    modularSass,
    componentJs,
    library,
    // These have to be a variable because otherwise Mustache tries to handle the
    // double {{ }} itself
    addAttributes: `{{ add_attributes({ class: classes }) }}`,
    attachLibrary: `{{ attach_library('gesso/${componentName}') }}`,
    // Lambdas
    machineName: (text, render) => {
      return pascalCase(render(text));
    },
    humanName: (text, render) => {
      return camelCase(render(text));
    },
    cascadeLayer: (text, render) => {
      return cascadeLayer(render(text));
    },
    pascalCase: (text, render) => {
      return pascalCase(render(text));
    },
    camelCase: (text, render) => {
      return camelCase(render(text));
    },
    titleCase: (text, render) => {
      return capitalCase(render(text));
    },
  };

  let shouldCreate = true;

  if (isInteractive) {
    shouldCreate = await confirmComponent(mustacheData);
  } else {
    printSummary(mustacheData);
  }

  if (shouldCreate) {
    await createFile(
      './source/{{componentLocation}}/{{componentName}}/{{componentName}}.twig',
      './lib/templates/Component.hbs',
      mustacheData
    );
    await createFile(
      './source/{{ componentLocation }}/{{ componentName }}/{{ componentName }}.yml',
      './lib/templates/Data.hbs',
      mustacheData
    );
    await createFile(
      './source/{{ componentLocation }}/{{ componentName }}/{{ componentName }}.stories.jsx',
      './lib/templates/Story.hbs',
      mustacheData
    );
    await normalizeStorySpacing(
      `./source/${componentLocation}/${componentName}/${componentName}.stories.jsx`
    );
    if (modularSass) {
      await createFile(
        './source/{{ componentLocation }}/{{ componentName }}/{{ componentName }}.scss',
        './lib/templates/Stylesheet.hbs',
        mustacheData
      );
    } else {
      const sassFilepath = await createFile(
        './source/{{ componentLocation }}/{{ componentName }}/_{{ componentName }}.scss',
        './lib/templates/Stylesheet.hbs',
        mustacheData
      );
      await addToScssIndex(sassFilepath);
    }
    if (componentJs) {
      await createFile(
        './source/{{ componentLocation }}/{{ componentName }}/{{ componentName }}.js',
        './lib/templates/Javascript.hbs',
        mustacheData
      );
    }
    if (library) {
      const root = path.resolve(__dirname, '..');
      const librariesFile = path.join(root, 'gesso.libraries.yml');
      try {
        const librariesFileContents = await readFile(librariesFile, {
          encoding: 'utf-8',
        });
        const doc = parseDocument(librariesFileContents);

        // Build the new library entry
        const newLibrary = {};
        if (modularSass) {
          newLibrary.css = {
            theme: {
              [`dist/css/${componentName}.css`]: {},
            },
          };
        }
        if (componentJs) {
          newLibrary.js = {
            [`dist/js/${componentName}.js`]: {},
          };
        }
        if (modularSass || componentJs) {
          newLibrary.dependencies = ['gesso/global'];
        }

        // Add to new library to the end of the libraries.yml
        doc.set(componentName, newLibrary);

        await writeFile(librariesFile, doc.toString(), {
          encoding: 'utf-8',
          flag: 'w+',
        });
      } catch {
        console.error(
          `${librariesFile} could not be opened. Please ensure the file exists. If your theme is not called gesso, update the component.js script to look for the correct file name.`
        );
      }
    }

    console.log('Component created.');
  } else {
    console.error('Component canceled.');
  }
}

generator();
