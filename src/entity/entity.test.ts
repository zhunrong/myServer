import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'test',
})
export class Test {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name = '';

  @Column('int')
  age = 0;
}

export default Test;
