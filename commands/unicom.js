
const path = require('path')
const { scheduler } = require('../utils/scheduler')

exports.command = 'unicom'

exports.describe = 'unicom任务'

exports.builder = function (yargs) {
  return yargs
    .option('user', {
      describe: '17576010265',
      default: '',
      type: 'string'
    })
    .option('password', {
      describe: '200265',
      default: '',
      type: 'string'
    })
    .option('appid', {
      describe: 'appid',
      default: '',
      type: 'string'
    })
    .option('cookies', {
      describe: '3f31e4f31439ef1c9288878871f9b2c23b72d0bdaf2b2677cc32c398d6f137e38606ffd1b16c8156c08606470a43014d91afde2bc4a357a0a81d23b12b303b332a56c74b8ed34516da6def8e8cdfde29',
      default: '',
      type: 'string'
    })
    .help()
    .showHelpOnFail(true, '使用--help查看有效选项')
    .epilog('copyright 2020 LunnLew');
}

exports.handler = async function (argv) {
  var command = argv._[0]
  await require(path.join(__dirname, 'tasks', command, command)).start({
    cookies: argv.cookies,
    options: {
      appid: argv.appid,
      user: argv.user,
      password: argv.password
    }
  }).catch(err => console.log("unicom任务:", err))
  let hasTasks = await scheduler.hasWillTask(command)
  if (hasTasks) {
    scheduler.execTask(command).catch(err => console.log("unicom任务:", err)).finally(() => {
      console.log('全部任务执行完毕！')
    })
  } else {
    console.log('暂无可执行任务！')
  }
}  
