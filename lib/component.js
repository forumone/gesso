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
import YAML from 'yaml';

const __dirname = import.meta.dirname;
const sassPathMatcher = RegExp(/@use (['"]{1})(?<path>.+)\1/);

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
          '05-pages',
          '06-utility',
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
 * Generates a new component based on user input.
 *
 * @return {Promise<void>}
 */
async function generator() {
  const componentName = await getMachineName();
  const componentTitle = await getComponentTitle(componentName);
  const componentFolder = await getComponentFolder();
  const componentFolderSub = await getComponentFolderSub();
  const componentLocation = path.join(
    componentFolder,
    kebabCase(componentFolderSub)
  );
  const modularSass = await getUseModularSass();
  const componentJs = await getUseJS();
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
  const confirmation = await confirmComponent(mustacheData);
  if (confirmation) {
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
        const librariesParsed = YAML.parse(librariesFileContents);
        librariesParsed[componentName] = {};
        if (modularSass) {
          librariesParsed[componentName].css = {
            theme: {
              [`dist/css/${componentName}.css`]: {},
            },
          };
        }
        if (componentJs) {
          librariesParsed[componentName].js = {
            [`dist/js/${componentName}.js`]: {},
          };
        }
        librariesParsed[componentName].dependencies = ['gesso/global'];
        const sortedLibraries = Object.fromEntries(
          Object.entries(librariesParsed).sort(([keyA], [keyB]) => {
            // Global library always comes first.
            if (keyA === 'global') {
              return -1;
            }
            if (keyB === 'global') {
              return 1;
            }
            return keyA.localeCompare(keyB);
          })
        );
        await writeFile(librariesFile, YAML.stringify(sortedLibraries), {
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
