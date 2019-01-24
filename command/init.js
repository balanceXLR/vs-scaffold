'use strict'
const exec = require('child_process').exec
const config = require('../templates')
const chalk = require('chalk')
const inquirer = require('inquirer')
const ora = require('ora')
module.exports = () => {
    let tplList = []
    for (let i in config.tpl) {
      tplList.push(`${i}`)
    }
    inquirer.prompt([{
      type: 'list',
      name: 'templates',
      message: '请选择初始化模板：',
      choices: tplList
    }]).then(res => {
      const spinner = ora('模板下载中...').start()
      let gitUrl = config.tpl[res.templates].url
      let branch = config.tpl[res.templates].branch
      let cmdStr = `git clone ${gitUrl} . && git checkout ${branch}`
      exec(cmdStr, (error, stdout, stderr) => {
        if (error && error.code == 128) {
          spinner.fail('请在空目录中初始化！')
          process.exit()
        }
        if (error) {
          console.log(stderr)
          spinner.fail('模板下载失败！')
          process.exit()
        }
        spinner.succeed('模板下载成功！')
        process.exit()
      })
    })

}
