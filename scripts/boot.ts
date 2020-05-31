import { spawn } from 'child_process';
import * as path from 'path';

(async () => {
  await syncSchema();
  await runMigration();
  await runServer();
})();

const cwd = path.resolve(__dirname, '../');

function syncSchema() {
  return new Promise((resolve) => {
    const child = spawn('typeorm', ['schema:sync'], {
      cwd,
      shell: true,
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.on('close', (code, signal) => {
      console.log(`--数据库同步--close--code:[${code}]--signal:[${signal}]`);
      resolve();
    });
  });
}

function runMigration() {
  return new Promise((resolve) => {
    const child = spawn('typeorm', ['migration:run'], {
      cwd,
      shell: true,
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.on('close', (code, signal) => {
      console.log(`--数据库迁移--close--code:[${code}]--signal:[${signal}]`);
      resolve();
    });
  });
}

function runServer() {
  return new Promise((resolve) => {
    const child = spawn('node', ['dist/app.js'], {
      cwd,
      shell: true,
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.on('close', (code, signal) => {
      console.log(`--服务--close--code:[${code}]--signal:[${signal}]`);
      resolve();
    });
  });
}
