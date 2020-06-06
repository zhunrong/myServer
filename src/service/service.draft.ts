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
  sync?: number;
}
/**
 * 更新草稿
 * @param params
 */
export function updateDraft(params: UpdateDraftParams) {
  const { uid, id, html, title, raw, sync = 0 } = params;
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
      sync,
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
 * @param page 页码
 * @param pageSize 每页数量
 */
export function getDraftsByUid(uid: string, page = 1, pageSize = 20) {
  const repository = getRepository(Draft);
  const queryBuilder = repository.createQueryBuilder();
  return queryBuilder
    .select('id')
    .addSelect('uid')
    .addSelect('title')
    .addSelect('sync')
    .addSelect('DATE_FORMAT(update_at,"%Y-%m-%d %H:%i:%s")', 'updateTime')
    .where('uid=:uid', {
      uid,
    })
    .andWhere('sync!=1')
    .orderBy('update_at', 'DESC')
    .offset((page - 1) * pageSize)
    .limit(pageSize)
    .getRawMany();
}

/**
 * 获取用户的草稿总数
 * @param uid
 */
export async function getUserDraftCount(uid: string) {
  const repository = getRepository(Draft);
  const [num1, num2] = await Promise.all([
    repository.count({
      uid,
    }),
    repository.count({
      uid,
      sync: 1,
    }),
  ]);
  return num1 - num2;
}

/**
 * 根据id删除草稿
 * @param id
 */
export function deleteDraftById(id: string) {
  const repository = getRepository(Draft);
  return repository.delete(id);
}
