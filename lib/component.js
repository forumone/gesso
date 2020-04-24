/* eslint-env node */
/* eslint-disable no-console */

const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const mkdirp = require('mkdirp');

const isDirectory = async source => {
  const stats = await fs.promises.lstat(source);
  return stats.isDirectory();
};

const getDirectories = async source => {
  const directoryFiles = await fs.promises.readdir(source);
  const directoryPaths = directoryFiles.map(name => path.join(source, name));
  const isDirectoryResults = await Promise.all(directoryPaths.map(isDirectory));
  return directoryPaths.filter((value, index) => isDirectoryResults[index]);
};

async function getMachineName() {
  const questions = [
    {
      type: 'input',
      name: 'componentName',
      message: 'What is the name your component?',
      filter: machineName,
    },
  ];
  const { componentName } = await inquirer.prompt(questions);
  return componentName.trim();
}

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
  ];
  return await inquirer.prompt(detailedQuestions);
}

async function init() {
  const patternSrc = `${process.cwd()}/source/_patterns/`;
  const patternDir = await getDirectories(patternSrc);
  const componentName = await getMachineName();
  const {
    componentTitle,
    componentFolder,
    componentFolderSub,
  } = await getComponentDetails(componentName, patternDir);
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
  const confirm = [
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Is this what you want?',
    },
  ];
  const confirmation = await inquirer.prompt(confirm);
  if (confirmation.confirm) {
    await createComponent(componentName, componentTitle, componentLocation);
  } else {
    console.log('Component cancelled');
  }
}

function machineName(name) {
  return name
    .split(' ')
    .join('-')
    .toLowerCase();
}

function humanName(name) {
  const words = name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return words.join(' ');
}

async function createComponent(componentName, componentTitle, location) {
  if (fs.existsSync(location)) {
    console.log('Component directory already exists');
  } else {
    mkdirp(location)
      .then(async () => {
        const filesArray = ['scss', 'twig', 'yml', 'md'].map(
          async ext =>
            await makeComponentFile(
              componentName,
              componentTitle,
              location,
              ext
            )
        );
        const success = await Promise.all(filesArray);
        if (success) {
          console.log(`${componentTitle} created`);
        }
      })
      .catch(err => console.error(err));
  }
}

function makeComponentFile(componentName, componentTitle, location, ext) {
  const componentFile = machineName(
    ext === 'scss' ? `_${componentName}` : componentName
  );
  let output = '';

  switch (ext) {
    case 'scss':
      output = `// @file\n// Component: ${componentTitle}\n`;
      break;
    case 'twig':
      output = `{# ${componentName} #}`;
      break;
    case 'md':
      output = `---
el: .${machineName(componentName)}
title: ${componentTitle}
---`;
      break;
    default:
      output = '';
  }

  fs.writeFile(`${location}/${componentFile}.${ext}`, output, function(err) {
    if (err) {
      return console.error(err);
    }
  });
}

init();
