import Draft from '../entity/entity.draft';
import { getRepository } from 'typeorm';

interface CreateDraftParams {
  uid: string;
  title: string;
  html: string;
  raw: string;
}
/**
 * 创建一篇草稿
 * @param params
 */
export function createDraft(params: CreateDraftParams) {
  const repository = getRepository(Draft);
  const draft = new Draft();
  const { uid, html, raw, title } = params;
  draft.uid = uid;
  draft.html = html;
  draft.raw = raw;
  draft.title = title;
  return repository.save(draft);
}

interface UpdateDraftParams extends CreateDraftParams {
  id: string;
}
/**
 * 更新草稿
 * @param params
 */
export function updateDraft(params: UpdateDraftParams) {
  const { uid, id, html, title, raw } = params;
  const repository = getRepository(Draft);
  return repository.update(
    {
      uid,
      id,
    },
    {
      title,
      html,
      raw,
      sync: 0,
    }
  );
}

/**
 * 根据id获取草稿
 * @param id
 * @param uid
 */
export function getDraftById(id: string, uid?: string) {
  const repository = getRepository(Draft);
  return repository.findOne({ id, uid });
}

/**
 * 获取用户的草稿列表
 * @param uid
 */
export function getDraftsByUid(uid: string) {
  const repository = getRepository(Draft);
  return repository.find({
    uid,
  });
}

/**
 * 根据id删除草稿
 * @param id
 */
export function deleteDraftById(id: string) {
  const repository = getRepository(Draft);
  return repository.delete(id);
}
