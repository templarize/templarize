// Description: Example of a component generator configuration file.
module.exports = {
  name: 'component', // optional
  description: 'Create a new component',
  prompts: [
    {
      name: 'name',
      type: 'input', // Single line text input.
      message: 'What is your name?',
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your name';
        }
      },
    },
    {
      name: 'confirm',
      type: 'confirm', // Yes/No input.
      message: 'Are you sure?',
    },
    {
      name: 'choise',
      type: 'list', // Single choice.
      message: 'Choose one',
      choices: ['First', 'Second', 'Third'],
    },
    {
      name: 'rawlist',
      type: 'rawlist', // Single choice with index.
      message: 'Choose one',
      choices: ['First', 'Second', 'Third'],
    },
    {
      name: 'checkbox',
      type: 'checkbox', // Multiple choice.
      message: 'Choose one',
      choices: ['First', 'Second', 'Third'],
      max: 2,
      min: 1,
    },
    {
      name: 'password',
      type: 'password', // Password input. (hidden)
      message: 'Enter your password',
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your password';
        }
      },
    },
    {
      name: 'editor',
      type: 'editor', // Text editor input.
      message: 'Enter your bio',
    },
  ],
  actions: function (data) {
    const actions = [];

    // JavaScript or TypeScript template
    const templateFile = data.useTypeScript ? 'index.ts' : 'index.js';

    // Add component file
    actions.push({
      type: 'add',
      path: `src/components/{{name}}/{{name}}.{{useTypeScript ? 'ts' : 'js'}}`,
      templateFile: `${templateFile}`, // Referenced by config file location
    });

    // Add test file
    actions.push({
      type: 'add',
      path: `tests/components/{{name}}/{{name}}.test.{{useTypeScript ? 'ts' : 'js'}}`,
      templateFile: `test.${templateFile}`,
    });

    return actions;
  },
};
