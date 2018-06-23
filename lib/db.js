const Configstore = require('configstore') // https://www.npmjs.com/package/configstore
const chalk = require('chalk')
const cliui = require('cliui')
const pkg = require('../package.json')

const ui = cliui()

const db = new Configstore(pkg.name)

const spacing = [13, 40, undefined]

db.doesNotExist = function(cmd) {
  if (this.has(cmd)) {
    return false
  }
  console.log(
    chalk.bold.red('No such command: ') + chalk.bold.blue('"%s"'),
    cmd
  )
  return true
}

db.printEntry = function(n, e) {
  const ui = cliui()
  db.makeEntryUI(n, e, ui)
  console.log('\n' + ui.toString())
}

db.makeEntryUI = function(n, e, ui) {
  ui.div(
    {
      text: chalk.cyan.bold(n),
      width: spacing[0],
      padding: [0, 0, 0, 4]
    },
    {
      text: chalk.green(e.desc),
      width: spacing[1],
      padding: [0, 0, 1, 4]
    },
    {
      text: chalk.red(e.cmd),
      width: spacing[2],
      padding: [0, 0, 0, 4]
    }
  )
}

db.list = function() {
  ui.div(
    {
      text: 'Name',
      padding: [1, 0, 1, 4],
      width: spacing[0]
    },
    {
      text: 'Description',
      padding: [1, 0, 1, 4],
      width: spacing[1]
    },
    {
      text: 'Command',
      padding: [1, 0, 1, 4],
      width: spacing[2]
    }
  )

  Object.keys(this.all).forEach(n => {
    this.makeEntryUI(n, this.get(n), ui)
  })
  console.log(ui.toString())
}

if (!db.has('update')) {
  db.all = {
    update: {
      cmd: 'sudo apt update -u; sudo apt upgrade -y; sudo apt autoremove -y',
      desc: 'Updates the computer based on the file on sp.glitch.me'
    },
    echo: {
      cmd: 'echo "It worked!!!"',
      desc: 'Simple echo that says something'
    }
  }
}

module.exports = db
