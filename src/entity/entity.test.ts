import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Test {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name: string = ''

  @Column('int')
  age:number = 0

}

export default Test