import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity({
  name: 'mail_verify_code',
  database: 'zr_dev',
  engine: 'InnoDB'
})
class MailVerifyCode {

  @PrimaryGeneratedColumn({
    name: 'id'
  })
  id!: number

  @Column({
    name: 'email',
    type: 'varchar',
    length: 20,
    nullable: false
  })
  email!: string

  @Column({
    name: 'verify_code',
    type: 'varchar',
    length: 20,
    nullable: false
  })
  code!: string

  @CreateDateColumn({
    name: 'create_time'
  })
  createAt!: Date
}

export default MailVerifyCode