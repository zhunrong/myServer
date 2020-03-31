import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity({
  name: 'user_pictures',
  engine: 'InnoDB',
  database: 'website'
})
class UserPicture {

  @PrimaryGeneratedColumn('increment', {
    name: 'id'
  })
  id!: number

  @Column({
    name: 'uid',
    type: 'varchar',
    length: 50,
    nullable: false
  })
  uid!: string

  @Column({
    name: 'directory',
    type: 'varchar',
    nullable: false
  })
  directory!: string

  @Column({
    name: 'filename',
    type: 'varchar',
    nullable: false
  })
  filename!: string

  @CreateDateColumn({
    name: 'create_at'
  })
  createAt!: Date

}

export default UserPicture