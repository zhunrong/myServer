import { getRepository } from 'typeorm';
import ArticleTag from '../entity/entity.articelTag';

/**
 * 获取所有标签
 */
export function getArticleTags() {
  const repository = getRepository(ArticleTag);
  const queryBuilder = repository.createQueryBuilder();
  return queryBuilder
    .select('id')
    .addSelect('name')
    .orderBy('update_time', 'DESC')
    .getRawMany();
}

/**
 * 创建标签
 * @param name
 */
export function createArticleTag(name: string) {
  const repository = getRepository(ArticleTag);
  const tag = repository.create();
  tag.name = name;
  return repository.save(tag);
}

/**
 * 更新标签
 * @param id
 * @param name
 */
export function updateArticleTag(id: string, name: string) {
  const repository = getRepository(ArticleTag);
  return repository.update(id, {
    name,
  });
}

/**
 * 通过名字查找标签
 * @param params
 */
export function findTagByName(name: string) {
  const repository = getRepository(ArticleTag);
  const queryBuilder = repository.createQueryBuilder();
  return queryBuilder
    .select('id')
    .addSelect('name')
    .where(`binary name = :name`, {
      name,
    })
    .getRawOne();
}

/**
 * 通过id查找标签
 * @param id
 */
export function findTagById(id: string) {
  const repository = getRepository(ArticleTag);
  return repository.findOne(id);
}

/**
 * 删除标签
 * @param id
 */
export function removeTagById(id: string) {
  const repository = getRepository(ArticleTag);
  return repository.delete(id);
}
