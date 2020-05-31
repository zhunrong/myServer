import path from 'path';
import fs from 'fs';

export function statPromise(filePath: string) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (error, stats) => {
      if (error) return reject(error);
      const file = {
        isDirectory: stats.isDirectory(),
        size: stats.size,
        createAt: new Date(stats.birthtime),
        lastModifyAt: new Date(stats.mtime),
      };
      resolve(file);
    });
  });
}

export function readDirPromise(rootDir: string, relPath: string) {
  const dirPath = path.resolve(rootDir, relPath);
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (error, files) => {
      if (error) return reject(error);
      const promiseArr: any[] = [];
      files.forEach((filename) => {
        promiseArr.push(
          new Promise((resolve) => {
            statPromise(path.resolve(dirPath, filename)).then((file) => {
              resolve(
                Object.assign(file, {
                  name: filename,
                })
              );
            });
          })
        );
      });
      Promise.all(promiseArr)
        .then((files) => {
          // 将目录文件排在前面
          const sortedFiles: any[] = [];
          files.forEach((file) => {
            if (file.isDirectory) {
              sortedFiles.unshift(file);
            } else {
              sortedFiles.push(file);
            }
          });
          resolve(sortedFiles);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

export function mkDirPromise(dirPath: string) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dirPath, (error) => {
      if (error) return reject(error);
      resolve();
    });
  });
}

export function renamePromise(oldPath: string, newPath: string) {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (error) => {
      if (error) return reject(error);
      resolve();
    });
  });
}

export function rmdirPromise(dirPath: string) {
  return new Promise((resolve, reject) => {
    fs.rmdir(dirPath, (error) => {
      if (error) return reject(error);
      resolve();
    });
  });
}

export function unlinkPromise(filePath: string) {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (error) => {
      if (error) return reject(error);
      resolve();
    });
  });
}
