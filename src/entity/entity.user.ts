import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm'

@Entity({
  name: 'user',
  engine: 'InnoDB',
  database: 'zr_dev'
})
export class User {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'uuid'
  })
  id!: string

  @Column({
    name: 'password',
    nullable: false,
    type: 'varchar',
    length: 255
  })
  password!: string

  @Column({
    name: 'nickname',
    type: 'varchar',
    length: 255
  })
  nickname!: string

  @Column({
    name: 'avatar',
    type: 'varchar',
    length: 255
  })
  avatar!: string

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255
  })
  email!: string

  @CreateDateColumn({
    name: 'create_at'
  })
  createAt!: Date

  @UpdateDateColumn({
    name: 'update_at'
  })
  updateAt!: Date
}

export default User