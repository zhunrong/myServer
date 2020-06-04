import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * 文章
 */
@Entity({
  name: 'article',
  database: 'website',
  engine: 'InnoDB',
})
export default class Article {
  /**
   * 文章id
   */
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id!: string;

  /**
   * 用户id
   */
  @Column({
    name: 'uid',
    type: 'varchar',
    nullable: false,
  })
  uid!: string;

  /**
   * 关联的草稿id
   */
  @Column({
    name: 'draft_id',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  draftId!: string;

  /**
   * 标题
   */
  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
  })
  title!: string;

  /**
   * html
   */
  @Column({
    name: 'html',
    type: 'text',
  })
  html!: string;

  /**
   * editorState raw
   */
  @Column({
    name: 'raw',
    type: 'text',
  })
  raw!: string;

  /**
   * 创建时间
   */
  @CreateDateColumn({
    name: 'create_at',
  })
  createAt!: Date;

  /**
   * 更新时间
   */
  @UpdateDateColumn({
    name: 'update_at',
  })
  updateAt!: Date;
}
