import * as articleService from '../service/service.article';
import * as draftService from '../service/service.draft';
import * as tagService from '../service/service.articleTag';
import { RequestHandler } from 'express';

/**
 * 获取用户的文章
 * @param req
 * @param res
 */
export async function get(req: any, res: any) {
  try {
    const { uid } = req.auth;
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const articles = await articleService.getArticles({
      uid,
      page,
      pageSize,
    });
    const total = await articleService.getArticleCount(uid);
    res.send({
      status: 'success',
      data: articles,
      meta: {
        pageSize,
        page,
        pageCount: Math.ceil(total / pageSize),
        total,
      },
    });
  } catch ({ message }) {
    res.send({
      status: 'error',
      message,
    });
  }
}

/**
 * 获取用户的文章
 * @param req
 * @param res
 */
export const getArticles: RequestHandler<
  any,
  any,
  any,
  { page?: string; pageSize?: string }
> = async (req, res) => {
  try {
    const uid = req.session?.uid || '';
    const page = parseInt(req.query.page || '1');
    const pageSize = parseInt(req.query.pageSize || '20');
    const articles = await articleService.getArticles({
      uid,
      page,
      pageSize,
    });
    const total = await articleService.getArticleCount(uid);
    res.send({
      status: 'success',
      data: articles,
      meta: {
        pageSize,
        page,
        pageCount: Math.ceil(total / pageSize),
        total,
      },
    });
  } catch ({ message }) {
    res.send({
      status: 'error',
      message,
    });
  }
};

/**
 * 获取所有文章
 * @param req
 * @param res
 */
export const getAllArticles: RequestHandler<
  any,
  any,
  any,
  { page?: string; pageSize?: string }
> = async function (req, res) {
  try {
    const page = parseInt(req.query.page || '1');
    const pageSize = parseInt(req.query.pageSize || '20');
    const articles = await articleService.getArticles({
      pageSize,
      page,
    });
    const total = await articleService.getArticleCount();
    res.send({
      status: 'success',
      data: articles,
      meta: {
        pageSize,
        page,
        pageCount: Math.ceil(total / pageSize),
        total,
      },
    });
  } catch ({ message }) {
    res.send({
      status: 'error',
      message,
    });
  }
};

/**
 * 获取文章详情
 * @param req
 * @param res
 */
export const getArticleDetail: RequestHandler = async function (req, res) {
  try {
    const { id } = req.params;
    const article = await articleService.getArticleById(id);
    if (!article) {
      throw new Error('文章不存在');
    }
    const tags = await articleService.getArticleTags(id);
    res.send({
      status: 'success',
      data: {
        ...article,
        tags,
      },
    });
  } catch ({ message }) {
    res.send({
      status: 'error',
      message,
    });
  }
};

/**
 * 删除文章
 * @param req
 * @param res
 */
export const deleteArticle: RequestHandler = async function (req, res) {
  try {
    const uid = req.session?.uid || '';
    const ids: string[] = req.body.ids || [];
    if (ids.length === 0) throw new Error('请传入ids');
    while (ids.length) {
      const id = ids.shift() as string;
      const article = await articleService.getArticleById(id, uid);
      if (article) {
        const draft = await draftService.getDraftById(article.draftId, uid);
        if (draft) {
          draft.sync = 0;
          await draftService.updateDraft(draft);
        }
        await articleService.deleteArticle([id]);
      }
    }
    res.send({
      status: 'success',
    });
  } catch ({ message }) {
    res.send({
      message,
      status: 'error',
    });
  }
};

/**
 * 增加一条文章访问记录
 * @param req
 * @param res
 */
export async function addVisitRecord(req: any, res: any) {
  try {
    const { articleId, userId } = req.body;
    await articleService.addArticleVisit({
      articleId,
      userId,
    });
    res.send({
      status: 'success',
    });
  } catch ({ message }) {
    res.send({
      message,
      status: 'error',
    });
  }
}

/**
 * 给文章贴一个标签
 * @param req
 * @param res
 */
export const addTag: RequestHandler = async (req, res) => {
  try {
    const uid = req.session.uid;
    const articleId = req.body.articleId as string;
    const tagId = req.body.tagId as string;
    if (!articleId) throw new Error('articleId不能为空');
    if (!tagId) throw new Error('tagId不能为空');
    const [article, tag] = await Promise.all([
      articleService.getArticleById(articleId, uid),
      tagService.findTagById(tagId),
    ]);
    if (!article) throw new Error('文章不存在');
    if (!tag) throw new Error('标签不存在');
    const tags = await articleService.getArticleTags(articleId);
    if (!tags.find((item) => item.tagId === tagId)) {
      await articleService.addTag(articleId, tagId);
    }
    res.send({
      status: 'success',
    });
  } catch ({ message }) {
    res.send({
      message,
      status: 'error',
    });
  }
};

/**
 * 移除标签
 * @param req
 * @param res
 */
export const removeTag: RequestHandler = async (req, res) => {
  try {
    const uid = req.session.uid;
    const articleId = req.body.articleId as string;
    const tagId = req.body.tagId as string;
    if (!articleId) throw new Error('articleId不能为空');
    if (!tagId) throw new Error('tagId不能为空');
    const article = await articleService.getArticleById(articleId, uid);
    if (!article) throw new Error('文章不存在');
    await articleService.removeTag(articleId, tagId);
    res.send({
      status: 'success',
    });
  } catch ({ message }) {
    res.send({
      message,
      status: 'error',
    });
  }
};
