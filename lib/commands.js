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
      if (db.has(cmd)) {
        console.log(`Error with name: ${chalk.red(cmd)}, choose another`)
        return
      }
      db.set(cmd, await inquirer.newEntryPrompt(cmd === undefined))
    }
  },
  {
    name: 'edit [cmd]',
    alias: 'e',
    desc: 'Edit existing entry (uses default values from last revision)',
    action: async cmd => {
      if (db.doesNotExist(cmd)) {
        return
      }
      const entry = db.get(cmd)
      db.printEntry(cmd, entry)
      db.set(cmd, await inquirer.newEntryPrompt(true, cmd, entry))
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
    alias: 'pa',
    desc: 'Get path of config file (stored entries)',
    action: () => console.log(db.path)
  },
  {
    name: 'print [cmd]',
    alias: 'p',
    desc: 'print an existing entry',
    action: cmd => {
      if (db.doesNotExist(cmd)) {
        return
      }
      console.log(db.get(cmd).cmd)
    }
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
      nrc.run(entry.cmd.split(';'), {
        onData: console.log,
        onError: console.log,
        cmd: process.cwd
      })
    }
  }
]
