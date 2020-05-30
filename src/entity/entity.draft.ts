import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

/**
 * 草稿箱
 */
@Entity({
  name: 'draft',
  database: 'website',
  engine: 'InnoDB'
})
export default class Draft {
  /**
   * 草稿id
   */
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id!: string

  /**
   * 用户id
   */
  @Column({
    name: 'uid',
    type: 'varchar',
    nullable: false
  })
  uid!: string

  @Column({
    name: 'title',
    type: 'varchar',
    length: 255
  })
  title!: string

  /**
   * html
   */
  @Column({
    name: 'html',
    type: 'text'
  })
  html!: string

  /**
   * editorState raw
   */
  @Column({
    name: 'raw',
    type: 'text'
  })
  raw!: string

  /**
   * 创建时间
   */
  @CreateDateColumn({
    name: 'create_at'
  })
  createAt!: Date

  /**
   * 更新时间
   */
  @UpdateDateColumn({
    name: 'update_at'
  })
  updateAt!: Date
}