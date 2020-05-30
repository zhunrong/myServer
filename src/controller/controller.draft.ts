import * as draftService from '../service/service.draft'
import { RequestHandler } from 'express'

/**
 * 创建草稿
 * @param req 
 * @param res 
 */
export const createDraft: RequestHandler = async (req, res) => {
  try {
    const uid = req.auth.uid
    const { html = '', raw = '', title = '' } = req.body
    const draft = await draftService.createDraft({
      title,
      uid,
      html,
      raw
    })
    res.send({
      status: 'success',
      data: draft,
    })
  } catch ({ message }) {
    res.send({
      status: 'error',
      message
    })
  }
}

/**
 * 删除草稿
 * @param req 
 * @param res 
 */
export const deleteDraft: RequestHandler = async (req, res) => {
  try {
    const uid = req.auth.uid
    const { id } = req.body
    if (!id) throw new Error('id不能为空')
    const draft = await draftService.getDraftById(id, uid)
    if (!draft) throw new Error('草稿不存在')
    await draftService.deleteDraftById(id)
    res.send({
      status: 'success',
      data: draft
    })
  } catch ({ message }) {
    res.send({
      status: 'error',
      message
    })
  }
}

/**
 * 更新草稿
 * @param req 
 * @param res 
 */
export const updateDraft: RequestHandler = async (req, res) => {
  try {
    const { uid } = req.auth
    const { id = '', html, raw, title } = req.body
    const result = await draftService.updateDraft({
      uid, id, title, html, raw
    })
    if (!result.affected) throw new Error(result.raw.message)
    res.send({
      status: 'success',
      // data: result
    })
  } catch ({ message }) {
    res.send({
      status: 'error',
      message
    })
  }
}

export const getDraft: RequestHandler = async (req, res) => {
  try {
    const { uid } = req.auth
    const { id } = req.params
    const draft = await draftService.getDraftById(id, uid)
    if (!draft) throw new Error('草稿不存在')
    res.send({
      status: 'success',
      data: draft
    })
  } catch ({ message }) {
    res.send({
      status: 'error',
      message
    })
  }
}