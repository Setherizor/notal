#!/usr/bin/env node
const chalk = require('chalk') // https://www.npmjs.com/package/chalk
const program = require('commander') // https://www.npmjs.com/package/commander
const commmands = require('./lib/commands')

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
