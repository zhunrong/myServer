import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'article',
  database: 'website',
  engine: 'InnoDB',
})
class Article {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id!: string;

  @Column({
    name: 'uid',
    type: 'varchar',
    nullable: false,
  })
  uid!: string;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
  })
  title!: string;

  @Column({
    name: 'markdown',
    type: 'text',
  })
  markdown!: string;

  @Column({
    name: 'public',
    type: 'int',
    nullable: false,
    default: 1,
    comment: '文章是否公开',
  })
  public!: number;

  @CreateDateColumn({
    name: 'create_at',
  })
  createAt!: Date;

  @UpdateDateColumn({
    name: 'update_at',
  })
  updateAt!: Date;
}

export default Article;
