import path from 'path'
import fs from 'fs'
import multer from 'multer'
import {
  readDirPromise,
  statPromise,
  mkDirPromise,
  renamePromise,
  rmdirPromise,
  unlinkPromise
} from '../modules/fsPromise'
const rootDirPath = path.resolve(__dirname, '../../static/private')
if (!fs.existsSync(rootDirPath)) {
  fs.mkdirSync(rootDirPath)
}

/**
 * 获取相对于/explorer/的路径
 * @param path 路径
 */
function getRelativePath(path: string) {
  const pattern = /^\/explorer\/([^\\:*?"><|]*)/
  // req.path可能包含中文被编码后的字符
  const match: any = pattern.exec(decodeURIComponent(path))
  return match[1]
}

/**
 * 通过文件路径解析文件名
 * @param {*} path
 */
function getFileName(path: string) {
  path = decodeURIComponent(path)
  let pattern: any
  if (/.*\/$/.test(path)) {
    pattern = /.*\/([^/]+\/)/
  } else {
    pattern = /.*\/([^/]+)/
  }
  return pattern.exec(path)[1]
}

/**
 * 获取目录/文件
 * @param req request
 * @param res response
 */
export async function get(req: any, res: any) {
  const relPath = getRelativePath(req.path)
  const filePath = path.resolve(rootDirPath, relPath)
  try {
    const file: any = await statPromise(filePath)
    const rootDir = '/'
    let currentDir = rootDir + relPath
    let parentDir = '/'
    if (file.isDirectory) {
      try {
        const files = await readDirPromise(rootDirPath, relPath)
        // 使目录路径以'/'结尾
        if (!/.*\/$/.test(currentDir)) {
          currentDir += '/'
        }
        if (currentDir != '/') {
          const parentDirRE: any = /(.*\/)[^\/]+\//
          parentDir = parentDirRE.exec(currentDir)[1]
        }
        res.status(200).send({
          files,
          currentDir,
          parentDir,
          rootDir,
          filePath
        })
      } catch (error) {
        throw error
      }
    } else {
      const svgRE = /.svg$/
      if (svgRE.test(filePath)) {
        res.append('Content-Type', 'image/svg+xml')
      }
      // 直接返回一个文件
      fs.createReadStream(filePath).pipe(res)
    }
  } catch (error) {
    res.send({
      status: 'error',
      message: '读取错误',
      error
    })
  }
}

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  storage: multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
      // 注意 req.body 可能还没有完全填充，这取决于向客户端发送字段和文件到服务器的顺序
      const relPath = getRelativePath(req.path)
      cb(null, path.resolve(rootDirPath, relPath))
    },
    filename: (req: any, file: any, cb: any) => {
      // 为了发挥stream的优势,这里先以原文件名写在硬盘上，然后再修改为body.filename
      cb(null, file.originalname)
    }
  })
})
/**
 * 新建目录/文件
 */
export const post: any[] = [
  upload.single('file'),
  async (req: any, res: any) => {
    const { filename = '', isDirectory = false } = req.body
    const success = () => {
      res.send({
        message: '创建成功',
        status: 'success'
      })
    }
    const relPath = getRelativePath(req.path)
    const filePath = path.resolve(rootDirPath, relPath, filename)
    if (req.file) {
      if (filename) {
        try {
          await renamePromise(req.file.path, filePath)
          success()
        } catch (error) {
          res.send({
            error,
            status: 'error'
          })
        }
      } else {
        success()
      }
    } else if (isDirectory) {
      if (!filename) {
        return res.send({
          message: '文件名不能为空',
          status: 'error'
        })
      }
      try {
        await mkDirPromise(filePath)
        success()
      } catch (error) {
        let message = '新建失败'
        if (error.errno === -4075) {
          message = '文件已存在'
        }
        res.send({
          message,
          status: 'error',
          error
        })
      }
    } else {
      res.send({
        message: '缺少file或isDirectory字段',
        status: 'error'
      })
    }
  }
]

/**
 * 删除文件/目录
 * @param req request
 * @param res response
 */
export async function deleteFile(req: any, res: any) {
  const relPath = getRelativePath(req.path)
  const filePath = path.resolve(rootDirPath, relPath)
  try {
    const file: any = await statPromise(filePath)
    if (file.isDirectory) {
      try {
        await rmdirPromise(filePath)
        res.send({
          status: 'success'
        })
      } catch (error) {
        throw error
      }
    } else {
      try {
        await unlinkPromise(filePath)
        res.send({
          status: 'success'
        })
      } catch (error) {
        throw error
      }
    }
  } catch (error) {
    let message = ''
    if (error.errno === -4058) {
      message = '文件不存在'
    }
    if (error.errno === -4051) {
      message = '不能删除非空目录'
    }
    res.send({
      message,
      error,
      status: 'error'
    })
  }
}

/**
 * 重命名文件/目录
 * @param req request
 * @param res response
 */
export async function put(req: any, res: any) {
  const relPath = getRelativePath(req.path)
  const filename = getFileName(req.path)
  const oldPath = path.resolve(rootDirPath, relPath)
  const { rename = '' } = req.body

  if (relPath === '') {
    return res.send({
      message: '根目录不能修改',
      status: 'error'
    })
  }
  if (!rename) {
    return res.send({
      message: 'rename不能为空',
      status: 'error'
    })
  }
  try {
    const pattern = new RegExp(`[^\/](${filename})$`)
    const newPath = oldPath.replace(pattern, (match, $1) => {
      return match.replace($1, rename)
    })
    await renamePromise(oldPath, newPath)
    res.send({
      status: 'success'
    })
  } catch (error) {
    let message = ''
    if (error.errno === -4058) {
      message = '文件不存在'
    }
    res.send({
      message,
      error,
      status: 'error'
    })
  }
}
