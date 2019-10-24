import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm'

@Entity({
  name: 'user',
  engine: 'InnoDB',
  database: 'zr_dev',
  synchronize: true
})
export class User {

  @PrimaryGeneratedColumn('uuid', {
    name: 'id'
  })
  id!: string

  @Column({
    name: 'password',
    nullable: false,
    type: 'varchar',
    length: 40
  })
  password!: string

  @Column({
    name: 'nickname',
    type: 'varchar',
    nullable: true,
    length: 20
  })
  nickname!: string

  @Column({
    name: 'avatar',
    type: 'varchar',
    nullable: true,
    length: 100
  })
  avatar!: string

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: false,
    length: 20
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