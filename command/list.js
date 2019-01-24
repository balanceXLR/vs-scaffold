'use strict'
const config = require('../templates')
const chalk = require('chalk')
module.exports = () => {
	 for (let i in config.tpl) {
		 console.info(`${chalk.green(i)}——${chalk.yellow(config.tpl[i].description)}`)
	 }
 	process.exit()
}
