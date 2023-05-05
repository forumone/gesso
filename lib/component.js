/* eslint-env node */
/* eslint-disable no-console */

const fs = require('fs');
const fsPromises = require('fs/promises');
const inquirer = require('inquirer');
const path = require('path');
const mkdirp = require('mkdirp');
const { EOL } = require('os');

/**
 * Creates the machine name from a human-readable name.
 * @param {string} name - The human-readable name
 * @return {string} - The machine name
 */
function machineName(name) {
  return name.split(' ').join('-').toLowerCase();
}

/**
 * Creates a JS class name from a human-readable name.
 * @param {string} name - The machine name
 * @return {string} - The JS Class name
 */
function className(name) {
  return name
    .split('-')
    .map(piece => `${piece.charAt(0).toUpperCase()}${piece.slice(1)}`)
    .join('');
}

/**
 * Creates a human name from a machine name.
 * @param {string} name - The machine name
 * @return {string} - The human-readable name
 */
function humanName(name) {
  const words = name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return words.join(' ');
}

/**
 * Adds the CSS class prefix (e.g. c-) to the name.
 * @param {string} name - The CSS class name.
 * @param {string} directory - The directory where the component should live.
 * @return string
 */
function cssPrefix(name, directory) {
  let prefix = '';
  if (directory.indexOf('layouts') !== -1) {
    prefix = 'l-';
  } else if (directory.indexOf('components') !== -1) {
    prefix = 'c-';
  }
  return `${prefix}${name}`;
}

/**
 * Generates a file for a component.
 *
 * Options are Sass, Twig, or JSX, which creates a Storybook story.
 * @param {string} componentName - The machine name
 * @param {string} componentTitle - The human-readable component name
 * @param {string} location - The directory path where the component file
 *   should live
 * @param {string} ext - The file extension
 * @param {boolean} library - Whether the file will be used in a separate
 *   Drupal library (rather than global styles)
 * @return {void}
 */
function makeComponentFile(
  componentName,
  componentTitle,
  location,
  directory,
  ext,
  library = false
) {
  const componentFileName = machineName(
    ext === 'scss' && !library ? `_${componentName}` : componentName
  );
  const componentCSSClass = cssPrefix(machineName(componentName), directory);
  const componentJSClass = className(componentFileName);
  const componentFile =
    ext === 'jsx' ? `${componentFileName}.stories` : componentFileName;
  let output = '';

  switch (ext) {
    case 'scss':
      output = `// @file
// Component: ${componentCSSClass}

@use '00-config' as *;
`;
      break;
    case 'twig':
      output = `{% set classes = [
  '${componentCSSClass}',
  modifier_classes ? modifier_classes : ''
] %}

<div {{ add_attributes({ class: classes }) }}>
</div>
`;
      break;
    case 'jsx':
      output = `import parse from 'html-react-parser';

import twigTemplate from './${componentFileName}.twig';
import data from './${componentFileName}.yml';
${
  library
    ? `import './${componentFileName}.scss';
`
    : ''
}
const settings = {
  title: 'Components/${componentTitle}'
};

const ${componentJSClass} = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
${componentJSClass}.args = { ...data };

export default settings;
export { ${componentJSClass} };
`;
      break;
    case 'yml':
      output = `---`;
      break;
    default:
      output = '';
  }

  fs.writeFile(`${location}/${componentFile}.${ext}`, output, err =>
    err ? console.error(err) : null
  );
}

/**
 * Checks whether the source directory is an accessible directory.
 * @param {string} source - Source path
 * @return {Promise<boolean>} - True if source is an accessible directory
 */
const isDirectory = async source => {
  const stats = await fs.promises.lstat(source);
  return stats.isDirectory();
};

/**
 * Get available component directories.
 * @param {string} source - Source path
 * @return {Promise<string[]>} - Array of component directory paths
 */
