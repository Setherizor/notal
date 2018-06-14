const inquirer = require('inquirer')

module.exports = {
  newEntryPrompt: (
    withName,
    name,
    entry = {cmd: undefined, descc: undefined}
  ) => {
    const questions = [
      {
        name: 'name',
        type: 'input',
        message: 'Enter a name for your command:',
        default: name,
        validate: value =>
          value.length ? true : 'Please enter a name for your command.'
      },
      {
        name: 'cmd',
        type: 'input',
        message: 'Enter the command:',
        default: entry.cmd,
        validate: value => (value.length ? true : 'Please enter the command')
      },
      {
        name: 'desc',
        type: 'input',
        message: 'Enter a description:',
        default: entry.desc,
        validate: value =>
          value.length ? true : 'Please enter the description'
      }
    ]
    return inquirer.prompt(withName ? questions : questions.slice(1))
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
