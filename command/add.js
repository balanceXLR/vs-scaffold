'use strict'
const config = require('../templates')
const fs = require('fs')
const inquirer = require('inquirer')
const ora = require('ora');

module.exports = () => {
  inquirer.prompt([{
      type: 'input',
      message: '模板名称: ',
      name: 'name',
      validate(val) {
        if (config.tpl[val]) {
          return '模板名已存在！'
        }
        return true
      }
    },
    {
      type: 'input',
      message: '模板Git仓库地址: ',
      name: 'git'
    },
    {
      type: 'input',
      message: '模板分支: ',
      name: 'branch'
    },
    {
      type: 'input',
      message: '描述(可省略): ',
      name: 'description'
    }
  ]).then(tpl => {
    const spinner = ora('模板添加中...').start()
    config.tpl[tpl.name] = {
      tplName: tpl.name,
      url: tpl.git.replace(/[\u0000-\u0019]/g, ''), // 过滤unicode字符
      branch: tpl.branch,
      description: tpl.description
    }
    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
      if (err) spinner.fail('模板添加失败！')
      spinner.succeed('模板添加成功')
      process.exit()
    })
  })
}