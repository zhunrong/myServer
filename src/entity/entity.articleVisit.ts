import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity({
  name: 'article_visit',
  database: 'website',
  engine: 'InnoDB'
})
class ArticleVisit {

  @PrimaryGeneratedColumn('increment', {
    name: 'id'
  })
  id!: number

  @Column({
    name: 'article_id',
    type: 'varchar',
    nullable: false
  })
  articleId!: string

  @Column({
    name: 'user_id',
    type: 'varchar',
    nullable: true
  })
  userId!: string

  @CreateDateColumn({
    name: 'visit_time'
  })
  visitTime!: Date

}

export default ArticleVisit