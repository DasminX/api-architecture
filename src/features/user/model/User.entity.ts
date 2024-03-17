import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    length: 20,
  })
  name: string;

  @Column({
    length: 30,
  })
  surname: string;

  @Column({
    type: "int",
  })
  age: number;

  @Column()
  email: string;
}
