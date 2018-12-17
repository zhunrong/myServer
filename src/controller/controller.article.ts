import model from '../model/model.article'
import config from '../config'
import { copyValueFromObj } from '../modules/utils'
/**
 * 获取用户的文章
 * @param req
 * @param res
 */
export async function get(req: any, res: any) {
  const uid = req.session[config.SESSION_NAME]
  try {
    const { results }: any = await model.get({ uid })
    res.send({
      status: 'success',
      data: results
    })
  } catch (error) {
    res.send({
      status: 'error',
      error
    })
  }
}

/**
 * 获取文章详情
 * @param req
 * @param res
 */
export async function detail(req: any, res: any) {
  const { id } = req.params
  const uid = req.session[config.SESSION_NAME]
  try {
    const {
      results: [article]
    }: any = await model.get({ id, uid })
    if (article) {
      res.send({
        status: 'success',
        ...article
      })
    } else {
      res.send({
        status: 'error',
        message: '文章不存在'
      })
    }
  } catch (error) {
    res.send({
      status: 'error',
      error
    })
  }
}

/**
 * 新建文章
 * @param req
 * @param res
 */
export async function post(req: any, res: any) {
  const uid = req.session[config.SESSION_NAME]
  const { title = '', markdown, html } = req.body

  if (title === '') {
    return res.send({
      message: '标题不能为空',
      status: 'error'
    })
  }
  try {
    const { results }: any = await model.post({ uid, title, markdown, html })
    const id = results.insertId
    req.params.id = id
    detail(req, res)
  } catch (error) {
    res.send({
      error,
      status: 'error'
    })
  }
}

/**
 * 编辑文章
 * @param req request
 * @param res response
 */
export async function put(req: any, res: any) {
  const { id } = req.params
  const data = copyValueFromObj(['title', 'markdown', 'html'], req.body)
  if (typeof data.title !== undefined && data.title === '') {
    return res.send({
      status: 'error',
      message: 'title不能为空'
    })
  }
  try {
    await model.put(data, { id })
    req.params.id = id
    detail(req, res)
  } catch (error) {
    res.send({
      error,
      status: 'error'
    })
  }
}
