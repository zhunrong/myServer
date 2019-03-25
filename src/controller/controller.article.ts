import articleModel from '../model/model.article'
import { copyValueFromObj } from '../modules/utils'
/**
 * 获取用户的文章
 * @param req
 * @param res
 */
export async function get(req: any, res: any) {
  const { uid } = req.auth
  try {
    const { results }: any = await articleModel.getArticles(uid)
    res.send({
      status: 'success',
      data: results
    })
  } catch ({ message }) {
    res.send({
      status: 'error',
      message
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
  const { uid } = req.auth
  try {
    const {
      results: [article]
    }: any = await articleModel.getArticleDetail(uid, Number(id))
    if (article) {
      res.send({
        status: 'success',
        data: article
      })
    } else {
      throw new Error('文章不存在')
    }
  } catch ({ message }) {
    res.send({
      status: 'error',
      message
    })
  }
}

/**
 * 新建文章
 * @param req
 * @param res
 */
export async function post(req: any, res: any) {
  const { uid } = req.auth
  const { title, markdown } = req.body
  try {
    if (!title) {
      throw new Error('标题不能为空')
    }
    if (!markdown) {
      throw new Error('内容不能为空')
    }
    const { results }: any = await articleModel.post({ uid, title, markdown })
    const id = results.insertId
    req.params.id = id
    detail(req, res)
  } catch ({ message }) {
    res.send({
      message,
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
  const { uid } = req.auth
  const data = copyValueFromObj(['title', 'markdown'], req.body)

  try {
    if (typeof data.title !== undefined && data.title === '') {
      throw new Error('title不能为空')
    }
    const {
      results: [article]
    } = await articleModel.get({ id })
    if (!article) {
      throw new Error('该文章不存在')
    }
    if (article.uid !== uid) {
      throw new Error('该文章不属于当前用户')
    }
    await articleModel.put(data, { id })
    req.params.id = id
    detail(req, res)
  } catch ({ message }) {
    res.send({
      message,
      status: 'error'
    })
  }
}
