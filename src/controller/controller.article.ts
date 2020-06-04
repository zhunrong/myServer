import { copyValueFromObj } from '../modules/utils';
import * as articleService from '../service/service.article';
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
    res.send({
      status: 'success',
      data: article,
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
export async function deleteArticle(req: any, res: any) {
  const { uid } = req.auth;
  const ids: string[] = req.body.ids;
  try {
    // 判断是否有文章不属于该用户
    let index = 0;
    let flag = false;
    while (index < ids.length) {
      const article = await articleService.getArticleById(ids[index]);
      if (article.uid !== uid) {
        flag = true;
        break;
      }
      index++;
    }
    if (flag) {
      throw new Error('文章不属于该用户');
    }
    await articleService.deleteArticle(ids);
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
