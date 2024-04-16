module.exports = {
  description: 'Create a new component (dev)',
  prompts: [
    {
      name: 'name',
      type: 'input',
      message: 'What is your name?',
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your name';
        }
      },
    },
  ],
  actions: [
    {
      type: 'add',
      path: '{{name}}.js',
      templateFile: 'index.ts',
    },
  ],
};
