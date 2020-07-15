import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * 文章标签
 */
@Entity({
  name: 'article_tag',
  database: 'website',
  engine: 'InnoDB',
})
export default class ArticleTag {
  /**
   * uuid主键
   */
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  /**
   * 标签名字
   */
  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  name: string;

  /**
   * 创建时间
   */
  @CreateDateColumn({
    name: 'create_time',
  })
  createTime: Date;

  /**
   * 更新时间
   */
  @UpdateDateColumn({
    name: 'update_time',
  })
  updateTime: Date;
}