const getDirectories = async source => {
  const directoryFiles = await fs.promises.readdir(source);
  const directoryPaths = directoryFiles
    .filter(
      dirName =>
        !['@types', '00-config', '05-pages', '06-utility', 'fonts', 'images'].includes(
          dirName
        )
    )
    .map(name => path.join(source, name));
  const isDirectoryResults = await Promise.all(directoryPaths.map(isDirectory));
  return directoryPaths.filter((value, index) => isDirectoryResults[index]);
};

/**
 * Get the machine name from user input.
 * @return {Promise<string>} - Machine name of new component
 */
async function getMachineName() {
  const questions = [
    {
      type: 'input',
      name: 'componentName',
      message: 'What is the name of your component?',
      filter: machineName,
    },
  ];
  const { componentName } = await inquirer.prompt(questions);
  return componentName.trim();
}

/**
 * Get additional details about the component from user input.
 * @param {string} componentName - The machine name of the component
 * @param {string[]} patternDir - Array of available directories
 * @return {Promise<*>} - User responses
 */
async function getComponentDetails(componentName, patternDir) {
  const defaultComponentTitle = humanName(componentName);
  const detailedQuestions = [
    {
      type: 'input',
      name: 'componentTitle',
      message: 'What is the human-readable title of your component?',
      default: defaultComponentTitle,
    },
    {
      type: 'list',
      name: 'componentFolder',
      message: 'Component Location',
      choices: patternDir.map(item => path.basename(item)),
    },
    {
      type: 'input',
      name: 'componentFolderSub',
      message: 'Include subfolder or leave blank',
    },
    {
      type: 'confirm',
      name: 'library',
      message: 'Create a separate modular CSS file?',
      default: false,
    },
  ];
  return inquirer.prompt(detailedQuestions);
}

/**
 * Create all files for a new component.
 * @param {string} componentName - Component machine name
 * @param {string} componentTitle - Component human-readable name
 * @param {string} location - Directory path for new component
 * @param {string} directory - Name of the directory
 * @param {boolean} library - Whether to create a separate CSS file for use in a Drupal library
 * @return {Promise<void>}
 */
async function createComponent(
  componentName,
  componentTitle,
  location,
  directory,
  library
) {
  if (fs.existsSync(location)) {
    console.log('Component directory already exists');
  } else {
    try {
      await mkdirp(location);
    } catch (err) {
      console.error(err);
    }

    const filesArray = ['scss', 'twig', 'yml', 'jsx'].map(ext =>
      makeComponentFile(
        componentName,
        componentTitle,
        location,
        directory,
        ext,
        library
      )
    );
    const directories = location.split(path.sep);
    const sassPath = [];
    while (directories.length > 0) {
      const dirname = directories.pop();
      if (dirname === directory) {
        break;
      }
      sassPath.unshift(dirname);
    }
    const sassIndex = path.join(
      path.parse(location).root,
      ...directories,
      directory,
      '_index.scss'
    );
    if (fs.existsSync(sassIndex)) {
      filesArray.push(
        fsPromises.appendFile(
          sassIndex,
          `@use '${sassPath.join('/')}/${componentName}';${EOL}`
        )
      );
    }
    const success = await Promise.all(filesArray);
    if (success) {
      console.log(`${componentTitle} created`);
    }
  }
}

/**
 * Initialize a new component
 * @return {Promise<void>}
 */
async function init() {
  const patternSrc = path.join(process.cwd(), 'source');
  const patternDir = await getDirectories(patternSrc);
  const componentName = await getMachineName();
  const { componentTitle, componentFolder, componentFolderSub, library } =
    await getComponentDetails(componentName, patternDir);
  const componentLocation = path.join(
    patternSrc,
    componentFolder,
    machineName(componentFolderSub),
    machineName(componentName)
  );
  const output = `---
Component Name: ${componentName}
Component Title: ${componentTitle}
Component Location: ${componentLocation}
`;
  console.log(output);
  const confirmQuestion = [
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Is this what you want?',
    },
  ];
  const { confirm } = await inquirer.prompt(confirmQuestion);
  if (confirm) {
    await createComponent(
      componentName,
      componentTitle,
      componentLocation,
      componentFolder,
      library
    );
  } else {
    console.log('Component cancelled');
  }
}

init().catch(err => {
  console.error(err);
});
