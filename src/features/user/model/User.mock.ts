import { generateUUID } from "../../_shared/functions/generateUUID";

export type UserFields = {
  name: string;
  surname: string;
  age: number;
  email: string;
};

export class User {
  public readonly id: string;
  public readonly name: string;
  public readonly surname: string;
  public readonly age: number;
  public readonly email: string;

  constructor({ name, surname, age, email }: UserFields) {
    this.id = generateUUID();
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.email = email;
  }
}
