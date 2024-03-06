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
    this.id = this._generateUUID();
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.email = email;
  }

  private _generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
