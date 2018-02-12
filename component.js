var fs= require('fs');
var inquirer= require('inquirer');

init();

function init() {
  var patternsDir = process.cwd() +  "/pattern-lab/source/_patterns/";
  var questions = [
    {
      type: 'input',
      name: 'component_name',
      message: 'What is the name your component?'
    },
    {
      type: 'input',
      name: 'component_location',
      message: 'Component Location',
      default: '03-components'
    },
    {
      type: 'confirm',
      name: 'document',
      message: 'Do you want documentation (markdown)?'
    },
  ];

  inquirer.prompt(questions).then(answers => {
    var componentName = answers.component_name;
    var componentDocumentation = answers.document;
    var componentLocation = patternsDir +  answers.component_location;
    var output = '---\n' + 
      'Component Name: ' + componentName + '\n' +
      'Include Documentation: ' + componentDocumentation + '\n' +
      'Component Location: ' + componentLocation + '/' + machineName(componentName);
      
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
        console.log(componentName + ' created');
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

  var componentName= component ;
  var componentLocation = location + '/' + machineName(component);


  fs.mkdir( componentLocation , function(err) {
    if(err) {
      return console.error(err)
    }

    var filesArray = ['scss', 'twig', 'yml'];
    filesArray.forEach(function (file) {
      makeComponentFile(component, componentLocation, file);
    });

    if(documentation == true ) {
      makeComponentFile(component, componentLocation, 'md');
    } 
  });
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