import { spawn } from 'child_process';
const imageName = 'backend';

(async function () {
  await removeOldImage();
  await buildImage();
  await saveImage();
})();

function buildImage() {
  return new Promise((resolve) => {
    const buildProcess = spawn('docker', ['build', '-t', imageName, '.']);
    buildProcess.stdout.pipe(process.stdout);
    buildProcess.on('close', (code, signal) => {
      console.log(`--构建镜像--close--code:[${code}]--signal:[${signal}]`);
      resolve();
    });
  });
}

function saveImage() {
  return new Promise((resolve) => {
    const saveProcess = spawn('docker', [
      'save',
      '-o',
      `./${imageName}.tar`,
      imageName,
    ]);
    saveProcess.stdout.pipe(process.stdout);
    saveProcess.stderr.pipe(process.stderr);
    saveProcess.on('close', (code, signal) => {
      console.log(`--保存镜像--close--code:[${code}]--signal:[${signal}]`);
      resolve();
    });
  });
}

function removeOldImage() {
  return new Promise((resolve) => {
    const removeProcess = spawn('docker', ['rmi', imageName]);
    removeProcess.stdout.pipe(process.stdout);
    removeProcess.stderr.pipe(process.stderr);
    removeProcess.on('close', (code, signal) => {
      console.log('已删除旧镜像');
      console.log('code:', code);
      console.log('signal:', signal);
      resolve();
    });
  });
}
