import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({
  name: 'article_to_tag',
  database: 'website',
  engine: 'InnoDB',
})
export default class Article2Tag {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column({
    name: 'tag_id',
    type: 'varchar',
    nullable: false,
  })
  tagId: string;

  @Column({
    name: 'article_id',
    type: 'varchar',
    nullable: false,
  })
  articleId: string;

  @CreateDateColumn({
    name: 'create_time',
  })
  createTime: Date;
}
