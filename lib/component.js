/* eslint-env node */
/* eslint-disable no-console */

const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const mkdirp = require('mkdirp');

const isDirectory = source => fs.lstatSync(source).isDirectory();

const getDirectories = source => {
  return fs
    .readdirSync(source)
    .map(name => path.join(source, name))
    .filter(isDirectory);
};

init();

function init() {
  const patternSrc = `${process.cwd()}/source/_patterns/`;
  const patternDir = getDirectories(patternSrc);

  const questions = [
    {
      type: 'input',
      name: 'component_name',
      message: 'What is the name your component?',
      filter: machineName,
    },
  ];
  inquirer
    .prompt(questions)
    .then(answers => {
      const componentName = answers.component_name.trim();
      const defaultComponentTitle = humanName(componentName);
      const questions = [
        {
          type: 'input',
          name: 'component_title',
          message: 'What is the human-readable title of your component?',
          default: defaultComponentTitle,
        },
        {
          type: 'list',
          name: 'component_folder',
          message: 'Component Location',
          choices: patternDir.map(item => path.basename(item)),
        },
        {
          type: 'input',
          name: 'component_folder_sub',
          message: 'Include subfolder or leave blank',
        },
      ];
      return inquirer
        .prompt(questions)
        .then(answers =>
          Object.assign(answers, { component_name: componentName })
        );
    })
    .then(answers => {
      const componentName = answers.component_name;
      const componentTitle = answers.component_title;
      const componentDocumentation = answers.document;
      const componentLocation = path.join(
        patternSrc,
        answers.component_folder,
        machineName(answers.component_folder_sub),
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

      inquirer.prompt(confirm).then(answers => {
        if (answers.confirm) {
          createComponent(
            componentName,
            componentTitle,
            componentLocation,
            componentDocumentation
          );
        } else {
          console.log('Component cancelled');
        }
      });
    });
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

function createComponent(
  componentName,
  componentTitle,
  location,
  documentation
) {
  if (fs.existsSync(location)) {
    console.log('Component directory already exists');
  } else {
    mkdirp(location)
      .then(() => {
        const filesArray = ['scss', 'twig', 'yml', 'md'];
        filesArray.forEach(function(file) {
          makeComponentFile(componentName, componentTitle, location, file);
        });
        console.log(`${componentTitle} created`);
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
