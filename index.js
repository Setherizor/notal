#!/usr/bin/env node
const chalk = require('chalk') // https://www.npmjs.com/package/chalk
const program = require('commander') // https://www.npmjs.com/package/commander
const commmands = require('./lib/commands')

// https://www.npmjs.com/package/cliui
// https://www.npmjs.com/package/last-line
// https://www.npmjs.com/package/read-last-lines
// https://www.npmjs.com/package/node-run-cmd
// https://www.npmjs.com/package/commander
// https://www.npmjs.com/package/chalk
// https://www.npmjs.com/package/configstore

program
  .usage('[command name] OR [options] ')
  .version(require('./package.json').version)

commmands.forEach(c => {
  program
    .command(c.name)
    .alias(c.alias)
    .description(c.desc)
    .action(c.action)
})

program.parse(process.argv)

if (!process.argv.slice(2).length === true) {
  program.outputHelp(txt => chalk.cyanBright(txt + '\n'))
}
