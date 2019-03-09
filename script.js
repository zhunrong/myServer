const { exec } = require('child_process')

// 创建编译子进程，编译ts
const compileProcess = exec('npm run compile')
compileProcess.stdout.pipe(process.stdout)

// 创建nodemon子进程，更新代码后自动重启服务
const nodemonProcess = exec('npm run server')
nodemonProcess.stdout.pipe(process.stdout)
console.log('develop script is running')