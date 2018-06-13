const nrc = require('node-run-cmd')
const chalk = require('chalk')
const inquirer = require('./inquirer') // https://www.npmjs.com/package/inquirer
const db = require('./db')

module.exports = [
  {
    name: 'list',
    alias: 'l',
    desc: 'List all the commands entered',
    action: () => {
      db.list()
    }
  },
  {
    name: 'new [cmd]',
    alias: 'n',
    desc: 'Add new command entry',
    action: async cmd => {
      if (db.has(cmd) || cmd === undefined) {
        // TODO: make this work with or without the name
        console.log(`Error with name: ${chalk.red(cmd)}, choose another`)
        return
      }
      db.set(cmd, {name: cmd, ...(await inquirer.newEntryPrompt())})
    }
  },
  {
    name: 'edit [cmd]',
    alias: 'e',
    desc: 'Edit existing entry',
    action: async cmd => {
      if (db.doesNotExist(cmd)) {
        return
      }
      // TODO: Display the info along with the editing, means abstract the cliui printing in db.js
      const entry = db.get(cmd)
      console.log(entry)

      // Dhi console.log({name: cmd, ...(await inquirer.newEntryPrompt())})
      db.set(cmd, await inquirer.newEntryPrompt())
    }
  },
  {
    name: 'delete [cmd]',
    alias: 'd',
    desc: 'Delete existing entry',
    action: cmd => {
      if (db.doesNotExist(cmd)) {
        return
      }
      db.delete(cmd)
      console.log(chalk.red('Successfully deleted ' + chalk.cyan(cmd)))
    }
  },
  {
    name: 'clear',
    alias: 'c',
    desc: 'Clear all entries',
    action: async () => {
      const ans = await inquirer.doubleCheckClear()
      if (ans.confirm === 'Yes') {
        db.clear()
      } else {
        console.log(chalk.magenta.bold('Operation Aborted'))
      }
    }
  },
  {
    name: 'path',
    alias: 'p',
    desc: 'Get path of config file (stored entries)',
    action: () => console.log(db.path)
  },
  {
    name: '*',
    alias: '',
    desc: 'Execute the passed in command',
    action: async cmd => {
      if (db.doesNotExist(cmd)) {
        return
      }
      const entry = db.get(cmd)
      console.log(chalk.green.bold(`\nExecuting ${cmd}...`))
      nrc.run(entry.cmd, {onData: console.log, onError: console.log})
    }
  }
]
