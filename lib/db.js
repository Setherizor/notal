const Configstore = require('configstore') // https://www.npmjs.com/package/configstore
const chalk = require('chalk')
const ui = require('cliui')()
const pkg = require('../package.json')

const db = new Configstore(pkg.name)

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

db.list = function() {
  const spacing = [13, 40, undefined]

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
    const e = this.get(n)
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
  })
  console.log(ui.toString())
}

if (!db.has('update')) {
  db.all = {
    update: {
      cmd:
        'sudo apt-get update -y; sudo apt-get upgrade w-y; sudo apt-get autoremove -y',
      desc: 'Updates the computer based on the file on sp.glitch.me'
    },
    echo: {
      cmd: 'echo "It worked!!!"',
      desc: 'Simple echo that says something'
    }
  }
}

module.exports = db
