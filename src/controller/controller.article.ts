import { copyValueFromObj } from '../modules/utils'
import * as articleService from '../service/service.article'

/**
 * 获取用户的文章
 * @param req
 * @param res
 */
export async function get(req: any, res: any) {
  try {
    const { uid } = req.auth
    const page = parseInt(req.query.page)
    const pageSize = parseInt(req.query.pageSize)
    const articles = await articleService.getArticles({
      uid,
      page,
      pageSize
    })
    const total = await articleService.getArticleCount(uid)
    res.send({
      status: 'success',
      data: articles,
      meta: {
        pageSize,
        page,
        pageCount: Math.ceil(total / pageSize)
      }
    })
  } catch ({ message }) {
    res.send({
      status: 'error',
      message
    })
  }
}

/**
 * 获取所有文章
 * @param req
 * @param res
 */
export async function getAll(req: any, res: any) {
  try {
    const page = parseInt(req.query.page)
    const pageSize = parseInt(req.query.pageSize)
    const articles = await articleService.getArticles({
      pageSize,
      page
    })
    const total = await articleService.getArticleCount()
    res.send({
      status: 'success',
      data: articles,
      meta: {
        pageSize,
        page,
        pageCount: Math.ceil(total / pageSize)
      }
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
  try {
    const article = await articleService.getArticleById(id)
    if (!article) {
      throw new Error('文章不存在')
    }
    res.send({
      status: 'success',
      data: article,
    })
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
    const article = await articleService.addArticle({ uid, title, markdown })
    const id = article.id
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
  try {
    const { id } = req.params
    const { uid } = req.auth
    const data = copyValueFromObj(['title', 'markdown'], req.body)
    if (typeof data.title !== undefined && data.title === '') {
      throw new Error('title不能为空')
    }
    const article = await articleService.getArticleById(id)
    if (!article) {
      throw new Error('该文章不存在')
    }
    if (article.uid !== uid) {
      throw new Error('该文章不属于当前用户')
    }
    await articleService.editArticle(id, data)
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
 * 增加一条文章访问记录
 * @param req 
 * @param res 
 */
export async function addVisitRecord(req: any, res: any) {
  try {
    const { articleId, userId } = req.body
    await articleService.addArticleVisit({
      articleId,
      userId
    })
    res.send({
      status: 'success'
    })
  } catch ({ message }) {
    res.send({
      message,
      status: 'error'
    })
  }
}
