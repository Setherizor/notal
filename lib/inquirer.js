const inquirer = require('inquirer')

module.exports = {
  newEntryPrompt: () => {
    const questions = [
      // {
      //   name: 'name',
      //   type: 'input',
      //   message: 'Enter a name for your command:',
      //   validate: value => value.length ? true : 'Please enter a name for your command.'

      // },
      {
        name: 'cmd',
        type: 'input',
        message: 'Enter the command:',
        validate: value => (value.length ? true : 'Please enter the command')
      },
      {
        name: 'desc',
        type: 'input',
        message: 'Enter a description:',
        validate: value =>
          value.length ? true : 'Please enter the description'
      }
    ]
    return inquirer.prompt(questions)
  },
  doubleCheckClear: () => {
    const questions = [
      {
        name: 'confirm',
        type: 'list',
        message: 'Are you sure you want to delete all entries?',
        choices: ['Yes', 'No']
      }
    ]
    return inquirer.prompt(questions)
  }
}
