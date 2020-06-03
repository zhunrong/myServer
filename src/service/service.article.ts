import { getRepository } from 'typeorm';
import Article from '../entity/entity.article';
import User from '../entity/entity.user';
import ArticleVisit from '../entity/entity.articleVisit';

interface IGetArticles {
  uid?: string;
  pageSize?: number;
  page?: number;
  public?: number;
}
/**
 * 获取文章
 * @param params
 */
export function getArticles(params: IGetArticles = {}) {
  const { pageSize = 2, page = 1, uid, public: publicStatus } = params;
  const repository = getRepository(Article);
  const queryBuilder = repository
    .createQueryBuilder('article')
    .leftJoinAndSelect(User, 'user', 'article.uid = user.id')
    .select('article.id', 'id')
    .addSelect('article.title', 'title')
    .addSelect('article.uid', 'uid')
    .addSelect('article.public', 'public')
    .addSelect(
      'DATE_FORMAT(article.update_at,"%Y-%m-%d %H:%i:%s")',
      'updateTime'
    )
    .addSelect('user.avatar', 'avatar');
  if (uid !== undefined) {
    queryBuilder.where('article.uid = :uid', {
      uid,
    });
  }
  if (publicStatus !== undefined) {
    queryBuilder.andWhere('article.public = :public', {
      public: publicStatus,
    });
  }
  return queryBuilder
    .orderBy('article.update_at', 'DESC')
    .offset((page - 1) * pageSize)
    .limit(pageSize)
    .getRawMany();
}

/**
 * 获取文章总数
 */
export function getArticleCount(uid?: string) {
  const repository = getRepository(Article);
  return repository.count({
    uid,
  });
}

interface IAddArticle {
  uid: string;
  title: string;
  markdown: string;
}
/**
 * 新增文章
 * @param params
 */
export function addArticle(params: IAddArticle) {
  const repository = getRepository(Article);
  const article = new Article();
  const { uid, title, markdown } = params;
  article.uid = uid;
  article.title = title;
  // article.markdown = markdown;
  return repository.save(article);
}

interface CreateArticleParams {
  uid: string;
  title: string;
  html: string;
  raw: string;
  draftId: string;
}
/**
 * 创建文章
 * @param params
 */
export function createArticle(params: CreateArticleParams) {
  const repository = getRepository(Article);
  return repository.create(params);
}

/**
 * 根据草稿id查找文章
 * @param draftId
 */
export function getArticleByDraftId(draftId: string) {
  const repository = getRepository(Article);
  return repository.findOne({
    draftId,
  });
}

interface SyncArticleParams {
  uid: string;
  title: string;
  html: string;
  raw: string;
  draftId: string;
}
/**
 * 同步文章
 * @param params
 */
export function syncArticle(params: SyncArticleParams) {
  const repository = getRepository(Article);
  const { uid, title, html, raw, draftId } = params;
  return repository.update(
    {
      uid,
      draftId,
    },
    {
      title,
      html,
      raw,
    }
  );
}

/**
 * 根据id获取文章详情
 * @param id
 */
export async function getArticleById(id: string) {
  const repository = getRepository(Article);
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
           public,
           COUNT(article_visit.id) as visitCount
    from article
    left join article_visit on article.id = article_visit.article_id
    left join user on user.id = article.uid
    where article.id = '${id}'
    group by article.id`);
  return article
    ? {
        ...article,
        visitCount: Number(article.visitCount),
      }
    : null;
}

interface IEditArticle {
  title?: string;
  markdown?: string;
  public?: number;
}
/**
 * 根据id编辑文章
 * @param id
 * @param params
 */
export function editArticle(id: string, params: IEditArticle) {
  const repository = getRepository(Article);
  return repository.update(id, params);
}

interface IAddVisit {
  articleId: string;
  userId?: string;
}
/**
 * 添加文章访问记录
 * @param params
 */
export function addArticleVisit(params: IAddVisit) {
  const repository = getRepository(ArticleVisit);
  const { articleId, userId } = params;
  const visit = new ArticleVisit();
  visit.articleId = articleId;
  visit.userId = userId || '';
  return repository.save(visit);
}

/**
 * 删除文章
 * @param ids
 */
export function deleteArticle(ids: string[]) {
  const repository = getRepository(Article);
  return repository.delete(ids);
}

export function query(id: string) {
  const repository = getRepository(ArticleVisit);
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
    where article_visit.article_id = article.id and article.id = '${id}' and user.id = article.uid`);
}
