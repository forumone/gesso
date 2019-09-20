var fs= require('fs');
var inquirer= require('inquirer');
var path = require('path');
var mkdirp = require('mkdirp');

const isDirectory = source => fs.lstatSync(source).isDirectory();

const getDirectories = source => {
  return fs.readdirSync(source)
  .map(name => path.join(source, name))
  .filter(isDirectory);
}

init();

function init() {
  const patternSrc = process.cwd() +  "/source/_patterns/";
  const patternDir = getDirectories(patternSrc);

  var questions = [
    {
      type: 'input',
      name: 'component_name',
      message: 'What is the name your component?'
    },
    {
      type: 'confirm',
      name: 'document',
      message: 'Do you want documentation (markdown)?'
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

  inquirer.prompt(questions).then(answers => {
    var componentName = answers.component_name.trim();
    var componentDocumentation = answers.document;
    var componentLocation = path.join(
      patternSrc,
      answers.component_folder,
      machineName(answers.component_folder_sub),
      machineName(componentName)
    );
    var output = '---\n' +
      'Component Name: ' + componentName + '\n' +
      'Include Documentation: '+ ((componentDocumentation) ? 'Yes': 'No') + '\n' +
      'Component Location: ' + componentLocation + '\n';
    console.log(output);

    var confirm = [
      {
        type: 'confirm',
        name: 'confirm',
        message: "Is this what you want?",
      }
    ]

    inquirer.prompt(confirm).then(answers => {
      if (answers.confirm) {
        createComponent(componentName, componentLocation, componentDocumentation);
      } else {
        console.log('Component cancelled');
      }
    });
  });
}

function machineName(name) {
  return name.split(' ').join('-').toLowerCase();
}

function createComponent(component, location, documentation) {

  if (fs.existsSync(location)) {
    console.log('Component directory already exists');
  } else {

    mkdirp(location, function (err) {
      if (err) {
        console.error(err)

      } else {
        var filesArray = ['scss', 'twig', 'yml'];
        filesArray.forEach(function (file) {
          makeComponentFile(component, location, file);
        });

        if(documentation == true ) {
          makeComponentFile(component, location, 'md');
        }

        console.log(component + ' created');

      }
    });
  }
}

function makeComponentFile(componentName, location, ext) {
  var componentFile = machineName((ext=='scss')? '_'+ componentName : componentName);
  var output='';

  switch(ext) {
    case 'scss':
      output= '// @file\n' +
        '// Component: '+ componentName + '\n' ;
      break;
    case 'twig':
      output= '{# '+ componentName +' #}';
      break;
    case 'md':
      output= '---\n' +
        'el: .' + machineName(componentName) + '\n' +
        'title: ' + componentName + '\n' +
        '---';
      break;
    default:
      output='';
  }

  fs.writeFile(location + '/' + componentFile +'.' + ext, output, function(err) {
    if (err) {
      return console.error(err);
    }
  });
}