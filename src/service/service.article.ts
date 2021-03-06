import { getRepository } from 'typeorm';
import Article from '../entity/entity.article';
import User from '../entity/entity.user';
import ArticleVisit from '../entity/entity.articleVisit';
import Article2Tag from '../entity/entity.article_tag';

interface GetArticlesParams {
  uid?: string;
  pageSize?: number;
  page?: number;
}
/**
 * 获取文章
 * @param params
 */
export function getArticles(params: GetArticlesParams = {}) {
  const { pageSize = 2, page = 1, uid } = params;
  const repository = getRepository(Article);
  const queryBuilder = repository
    .createQueryBuilder('article')
    .leftJoinAndSelect(User, 'user', 'article.uid = user.id')
    .select('article.id', 'id')
    .addSelect('article.title', 'title')
    .addSelect('article.uid', 'uid')
    .addSelect('article.draft_id', 'draftId')
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
  const { uid, title, html, raw, draftId } = params;
  const article = new Article();
  article.uid = uid;
  article.title = title;
  article.html = html;
  article.raw = raw;
  article.draftId = draftId;
  return repository.save(article);
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
 * @param uid
 */
export async function getArticleById(id: string, uid?: string) {
  const repository = getRepository(Article);
  const [article] = await repository.query(`
    select uid,
           article.id as id,
           title,
           html,
           raw,
           draft_id as draftId,
           DATE_FORMAT(article.create_at,'%Y-%m-%d %h:%i:%s') as createTime,
           DATE_FORMAT(article.update_at,'%Y-%m-%d %h:%i:%s') as updateTime,
           nickname,
           email,
           avatar,
           COUNT(article_visit.id) as visitCount
    from article
    left join article_visit on article.id = article_visit.article_id
    left join user on user.id = article.uid
    where article.id = '${id}'
    ${uid ? `and uid = '${uid}'` : ''}
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

/**
 * 给文章添加一个标签（关联一个标签）
 * @param articleId
 * @param tagId
 */
export function addTag(articleId: string, tagId: string) {
  const repository = getRepository(Article2Tag);
  const record = repository.create({
    articleId,
    tagId,
  });
  return repository.save(record);
}

/**
 * 删除文章的一个标签
 * @param articleId
 * @param tagId
 */
export function removeTag(articleId: string, tagId: string) {
  const repository = getRepository(Article2Tag);
  return repository.delete({
    articleId,
    tagId,
  });
}

/**
 * 获取文章的标签
 * @param id
 */
export function getArticleTags(
  id: string
): Promise<{ tagId: string; articleId: string; tagName: string }[]> {
  const repository = getRepository(Article2Tag);
  return repository.query(`
    select article_to_tag.tag_id as tagId,
           article_to_tag.article_id as articleId,
           article_tag.name as tagName
    from article_to_tag join article_tag on article_to_tag.tag_id = article_tag.id
    where article_to_tag.article_id = '${id}';
  `);
}
