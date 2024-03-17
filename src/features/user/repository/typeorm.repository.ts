import { DataSource } from "typeorm";
import { UserFields } from "../model/User.mock";
import { UserRespositoryI } from "./abstraction";
import { User } from "../model/User.entity";

export class TypeormRepository implements UserRespositoryI {
  private readonly dataSource: DataSource;

  constructor({ dataSource }: { dataSource: DataSource }) {
    this.dataSource = dataSource;
  }

  async createUser(fields: UserFields): Promise<User> {
    const user = new User();

    user.name = fields.name;
    user.surname = fields.surname;
    user.age = fields.age;
    user.email = fields.email;
    await this.dataSource.manager.save(user);

    return user;
  }

  async getUsers(): Promise<User[]> {
    console.log("wchodzi");
    return await this.dataSource.manager.find(User);
  }

  async getUserById(id: string): Promise<User | undefined> {
    return (
      (await this.dataSource.manager.findOneBy(User, {
        id: id,
      })) ?? undefined
    );
  }
}
