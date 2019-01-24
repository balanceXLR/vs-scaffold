'use strict'
const config = require('../templates')
const fs = require('fs')
const inquirer = require('inquirer')
const ora = require('ora')
module.exports = () => {
    let tplList = []
    for (let i in config.tpl) {
      tplList.push(i)
    }
    inquirer.prompt([
        {
            type: 'list',
            name: 'template',
            message: '请选择要删除的模板',
            choices: tplList
        }
    ]).then(res => {
        let tplName = res.template
        let spinner = ora()
        if (config.tpl[tplName]) {
            config.tpl[tplName] = undefined
        } else {
            spinner.fail('模板不存在！')
            process.exit()
        }
        fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config),  'utf-8', (err) => {
            if (err) {
                console.log(err)
                spinner.fail('删除失败')
                process.exit()
            }
            spinner.succeed('删除成功')
            process.exit()
        })
    })
}
