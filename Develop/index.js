
const fs = require('fs')
const inquirer = require('inquirer')
const util = require('util')

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
    return inquirer.prompt ([
    {
      type: "input",
      message: "What is your GitHub username?",
      name: "username"
    },
    {
      type: "input",
      message: "What is your email address?",
      name: "email"
    },
    {
      type: "input",
      message: "What is your project name?",
      name: "project"
    },
    {
        type: "input",
        message: "Please write a short description of your project",
        name: "description"
    },
    {
        type: "list",
        message: "What type of license should your project have?",
        choices: ['MIT', 'APACHE', 'GPL', 'BSD', 'None'],
        name: "license"
    },
    {
        type: "input",
        message: "What command should be run to install dependencies?",
        default: "npm i",
        name: "install"
    },
    {
        type: "input",
        message: "What command should be run to run tests?",
        default: "npm test",
        name: "test"
    },
    {
        type: "input",
        message: "What does the user need to know about the repo?",
        name: "aboutrepo"
    },
    {
        type: "input",
        message: "What does the user need to know about contributing to the repo?",
        name: "contribute"
    },
  ])
};
  
  const generateREADME = response => {
    return `# ${response.project}` 
   
    + "\r\n" +
    `## Description`
    + "\n" +
    `${response.description}  
    ` 

    + "\r\n" +
    `![License: ${response.license}](https://img.shields.io/badge/License-${response.license}-lightgrey.svg)  
    `
 
    + "\r\n" +
    `## Table of Contents`
    + "\n" +
    `* [Installation](#installation)`
    + "\n" +
    `* [Usage](#usage)`
    + "\n" +
    `* [Contributing](#contributing)`
    + "\n" +
    `* [Tests](#tests)`
    + "\n" +
    `* [Questions](#questions)  
    ` 
    
    + "\r\n" +
    `## Installation`
    + "\n" +
    `### To install the necessary dependencies, run the following command line:
    ${response.install}  
    ` 
   
    + "\r\n" +
    `## Usage`
    + "\n" +
    `${response.aboutrepo}  
    `
    
    + "\r\n" +
    `## Contributing`
    + "\n" +
    `${response.contribute}  
    ` 

    + "\r\n" +
    `## Tests
    ${response.test}  
    ` 
    
    + "\r\n" +
    `## Questions`
    + "\n" +
    `### If you have any questions about the repo, open an issue or contact me directly at ${response.email}. You can find more of my work at ${response.username}.`
  };

  promptUser()
  .then(response => {
    const md = generateREADME(response);

    return writeFileAsync('README.md', md);
  })
  .then(() => {
    console.log('Successfully wrote to README.md');
  })
  .catch(err => console.log(err));
