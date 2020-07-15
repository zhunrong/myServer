import { RequestHandler } from 'express';
import * as ArticleTagService from '../service/service.articleTag';

export const getArticleTags: RequestHandler = async (req, res) => {
  try {
    const tags = await ArticleTagService.getArticleTags();
    res.send({
      status: 'success',
      data: tags,
    });
  } catch ({ message }) {
    res.send({
      status: 'error',
      message,
    });
  }
};

export const createArticleTag: RequestHandler = async (req, res) => {
  try {
    const name = req.body.name as string;
    if (!name) {
      throw new Error('标签名不能为空');
    }
    const tag = await ArticleTagService.findTagByName(name);
    if (tag) {
      throw new Error('标签名已存在');
    }
    await ArticleTagService.createArticleTag(name);
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

export const updateArticleTag: RequestHandler = async (req, res) => {
  try {
    const name = req.body.name as string;
    const id = req.body.id as string;
    if (!id) {
      throw new Error('id不能为空');
    }
    if (!name) {
      throw new Error('name不能为空');
    }
    await ArticleTagService.updateArticleTag(id, name);
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

/**
 * 删除标签
 * @param req
 * @param res
 */
export const removeArticleTag: RequestHandler = async (req, res) => {
  try {
    const id = req.body.id as string;
    if (!id) {
      throw new Error('id不能为空');
    }
    await ArticleTagService.removeTagById(id);
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
