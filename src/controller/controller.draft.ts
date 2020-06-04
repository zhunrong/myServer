import * as draftService from '../service/service.draft';
import * as articleService from '../service/service.article';
import { RequestHandler } from 'express';

/**
 * 创建草稿
 * @param req
 * @param res
 */
export const createDraft: RequestHandler = async (req, res) => {
  try {
    const uid = req.session?.uid;
    if (!uid) throw new Error('未登录');
    const { html = '', raw = '', title = '' } = req.body;
    const draft = await draftService.createDraft({
      title,
      uid,
      html,
      raw,
    });
    res.send({
      status: 'success',
      data: draft,
    });
  } catch ({ message }) {
    res.send({
      status: 'error',
      message,
    });
  }
};

/**
 * 删除草稿
 * @param req
 * @param res
 */
export const deleteDraft: RequestHandler = async (req, res) => {
  try {
    const uid = req.session?.uid;
    if (!uid) throw new Error('未登录');
    const { id } = req.body;
    if (!id) throw new Error('id不能为空');
    const draft = await draftService.getDraftById(id, uid);
    if (!draft) throw new Error('草稿不存在');
    await draftService.deleteDraftById(id);
    res.send({
      status: 'success',
      data: draft,
    });
  } catch ({ message }) {
    res.send({
      status: 'error',
      message,
    });
  }
};

/**
 * 更新草稿
 * @param req
 * @param res
 */
export const updateDraft: RequestHandler = async (req, res) => {
  try {
    const uid = req.session?.uid;
    if (!uid) throw new Error('未登录');
    const { id = '', html, raw, title } = req.body;
    const result = await draftService.updateDraft({
      uid,
      id,
      title,
      html,
      raw,
    });
    if (!result.affected) throw new Error(result.raw.message);
    res.send({
      status: 'success',
      // data: result
    });
  } catch ({ message }) {
    res.send({
      status: 'error',
      message,
    });
  }
};

/**
 * 获取一篇草稿
 * @param req
 * @param res
 */
export const getDraft: RequestHandler = async (req, res) => {
  try {
    const uid = req.session?.uid;
    if (!uid) throw new Error('未登录');
    const { id } = req.params;
    const draft = await draftService.getDraftById(id, uid);
    if (!draft) throw new Error('草稿不存在');
    res.send({
      status: 'success',
      data: draft,
    });
  } catch ({ message }) {
    res.send({
      status: 'error',
      message,
    });
  }
};

/**
 * 获取草稿列表
 * @param req
 * @param res
 */
export const getDraftList: RequestHandler<
  any,
  any,
  any,
  { page?: string; pageSize?: string }
> = async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1');
    const pageSize = parseInt(req.query.pageSize || '20');
    const uid = req.session?.uid || '';
    const drafts = await draftService.getDraftsByUid(uid, page, pageSize);
    const total = await draftService.getUserDraftCount(uid);
    res.send({
      status: 'success',
      data: drafts,
      meta: {
        page,
        pageSize,
        total,
        pageCount: Math.ceil(total / pageSize),
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
 * 同步草稿到文章
 * @param req
 * @param res
 */
export const syncArticle: RequestHandler = async (req, res) => {
  try {
    const uid = req.session?.uid || '';
    const { id } = req.body;
    if (!id) throw new Error('id不能为空');
    const draft = await draftService.getDraftById(id, uid);
    if (!draft) throw new Error('文章不存在或者没有权限');
    const article = await articleService.getArticleByDraftId(draft.id);
    if (article) {
      await articleService.syncArticle({
        uid,
        draftId: draft.id,
        title: draft.title,
        html: draft.html,
        raw: draft.raw,
      });
    } else {
      await articleService.createArticle({
        uid,
        draftId: draft.id,
        title: draft.title,
        html: draft.html,
        raw: draft.raw,
      });
    }
    draft.sync = 1;
    await draftService.updateDraft(draft);
    res.send({
      status: 'success',
    });
  } catch ({ message }) {
    res.send({
      status: 'error',
      message,
    });
  }
};
