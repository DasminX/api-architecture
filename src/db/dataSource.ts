// import "reflect-metadata";

import { DataSource } from "typeorm";
import { User } from "../features/user/model/User.entity";

export const dataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "default_db",
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});
