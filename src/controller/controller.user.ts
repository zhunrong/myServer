import { copyValueFromObj } from '../modules/utils';
import * as userService from '../service/service.user';
import { RequestHandler } from 'express';

/**
 * 获取当前登录用户信息
 * @param req
 * @param res
 */
export const getUserInfo: RequestHandler = async function (req, res) {
  try {
    const uid = req.session?.uid || '';
    const user = await userService.getUserById(uid);
    if (!user) {
      throw new Error('用户不存在');
    }
    res.send({
      status: 'success',
      data: user,
    });
  } catch ({ message }) {
    res.send({
      status: 'error',
      message,
    });
  }
};

/**
 * 更新当前登录用户信息
 * @param req
 * @param res
 */
export const updateUserInfo: RequestHandler = async function (req, res, next) {
  try {
    const uid = req.session?.uid || '';
    const data: any = copyValueFromObj(['nickname', 'avatar'], req.body);
    await userService.updateUserInfo(uid, data);
    getUserInfo(req, res, next);
  } catch ({ message }) {
    res.send({
      status: 'error',
      message,
    });
  }
};
