import { getRepository } from 'typeorm'
import Article from '../entity/entity.article'
import ArticleVisit from '../entity/entity.articleVisit'

interface IGetArticles {
  uid?: string
}
export function getArticles(params?: IGetArticles) {
  const repository = getRepository(Article)
  return repository.find(params)
}

interface IAddArticle {
  uid: string
  title: string
  markdown: string
}
/**
 * 新增文章
 * @param params 
 */
export function addArticle(params: IAddArticle) {
  const repository = getRepository(Article)
  const article = new Article()
  const { uid, title, markdown } = params
  article.uid = uid
  article.title = title
  article.markdown = markdown
  return repository.save(article)
}

/**
 * 根据id获取文章详情
 * @param id 
 */
export function getArticleById(id: string) {
  const repository = getRepository(Article)
  return repository.findOne(id)
}

interface IEditArticle {
  title?: string
  markdown?: string
}
/**
 * 根据id编辑文章
 * @param id 
 * @param params 
 */
export function editArticle(id: string, params: IEditArticle) {
  const repository = getRepository(Article)
  return repository.update(id, params)
}

interface IAddVisit {
  articleId: string
  userId?: string
}
export function addArticleVisit(params: IAddVisit) {
  const repository = getRepository(ArticleVisit)
  const { articleId, userId } = params
  const visit = new ArticleVisit()
  visit.articleId = articleId
  visit.userId = userId || ''
  return repository.save(visit)
}