import { getRepository, createQueryBuilder } from 'typeorm'
import Article from '../entity/entity.article'
import User from '../entity/entity.user'
import ArticleVisit from '../entity/entity.articleVisit'

interface IGetArticles {
  uid?: string
  pageSize?: number
  page?: number
}
export function getArticles(params: IGetArticles = {}) {
  const { pageSize = 2, page = 1 } = params
  const repository = getRepository(Article)
  return repository.
    createQueryBuilder('article').
    leftJoinAndSelect(User, 'user', 'article.uid = user.id').
    select('article.id', 'id').
    addSelect('article.title', 'title').
    addSelect('article.uid', 'uid').
    addSelect('DATE_FORMAT(article.update_at,"%Y-%m-%d %h:%i:%s")', 'updateTime').
    addSelect('user.avatar', 'avatar').
    offset((page - 1) * pageSize).
    limit(pageSize).
    getRawMany()
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
export async function getArticleById(id: string) {
  const repository = getRepository(Article)
  const [article] = await repository.query(`
    select uid,
           article.id as id,
           title,
           markdown,
           DATE_FORMAT(article.create_at,'%Y-%m-%d %h:%i:%s') as createTime,
           DATE_FORMAT(article.update_at,'%Y-%m-%d %h:%i:%s') as updateTime,
           nickname,
           email,
           avatar,
           COUNT(*) as visitCount
    from article,article_visit,user
    where article_visit.article_id = article.id and article.id = '${id}' and user.id = article.uid`)
  return article ? {
    ...article,
    visitCount: Number(article.visitCount)
  } : null
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

export function query(id: string) {
  const repository = getRepository(ArticleVisit)
  return repository.query(`
    select uid,
           article.id as id,
           title,
           markdown,
           DATE_FORMAT(article.create_at,'%Y-%m-%d %h:%i:%s') as createTime,
           DATE_FORMAT(article.update_at,'%Y-%m-%d %h:%i:%s') as updateTime,
           nickname,
           email,
           avatar,
           COUNT(article_visit.id) as visitCount
    from article,article_visit,user
    where article_visit.article_id = article.id and article.id = '${id}' and user.id = article.uid`)
}